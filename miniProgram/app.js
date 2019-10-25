//app.js
const appId = 1739272706,//1739272706,
    wsServerURL = "wss://wssliveroom-test.zego.im/ws",//即构demo专用，开发者请填写即构邮件发送给你的
   logServerURL = "https://wsslogger-test.zego.im/httplog";//可不填，sdk有配置时，配置的地址会覆盖这个地址,
App({

    globalData: {
        appId,
        tokenURL: "https://wsliveroom-alpha.zego.im:8282/token", // 即构提供的，开发阶段获取token，只能用于测试环境，正式环境一定要由业务服务器实现token
        wsServerURL,
        logServerURL,
        isCodec: false
    },

    onLaunch() {
        console.log("App Launch");
        if (this.globalData.appId === 96527232) {
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