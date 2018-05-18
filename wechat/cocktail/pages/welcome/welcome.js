Page({
  data: {
    triggerStart: false
  },
  handleStart: function () {
    this.setData({
      triggerStart: true
    });
    var timeout = setTimeout(function () {
      wx.navigateTo({
        url: '../loading/loading'
      });
    }, 1300);
  }
});