function getLoginToken(userId, appId) {
    let { tokenURL } = getApp().globalData;
    return new Promise((res, rej) => {
        wx.request({
            url: tokenURL,  //该接口由开发者后台自行实现，开发者的 Token 从各自后台获取
            data: {
                app_id: appId,
                id_name: userId,
            },
            header: {
                'content-type': 'text/plain'
            },
            success(result) {
                console.log(">>>[liveroom-room] get login token success. token is: " + result.data);
                if (result.statusCode != 200) {
                    return;
                }
                res(result.data);
            },
            fail(e) {
                console.log(">>>[liveroom-room] get login token fail, error is: ")
                console.log(e);
                rej(e)
            }
        })
    })
}

module.exports = {
    getLoginToken,
};