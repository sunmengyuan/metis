const BaseInfo = {
    mobile: '',
    system: '',
    wechat: '',
    lat: '',
    lng: '',
    winWidth: '',
    winHeight: ''
};

function getMobileInfo (i) {
    wx.getSystemInfo({
        success: (res) => {
            BaseInfo.mobile = res.brand + res.model;
            BaseInfo.system = res.platform + res.system;
            BaseInfo.wechat = res.version;
            BaseInfo.winWidth = res.windowWidth / (res.windowWidth / 750);
            BaseInfo.winHeight = res.windowHeight / (res.windowWidth / 750);
        },
        fail: () => {
            (i < 3) && getMobileInfo(i + 1);
        }
    });
}
function getLocation (i) {
    wx.getLocation({
        success: (res) => {
            BaseInfo.lat = res.latitude;
            BaseInfo.lng = res.longitude;
        },
        fail: () => {
            (i < 3) && getLocation(i + 1);
        }
    });
}

getMobileInfo(1);
getLocation(1);

module.exports = {
    getBaseInfo: () => {
        return BaseInfo;
    }
}
