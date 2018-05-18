Page({
  data: {
    loadingPercent: 0
  },
  onReady: function () {
    this.updateLoadingPercent();
  }, 
  createRandom: function (mix, max) {
    var random = Math.ceil(Math.random() * (max - mix)) + mix;
    return random;
  },
  updateLoadingPercent: function () {
    var _this = this;
    var interval = setInterval(function () {
      var random = _this.createRandom(5, 15);
      var percent = (_this.data.loadingPercent + random >= 100) ? 100 : (_this.data.loadingPercent + random);
      if (percent == 100) {
        clearInterval(interval);
        var timeout = setTimeout(function () {
          wx.navigateTo({
            url: '../game/game'
          });
        }, 500);
      }
      _this.setData({
        loadingPercent: percent
      });
    }, 500);
  }
});