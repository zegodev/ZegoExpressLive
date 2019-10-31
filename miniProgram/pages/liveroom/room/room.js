let { ZegoClient } = require("../../../dist_mp/ZegoExpressMiniProgram-1.0.0.js");
// let { ZegoClient } = require("miniprogram-zego-express");
let { format, sharePage } = require("../../../utils/util.js");
let { getLoginToken } = require("../../../utils/server.js");
let zg;
//获取应用实例
const app = getApp();
let { appId, wsServerURL, isCodec } = app.globalData;


/**
 * 页面的初始数据
 */
Page({
  data: {
    loginType: '',          // 登录类型。anchor：主播；audience：观众
    roomId: "",             // 房间 Id
    roomName: "",           // 房间名
    userId: "",             // 当前初始化的用户 Id
    userName: "",           // 当前初始化的用户名
    appId: 0,               // appId，number类型，用于初始化 sdk
    publishStreamId: "",    // 推流 Id
    pusherVideoContext: {}, // live-pusher Context，内部只有一个对象
    playStreamList: [],     // 拉流流信息列表，列表中每个对象结构为 { streamId:'xxx', playContext:{}, playUrl:'xxx', playingState:'xxx'}
    beginToPublish: false,  // 准备连麦标志位
    reachStreamLimit: false,// 房间内达到流上限标志位
    isPublishing: false,    // 是否正在推流
    pushConfig: {           // 推流配置项
      mode: 'RTC',
      aspect: '3:4',        // 画面比例，取值为 3:4, 或者 9:16
      isBeauty: 6,          // 美颜程度，取值范围 [0,9]
      isMute: false,        // 推流是否静音
      showLog: false,       // 是否显示 log
      frontCamera: true,    // 前后置摄像头，false 表示后置
      minBitrate: 200,      // 最小视频编码码率
      maxBitrate: 500,      // 最大视频编码码率
      isMirror: false,      // 画面是否镜像
      bgmStart: false,      // 是否
      bgmPaused: false,
    },
    playConfig: {
      mode: 'RTC',
    },
    pushSourceType: 1, // 0：推流到 cdn；1：推流到 bgp
    playSourceType: 0,    // 0：auto；1：从 bgp 拉流
    upperStreamLimit: 4,        // 房间内限制为最多 4 条流，当流数大于 4 条时，禁止新进入的用户连麦
    connectType: -1,  // -1为初始状态，1为连接，0断开连接
    tapTime: "",
    pushUrl: "",
    containerAdapt: "",
    containerBaseAdapt: "containerBase-big-calc-by-height",
    messageAdapt: "message-hide",
    requestJoinLiveList: [],    // 请求连麦的成员列表
    messageList: [],     // 消息列表，列表中每个对象结构为 {name:'xxx', time:xxx, content:'xxx'}
    isCommentShow: false,
    inputMessage: "",
    isMessageHide: true,
    scrollToView: "",
    imgTempPath: "",
    tryPlayCount: 0,
    mixStreamStart: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ roomId, roomName, loginType }) {
    console.log('>>>[liveroom-room] onLoad, options are: ', roomId);
    roomName = roomName ? roomName : '';
    this.setData({
      roomId,
      roomName,
      loginType,
    });


    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true,
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {
    console.log('>>>[liveroom-room] onReady');


    let timestamp = new Date().getTime();
    this.setData({
      userId: 'xcxU' + timestamp,
      userName: 'xcxU' + timestamp,
      appId,
      publishStreamId: 'xcxS' + timestamp,
      MixStreamId: 'xcxMixS' + timestamp,
      MixTaskId: 'xcxMixT' + timestamp
    });
    zg = new ZegoClient(this.data.appId, wsServerURL, this.data.userId);
    // 高级配置
    // zg.config({
    //   pushSourceType: this.data.pushSourceType,
    //   playSourceType: this.data.playSourceType
    // })

    this.onBindCallback(); // 监听sdk on 回调
    console.log('>>>[liveroom-room] publishStreamId is: ' + this.data.publishStreamId);

    // 进入房间，自动登录
    const token = await getLoginToken(this.data.userId, appId);
    this.setData({ token });
    zg.setUserStateUpdate(true);
    this.loginRoom(token, self);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    let obj = sharePage({
      roomId: this.data.roomId,
      loginType: 'audience'
    });
    console.log('onShareAppMessage', obj);
    return obj;
  },

  onBindCallback() {
    let self = this;

    // 推流后，服务器主动推过来的，流状态更新
    // type: { start: 0, stop: 1 }，主动停止推流没有回调，其他情况均回调
    // zg.onPublishStateUpdate = function (type, streamid, error) {
    zg.on('publishStateChange', ({type, streamId, error}) => {
      console.log('>>>[liveroom-room] zg publishStateChange, streamId: ' + streamId + ', type: ' + (type === 0 ? 'start' : 'stop') + ', error: ' + error);

      self.setData({
        isPublishing: type === 0 ? true : false,
        beginToPublish: false,
      });
      // 推流失败
      if (type == 1) {
        wx.showModal({
          title: '提示',
          content: '推流断开，请退出房间后重试',
          showCancel: false,
          success(res) {
            // 用户点击确定，或点击安卓蒙层关闭
            if (res.confirm || !res.cancel) {
              // 强制用户退出
              wx.navigateBack();
              zg.logout();
            }
          }
        });
      } else if (type === 0) {
        // 混流
        isCodec && self.transCode();
      }
    });

    // 服务端主动推过来的 流的播放状态, 视频播放状态通知
    // type: { start:0, stop:1};
    zg.on('pullStateChange', ({type, streamId, error}) => {
      console.log(">>>[liveroom-room] zg pullStateChange, " + type + ' ' + (type === 0 ? 'start ' : 'stop ') + streamId);

      if (type === 1) {
        // 流播放失败, 停止拉流
        for (let i = 0; i < self.data.playStreamList.length; i++) {
          if (self.data.playStreamList[i]['streamId'] === streamId) {
            self.data.playStreamList[i]['playContext'] && self.data.playStreamList[i]['playContext'].stop();
            self.data.playStreamList[i]['playingState'] = 'failed';
            break;
          }
        }
      } else if (type === 0) {
        // 流播放成功, 更新状态
        for (let i = 0; i < self.data.playStreamList.length; i++) {
          if (self.data.playStreamList[i]['streamId'] === streamId) {
            self.data.playStreamList[i]['playingState'] = 'succeeded';
          }
        }
      }

      self.setData({
        playStreamList: self.data.playStreamList,
      });
    });

    // 服务端主动推过来的 流的创建/删除事件；updatedType: { added: 0, deleted: 1 }；streamList：增量流列表
    zg.on('remoteStreamUpdated', (type, streamList)=>  {
      console.log(">>>[liveroom-room] zg remoteStreamUpdated, updatedType: " + (type === 0 ? 'added' : 'deleted') + ', streamList: ');
      console.log(streamList);

      if (type === 1) {
        // 流删除通知触发事件：有推流成员正常退出房间；有推流成员停止推流；90s 超时。播放失败不会导致流删除
        self.stopPlayingStreamList(streamList);
      } else {
        // 有成员正常推流成功，流增加
        self.startPlayingStreamList(streamList);
      }
    });

    // 服务端主动推过来的 流信息中的 ExtraInfo更新事件（暂时不用实现）
    zg.on('streamExtraInfoUpdated', (streamList) => {
      console.log(">>>[liveroom-room] zg streamExtraInfoUpdated IU ", streamList);
      for (let i = 0; i < streamList.length; i++) {
        let content = 'send by: ' + streamList[i].userId + ' ' + streamList[i].extraInfo;
        wx.showToast({
          title: content,
          icon: 'none',
          duration: 2000
        });
      }
    });

    zg.on('userStateUpdate', (roomId, userList) => {
      console.log('user ', this.data.userId);
      console.log('>>>[liveroom-room] onUserStateUpdate, roomId: ' + roomId + ', userList: ', userList);
      console.log(userList);

    });

    zg.on('totalUserList', (roomId, userList ) => {
        console.log('totalUserList', roomId);
        console.log('totalUserList', userList);
    });

    //
    zg.on('updateOnlineCount', (roomId, userCount) => {
      console.log('>>>[liveroom-room] updateOnlineCount, roomId: ' + roomId + ', userCount: ' + userCount);
    });

    zg.on('roomStateUpdate', (state, err) => {
      console.log('>>>[liveroom-room] roomStateUpdate, state: ' + state + ', err: ' + err);
      if (state === 'DISCONNECT') {
        self.setData({
          connectType: 0
        })
      }
    })

    // 接收服务端主推送的自定义信令
    zg.on('recvCustomCommand', (from_userid, from_idName, custom_content) => {
      console.log(">>>[liveroom-room] zg recvCustomCommand" + "from_userid: " + from_userid + "from_idName: " + from_idName + "content: ");
      console.log(custom_content);
    });

    // 接收房间IM消息
    zg.on('recvRoomMsg', (chat_data) => {
      console.log(">>>[liveroom-room] zg recvRoomMsg, data: ", chat_data);

      // 收到其他成员的回到前台通知
      let content = chat_data[0].content;
      let category = chat_data[0].type;

      if (category === 2) {
        // 系统消息
        let data = content.split(".");
        let streamId = data[1];
        if (data[0] === "onShow") {
          for (let i = 0; i < self.data.playStreamList.length; i++) {
            if (self.data.playStreamList[i]["streamId"] === streamId && self.data.playStreamList[i]["playingState"] !== 'succeeded') {
              self.data.playStreamList[i]["playContext"] && self.data.playStreamList[i]["playContext"].stop();
              self.data.playStreamList[i]["playContext"] && self.data.playStreamList[i]["playContext"].play();
            }
          }
        }
      } else {
        // 评论消息
        let name = chat_data[0].userName;
        let time = chat_data[0].sendTime;

        let message = {};
        message.name = name;
        message.time = format(time);
        message.content = content;
        message.id = name + time;

        self.data.messageList.push(message);

        self.setData({
          messageList: self.data.messageList,
          scrollToView: message.id,
        });
      }

    });

    // 收到连麦请求
    zg.on('recvJoinLiveRequest', (requestId, fromUserId, fromUsername, roomId) => {
      console.log('>>>[liveroom-room] recvJoinLiveRequest, roomId: ' + roomId + 'requestUserId: ' + fromUserId + ', requestUsername: ' + fromUsername);

      self.data.requestJoinLiveList.push(requestId);

      let content = '观众 ' + fromUsername + ' 请求连麦，是否允许？';
      wx.showModal({
        title: '提示',
        content: content,
        success(res) {
          if (res.confirm) {
            console.log('>>>[liveroom-room] recvJoinLiveRequest accept join live');
            // self.switchPusherOrPlayerMode('pusher', 'RTC');

            // 已达房间上限，主播依然同意未处理的连麦，强制不处理
            if (self.data.reachStreamLimit) {
              wx.showToast({
                title: '房间内连麦人数已达上限，不建立新的连麦',
                icon: 'none',
                duration: 2000
              });
              zg.respondJoinLive(requestId, false); // true：同意；false：拒绝
            } else {
              zg.respondJoinLive(requestId, true); // true：同意；false：拒绝
            }


            self.handleMultiJoinLive(self.data.requestJoinLiveList, requestId, self);
          } else {
            console.log('>>>[liveroom-room] recvJoinLiveRequest refuse join live');
            zg.respondJoinLive(requestId, false); // true：同意；false：拒绝

            self.handleMultiJoinLive(self.data.requestJoinLiveList, requestId, self);
          }
        }
      });
    });

    // 收到停止连麦请求
    zg.on('recvEndJoinLiveCommand', (requestId, fromUserId, fromUsername, roomId) => {
      console.log('>>>[liveroom-room] onRecvEndJoinLiveCommand, roomId: ' + roomId + 'requestUserId: ' + fromUserId + ', requestUsername: ' + fromUsername);
    });

  },

  setPlayUrl(streamId, url) {
    console.log('>>>[liveroom-room] setPlayUrl: ', url);
    let self = this;
    if (!url) {
      console.log('>>>[liveroom-room] setPlayUrl, url is null');
      return;
    }

    for (let i = 0; i < self.data.playStreamList.length; i++) {
      if (self.data.playStreamList[i]['streamId'] === streamId && self.data.playStreamList[i]['playUrl'] === url) {
        console.log('>>>[liveroom-room] setPlayUrl, streamid and url are repeated');
        return;
      }
    }

    let streamInfo = {};
    let isStreamRepeated = false;

    // 相同 streamid 的源已存在，更新 Url
    for (let i = 0; i < self.data.playStreamList.length; i++) {
      if (self.data.playStreamList[i]['streamId'] === streamId) {
        console.log('isStreamRepeated')
        isStreamRepeated = true;
        self.data.playStreamList[i]['playUrl'] = url;
        self.data.playStreamList[i]['playingState'] = 'initial';
        self.data.playStreamList[i]['playContext'].stop();
        self.data.playStreamList[i]['playContext'].play();
        break;
      }
    }

    // 相同 streamId 的源不存在，创建新 player
    if (!isStreamRepeated) {
      streamInfo['streamId'] = streamId;
      streamInfo['playUrl'] = url;
      streamInfo['playContext'] = wx.createLivePlayerContext(streamId, self);
      streamInfo['playingState'] = 'initial';
      self.data.playStreamList.push(streamInfo);
    }
    
    // 更新播放流
    self.setData({
      playStreamList: self.data.playStreamList,
    }, function () {
      console.log('playStreamList', self.data.playStreamList)
      // 检查流新增后，是否已经达到房间流上限
      if (self.data.playStreamList.length >= self.data.upperStreamLimit) {

        self.setData({
          reachStreamLimit: true,
        }, function () {
          wx.showToast({
            title: "房间内连麦人数已达上限，不允许新的连麦",
            icon: 'none',
            duration: 2000
          });
        });


      }

      //播放地址更新，需要重新停止再次播放
      if (isStreamRepeated) {
        self.data.playStreamList.forEach(streamInfo => {
          if (streamInfo.streamId == streamId) {
            streamInfo.playContext.stop();
            streamInfo.playingState = 'initial';
            streamInfo.playContext.play();
          }
        })
      }
    });

  },

  setPushUrl(url) {
    console.log('>>>[liveroom-room] setPushUrl: ', url);
    let self = this;

    if (!url) {
      console.log('>>>[liveroom-room] setPushUrl, url is null');
      return;
    }

    self.setData({
      pushUrl: url,
      pusherVideoContext: wx.createLivePusherContext(),
    }, function () {
      self.data.pusherVideoContext.stop();
      self.data.pusherVideoContext.start();

      // self.animation.rotate(720).step();
      // self.setData({animation: this.animation.export()});
    });
  },

  // 登录房间
  async loginRoom(token) {
    let self = this;
    console.log('>>>[liveroom-room] login room, roomId: ' + self.data.roomId, ', userId: ' + self.data.userId + ', userName: ' + self.data.userName);

    try {
      const streamList = await zg.login(self.data.roomId, token);
      console.log('>>>[liveroom-room] login success, streamList is: ');
      console.log(streamList);

      self.setData({
        connectType: 1
      });
      // 房间内已经有流，拉流
      self.startPlayingStreamList(streamList);

      const extraInfo = { currentVideoCode: 'H264', mixStreamId: self.data.MixStreamId };
      // 主播登录成功即推流
      if (self.data.loginType === 'anchor') {
        console.log('>>>[liveroom-room] anchor startPublishingStream, publishStreamId: ' + self.data.publishStreamId);
        
        let streamInfo;
        if (isCodec) {
          streamInfo = await zg.startPusher(self.data.publishStreamId, {extraInfo: JSON.stringify(extraInfo)});
        } else {
          streamInfo = await zg.startPusher(self.data.publishStreamId);
        }

        const { streamId, url } = streamInfo;
        console.log('>>>[liveroom-room] startPusher, streamId  ', streamId, ' url ', url);
        self.setPushUrl(url);
      } else {
        if (!self.data.pushUrl && streamList.length === 0) {
          let title = '主播已经退出！';
          wx.showModal({
            title: '提示',
            content: title,
            showCancel: false,
            success(res) {
              if (res.confirm || !res.cancel) {
                wx.navigateBack();
              }
            }
          });
        }
      }
    } catch(err) {
      console.log('>>>[liveroom-room] login failed, error is: ', err);
      if (err) {
        let title = '登录房间失败，请稍后重试。\n失败信息：' + err.msg;
        wx.showModal({
          title: '提示',
          content: title,
          showCancel: false,
          success(res) {
            if (res.confirm || !res.cancel) {
              wx.navigateBack();
            }
          }
        });
      }
    }
  },

  async startPlayingStreamList(streamList) {
    let self = this;

    if (streamList.length === 0) {
      console.log('>>>[liveroom-room] startPlayingStream, streamList is null');
      return;
    }

    // 获取每个 streamId 对应的拉流 url
    for (let i = 0; i < streamList.length; i++) {
      let streamId = streamList[i].streamId;
      console.log('>>>[liveroom-room] startPlayingStream, playStreamId: ' + streamId);
      // 获取拉流地址接口
      const streamInfo = await zg.getPlayerUrl(streamId);
      const {streamId: _streamId, url} = streamInfo;
      console.log('>>>[liveroom-room] getPlayerUrl, streamId: ', _streamId, ' url: ',url);
      self.setPlayUrl(_streamId, url);
    }
  },

  stopPlayingStreamList(streamList) {
    let self = this;

    if (streamList.length === 0) {
      console.log('>>>[liveroom-room] stopPlayingStream, streamList is empty');
      return;
    }

    let playStreamList = self.data.playStreamList;
    for (let i = 0; i < streamList.length; i++) {
      let streamId = streamList[i].streamId;

      console.log('>>>[liveroom-room] stopPlayingStream, playStreamId: ' + streamId);
      zg.stopPlayer(streamId);

      // 删除播放流列表中，删除的流
      for (let j = 0; j < playStreamList.length; j++) {
        if (playStreamList[j]['streamId'] === streamId) {
          console.log('>>>[liveroom-room] stopPlayingStream, stream to be deleted: ');
          console.log(playStreamList[j]);

          playStreamList[j]['playContext'] && playStreamList[j]['playContext'].stop();

          // let content = '一位观众结束连麦，停止拉流';
          // wx.showToast({
          //   title: content,
          //   icon: 'none',
          //   duration: 2000
          // });

          playStreamList.splice(j, 1);
          break;
        }
      }
      self.setData({
        playStreamList
      })
      if (!self.data.pushUrl && playStreamList.length === 0) {
        let title = '主播已经退出！';
        wx.showModal({
          title: '提示',
          content: title,
          showCancel: false,
          success(res) {
            if (res.confirm || !res.cancel) {
              wx.navigateBack();
            }
          }
        });
      }
    }

    self.setData({
      playStreamList: playStreamList,
    }, function () {
      // 检查流删除后，是否低于房间流上限
      if (self.data.playStreamList.length === self.data.upperStreamLimit - 1) {
        self.setData({
          reachStreamLimit: false,
        }, function () {
          if (self.data.loginType === "audience") {
            wx.showToast({
              title: "一位观众结束连麦，允许新的连麦",
              icon: 'none',
              duration: 2000
            });
          }
        });
      }

      // 主播结束了所有的连麦，切换回 live 模式   （可选）
      if (self.data.loginType === 'anchor' && self.data.playStreamList.length === 0) {
        // self.switchPusherOrPlayerMode('pusher', 'live');
      }


    });
  },

  async PlayOrStopMixStream() {
    let self = this
    if (self.data.mixStreamStart) {
      await zg.stopMixStream(this.data.MixTaskId)
      self.stopPlayingStreamList([{streamId: this.data.MixStreamId}])
      self.setData({
        mixStreamStart: false
      });
    } else {
      const inputList = [{
        streamId: this.data.publishStreamId,
        layout: {
          top: 0,
          left: 0,
          bottom: 480,
          right: 640,
        }  
      }];
      if (this.data.playStreamList.length > 0) {
        inputList.push({
          streamId: this.data.playStreamList[0].streamId,
          layout: {
            top: 480,
            left: 0,
            bottom: 960,
            right: 640
          }
        });
      }
      const outputList = [{
        streamId: this.data.MixStreamId,
        outputBitrate: 800 * 1000,
        outputFps: 15,
        outputWidth: 640,
        outputHeight: 960,
      }]
      const mixParam = {
        taskId: this.data.MixTaskId,
        inputList: inputList,
        outputList
      };
      console.log('mixParam', mixParam);
      try {
        const mixPlayInfoList = await zg.startMixStream(mixParam)
        console.log('mixPlayInfoList: ', mixPlayInfoList);
        for(let i = 0; i < mixPlayInfoList.length; i++) {
          // self.setPlayUrl(mixPlayInfoList[i].streamId, mixPlayInfoList[i].rtmpUrl)
          const {streamId, url} =  await zg.getPlayerUrl(mixPlayInfoList[i].streamId, {isMix: true})
          console.log('>>>[liveroom-room] getPlayerUrl, streamId: ', streamId, ' url: ',url);
          self.setPlayUrl(streamId, url);
        }
        self.setData({
          mixStreamStart: true
        })
      } catch(err) {
        console.log('err: ', err);
        // console.log('errorInfo: ' + JSON.stringify(errorInfo));
      };
    }
    
  },

  async transCode() {
    const streamList = [{
            streamId: this.data.publishStreamId,
            layout: {
                    top: 0,
                    left: 0,
                    bottom: 480,
                    right: 640,
            }
    }];
    const res = await zg.startMixStream ({
            taskId: this.data.MixTaskId,
            inputList: streamList,
            outputList: [{
                    streamId: this.data.MixStreamId,
                    outputUrl: '',
                    outputBitrate: 300 * 1000,
                    outputFps: 15,
                    outputWidth: 640,
                    outputHeight: 480
            }],
            advance: {
                    videoCodec: 'vp8'
            }
    })
    console.log('transCode', res)
  },

  //live-player 绑定拉流事件
  onPlayStateChange(e) {
    console.log('>>>[liveroom-room] onPlayStateChange, code: ' + e.detail.code + ', message:' + e.detail.message);


    if (e.detail.code === 2002 || e.detail.code === 2004) {
      // 透传拉流事件给 SDK，type 0 拉流
      zg.updatePlayerState(e.currentTarget.id, e);
      // 获取拉流质量回调
      
      this.updatePlayingStateOnly(e, 'succeeded');
    } else if (e.detail.code === -2301) {
      //  this.updatePlayingStateOnly(e, 'failed');
      // if(this.data.playStreamList[0]&&this.data.playStreamList[0]['playContext']){
      //   this.data.playStreamList[0]['playContext'].stop();
      //   this.data.playStreamList[0]['playContext'].play();
      // }
      // this.data.tryPlayCount++;
      // if (this.data.tryPlayCount < 3) {

      // }
      this.data.playStreamList.forEach(item => {
        if (item['playContext']) {
          item['playContext'].stop();
          item['playContext'].play();
        }
      })

    } else {
      // 透传拉流事件给 SDK，type 0 拉流
      zg.updatePlayerState(e.currentTarget.id, e);
    }
  },

  // 主播异常操作，导致拉流端 play 失败，此时不会影响 SDK 内部拉流状态，但需要额外处理 live-player 状态
  updatePlayingStateOnly(e, newState) {
    for (let index in this.data.playStreamList) {
      let playStream = this.data.playStreamList[index];
      if (playStream.streamId === e.currentTarget.id && playStream.playingState !== newState) {
        playStream.playingState = newState;
        this.setData({
          playStreamList: this.data.playStreamList,
        })
        break;
      }
    }
  },
  // live-pusher 绑定推流事件
  onPushStateChange(e) {
    console.log('>>>[liveroom-room] onPushStateChange, code: ' + e.detail.code + ', message:' + e.detail.message);
    // 透传推流事件给 SDK，type 1 推流
    zg.updatePlayerState(this.data.publishStreamId, e);
  },

  // live-player 绑定网络状态事件
  onPlayNetStateChange(e) {
    //透传网络状态事件给 SDK，type 0 拉流
    zg.updatePlayerNetStatus(e.currentTarget.id, e, 0);
    zg.getStats(({streamId, type, video: {videoBitrate, videoFPS, videoWidth, videoHeight}, audio: {audioBitrate}}) => {
      console.log('>>>[liveroom-room] onPlayNetStateChange, streamId is: ', streamId, ', type is: ', type === 1 ? 'push' : 'play', ', videoBitrate: ', videoBitrate, ', videoWidth: ', videoWidth, ', videoHeight: ', videoHeight, ', videoFPS: ', videoFPS, ', audioBitrate: ', audioBitrate)
    })
  },

  // live-pusher 绑定网络状态事件
  onPushNetStateChange(e) {
    //透传网络状态事件给 SDK，type 1 推流
    console.log('quality', e);
    zg.updatePlayerNetStatus(this.data.publishStreamId, e);
    zg.getStats(({streamId, type, video: {videoBitrate, videoFPS, videoWidth, videoHeight}, audio: {audioBitrate}}) => {
      console.log('>>>[liveroom-room] onPushNetStateChange, streamId is: ', streamId, ', type is: ', type === 1 ? 'push' : 'play', ', videoBitrate: ', videoBitrate, ', videoWidth: ', videoWidth, ', videoHeight: ', videoHeight, ', videoFPS: ', videoFPS, ', audioBitrate: ', audioBitrate)
    })
  },


  handleMultiJoinLive(requestJoinLiveList, requestId, self) {
    for (let i = 0; i < requestJoinLiveList.length; i++) {
      if (requestJoinLiveList[i] != requestId) {
        // 新的连麦弹框会覆盖旧的弹框，拒绝被覆盖的连麦请求
        zg.respondJoinLive(requestJoinLiveList[i], false);
      }
    }
  },
  // 推流画面配置
  switchCamera() {
    this.data.pushConfig.frontCamera = !this.data.pushConfig.frontCamera;
    this.setData({
      pushConfig: this.data.pushConfig,
    });
    this.data.pusherVideoContext && this.data.pusherVideoContext.switchCamera();
  },

  // 设置镜像
  setMirror() {
    this.setData({
      "pushConfig.isMirror": !this.data.pushConfig.isMirror
    })
  },

  setBeauty() {
    this.data.pushConfig.isBeauty = (this.data.pushConfig.isBeauty === 0 ? 6 : 0);
    this.setData({
      pushConfig: this.data.pushConfig,
    });
  },

  enableMute() {
    this.data.pushConfig.isMute = !this.data.pushConfig.isMute;
    this.setData({
      pushConfig: this.data.pushConfig,
    });
  },

  showLog() {
    this.data.pushConfig.showLog = !this.data.pushConfig.showLog;
    this.setData({
      pushConfig: this.data.pushConfig,
    });
  },

  updateStreamExtra() {
    zg.updateStreamExtraInfo(this.data.publishStreamId, 'extroInfo: send at ' + new Date())
  },

  playOrStopBgm() {
    if (!this.data.pusherVideoContext.playBGM) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
        showCancel: false,
      });
      return
    }
    this.data.pushConfig.bgmStart = !this.data.pushConfig.bgmStart;
    this.setData({
      pushConfig: this.data.pushConfig,
    }, function () {
      if (this.data.pushConfig.bgmStart) {
        this.data.pusherVideoContext && this.data.pusherVideoContext.playBGM({
          url: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
          success: function (res) {
            console.log('suc', res)
          },
          fail: function (err) {
            console.log('fail', err)
          }
        })
      } else {
        this.data.pusherVideoContext && this.data.pusherVideoContext.stopBGM();
      }
    });
  },

  handleBgm() {
    if (!this.data.pusherVideoContext.pauseBGM) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
        showCancel: false,
      });
      return
    }
    if (!this.data.pushConfig.bgmStart) {
      return
    }
    this.data.pushConfig.bgmPaused = !this.data.pushConfig.bgmPaused
    this.setData({
      pushConfig: this.data.pushConfig
    }, function () {
      if (this.data.pushConfig.bgmPaused) {
        this.data.pusherVideoContext && this.data.pusherVideoContext.pauseBGM()
      } else {
        this.data.pusherVideoContext && this.data.pusherVideoContext.resumeBGM()
      }
    })
  },

  setBgmVolume() {
    console.log('>>>[liveroom-room] setBgmVolume, ');

  },

  onBgmStart(e) {
    console.log('>>>[liveroom-room] onBgmStart, code: ' + e.detail.code + ', message:' + e.detail.message);

  },
  onBgmProgress(e) {
    console.log('>>>[liveroom-room] onBgmProgress, code: ' + e.detail.code + ', message:' + e.detail.message);

  },
  onBgmComplete(e) {
    console.log('>>>[liveroom-room] onBgmComplete, code: ' + e.detail.code + ', message:' + e.detail.message);

  },

  bindMessageInput: function (e) {
    this.data.inputMessage = e.detail.value;
  },
  async onComment() {
    console.log('>>>[liveroom-room] begin to comment', this.data.inputMessage);

    let message = {
      id: this.data.userId + Date.parse(new Date()),
      name: this.data.userId,
      time: new Date().format("hh:mm:ss"),
      content: this.data.inputMessage,
    };

    this.data.messageList.push(message);
    console.log('>>>[liveroom-room] currentMessage', this.data.inputMessage);

    this.setData({
      messageList: this.data.messageList,
      inputMessage: "",
      scrollToView: message.id,
    });

    this.showMessage();

    try {
      const res = await zg.sendRoomMsg(1, message.content)
      console.log('>>>[liveroom-room] onComment success', res);
    }catch(error) {
        console.log('>>>[liveroom-room] onComment, error: ');
        console.log(error);
    };
  },


  showMessage() {
    console.log('>>>[liveroom-room] onShowMessage');

    this.setData({
      isMessageHide: !this.data.isMessageHide
    });

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('>>>[liveroom-room] onShow');

    if (zg && this.data.connectType === 0) {
      zg.setUserStateUpdate(true);
      this.loginRoom(this.data.token);
    }

    //刷新全局变量
    appId = getApp().globalData.appId;
    wsServerURL = getApp().globalData.wsServerURL;    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('>>>[liveroom-room] onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('>>>[liveroom-room] onUnload');

    // 停止拉流
    let streamList = this.data.playStreamList;
    for (let i = 0; i < streamList.length; i++) {
      let streamId = streamList[i]['streamId'];
      console.log('>>>[liveroom-room] onUnload stop play stream, streamId: ' + streamId);
      zg.stopPlayer(streamId);

      streamList[i]['playContext'] && streamList[i]['playContext'].stop();
    }

    this.setData({
      playStreamList: [],
    });

    // 停止推流
    if (this.data.isPublishing) {
      console.log('>>>[liveroom-room] stop publish stream, streamId: ' + this.data.publishStreamId);
      zg.stopPusher(this.data.publishStreamId);
      this.setData({
        publishStreamId: "",
        isPublishing: false,
        pushUrl: "",
      });

      this.data.pusherVideoContext.stop();
    }

    // 停止连麦

    // 退出登录
    zg.logout();
  },

  error(e) {
    console.error('live-player error:', e.detail.errMsg)
    console.log(e)
  },


})
