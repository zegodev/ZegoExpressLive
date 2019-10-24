function _request({url, data = {}}) {
    return new Promise((res, rej) => {
        wx.request({
            url,  //该接口由开发者后台自行实现，开发者的 Token 从各自后台获取
            data,
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

function getLoginToken(userID, appid) {
    let { tokenURL } = getApp().globalData;
    return _request({
        url: tokenURL,
        data: {
            app_id: appid,
            id_name: userID,
        }
    })
}

module.exports = {
    getLoginToken,
};