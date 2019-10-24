//app.js
const liveAppID = 1739272706,//1739272706,
    wsServerURL = "wss://wssliveroom-test.zego.im/ws",//即构demo专用，开发者请填写即构邮件发送给你的
   logServerURL = "https://wsslogger-test.zego.im/httplog";//可不填，sdk有配置时，配置的地址会覆盖这个地址,
App({

    globalData: {
        liveAppID,
        tokenURL: "https://wsliveroom-alpha.zego.im:8282/token",
        wsServerURL,
        logServerURL,
        isCodec: false
    },

    onLaunch() {
        console.log("App Launch");
        if (this.globalData.liveAppID === 96527232) {
            this.globalData.isCodec = true
        }
    },

    onShow() {
        console.log("App Show");
    },

    onHide() {
        console.log("App Hide");
    },
})