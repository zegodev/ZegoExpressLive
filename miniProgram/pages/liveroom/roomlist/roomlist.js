let { sharePage }= require('../../../utils/util.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomName: '',
        roomId: '',
        userName: '',
        tapTime: '',
        loginType: '', // 主播：anchor；观众：audience
    },

    stopRefresh() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
    },

    // 输入的房间 Id
    bindKeyInput(e) {
        this.setData({
            roomId: e.detail.value,
            roomName: e.detail.value,
        })
    },

    // 创建房间（即主播首次登录房间）
    onCreateRoom() {
        var self = this;
        console.log('>>>[liveroom-roomList] onCreateRoom, roomId is: ' + self.data.roomId);

        if (self.data.roomId.length === 0) {
            wx.showToast({
                title: '创建失败，房间 Id 不可为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        if (self.data.roomId.match(/^[ ]+$/)) {
            wx.showToast({
                title: '创建失败，房间 Id 不可为空格',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        self.setData({
            loginType: 'anchor'
        });

        const url = '../room/room?roomId=' + self.data.roomId + '&roomName=' + self.data.roomId + '&loginType=' + self.data.loginType;
        wx.navigateTo({
            url: url,
        });
        
    },

    // 加入房间
    onJoinRoom() {
        var self = this;
        console.log('>>>[liveroom-roomList] onJoinRoom, roomId is: ' + self.data.roomId);

        if (self.data.roomId.length === 0) {
            wx.showToast({
                title: '房间 Id 不可为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        if (self.data.roomId.match(/^[ ]+$/)) {
            wx.showToast({
                title: '房间 Id 不可为空格',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        self.setData({
            loginType: 'audience'
        });

        var url = '../room/room?roomId=' + self.data.roomId + '&roomName=' + self.data.roomId + '&loginType=' + self.data.loginType;
        wx.navigateTo({
            url: url,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('>>>[liveroom-roomList] onLoad');
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('>>>[liveroom-roomList] onReady');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('>>>[liveroom-roomList] onShow');

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        console.log('>>>[liveroom-roomList] onHide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        console.log('>>>[liveroom-roomList] onUnload');
        this.stopRefresh(self);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log('>>>[liveroom-roomList] onPullDownRefresh');
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
        return sharePage();
    }
});