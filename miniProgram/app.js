//app.js
const liveAppID = 1739272706,//1252712950,
    wsServerURL = "wss://wssliveroom-test.zego.im/ws",//即构demo专用，开发者请填写即构邮件发送给你的
   logServerURL = "https://wsslogger-test.zego.im/httplog";//可不填，sdk有配置时，配置的地址会覆盖这个地址,
App({

    globalData: {
        liveAppID,
        testEnvironment:0,//如果是测试环境需要改成1，正式为0
        tokenURL: "https://wsliveroom-alpha.zego.im:8282/token",
        // roomListURL: "https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706",//房间列表接口
        wsServerURL,
        logServerURL,
        cgi_token:"", //即构测试用,开发者请忽略
        tokenURL2: "https://sig-wstoken.zego.im:8282/tokenverify", // 即构提供的，前期绕过后端，临时获取token，需要appSign
        existOwnRoomList: false,
        zegoOwn: true,
    },

    onLaunch() {
        console.log("App Launch");
        var that = this
        if (that.globalData.liveAppID !== 1739272706) {
            that.globalData.zegoOwn = false
        }
        if (that.globalData.roomListURL !== '' && that.globalData.roomListURL !== 'https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706') {
            that.globalData.existOwnRoomList = true
        }
    },

    onShow() {
        console.log("App Show");
    },

    onHide() {
        console.log("App Hide");
    },
})