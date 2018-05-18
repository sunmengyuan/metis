App({
  onLaunch: function (opts) {
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        _this.globalData.userInfo = res.userInfo;
      }
    })
  },
  onShow: function (opts) {

  },
  onHide: function () {

  },
  onError: function (msg) {
    
  },
  globalData: {
    userInfo: null
  }
});