var app = getApp();
Page({
  data: {
    cocktailName: '鸡尾酒',
    curTab: 'glass',
    curOption: {
      glass: 'glass1',
      layer: 'layer1',
      color: '',
      fruit: ''
    },
    triggerShake: false,
    triggerDecorate: false,
    triggerName: false,
    triggerResult: false,
    color: {
      trigger: false,
      placeholder: {
        glass1: [30, 135],
        glass2: [40, 170],
        glass3: [28, 65]
      },
      colorRef: ['#ff9a96', '#bff2ff', '#ffbfec', '#fff5bd', '#a9ffed', '#ffd9ab'],
      colorLst: [],
      gradient: ''
    },
    layer: {
      layer1: [0, 1],
      layer2: [0, 0.33, 1],
      layer3: [0, 0.25, 0.5, 1],
      layer4: [0, 0.5, 1],
      layer5: [0, 0.75, 1],
      layer6: [0, 0.33, 0.66, 1]
    },
    fruit: {
      glass1: {
        fruit1: [67, 78],
        fruit2: [65, 78],
        fruit3: [65, 85],
        fruit4: [58, 80],
        fruit5: [59, 80],
        fruit6: [60, 75]
      },
      glass2: {
        fruit1: [35, 70],
        fruit2: [30, 70],
        fruit3: [30, 75],
        fruit4: [23, 70],
        fruit5: [26, 73],
        fruit6: [25, 70]
      },
      glass3: {
        fruit1: [142, 78],
        fruit2: [140, 78],
        fruit3: [140, 84],
        fruit4: [133, 78],
        fruit5: [135, 78],
        fruit6: [135, 72]
      }
    },
    decorate: {
      trigger: [false, false, false, false, false, false],
      glass1: {
        decorate1: [-24, 36],
        decorate2: [90, 78],
        decorate3: [-15, 105],
        decorate4: [-10, 45],
        decorate5: [-10, 95],
        decorate6: [-15, 100]
      },
      glass2: {
        decorate1: [-15, 30],
        decorate2: [130, 74],
        decorate3: [-10, 115],
        decorate4: [0, 40],
        decorate5: [0, 100],
        decorate6: [-5, 105]
      },
      glass3: {
        decorate1: [-13, 5],
        decorate2: [10, 72],
        decorate3: [-17, 140],
        decorate4: [0, 20],
        decorate5: [-12, 122],
        decorate6: [-10, 135]
      }
    }
  },
  onReady: function () {
  
  },
  handleTab: function (e) {
    var curTab = e.target.dataset.tab;
    this.setData({
      curTab: curTab
    });
  },
  handleOption: function (e) {
    var option = e.target.dataset.option;
    switch (this.data.curTab) {
      case 'glass':
        this.setData({
          'curOption.glass': option
        });
        break;
      case 'fruit':
        this.setData({
          'curOption.fruit': option
        }); 
        break;
      case 'layer':
        this.data.color.trigger || this.setData({
          'curOption.layer': option
        }); 
        break;
      case 'color':
        var layerParam = this.data.layer[this.data.curOption.layer];
        var index = option.split('color')[1] - 1;
        var colorRef = this.data.color.colorRef[index];
        var colorLst = this.data.color.colorLst;
        var colorLength = layerParam.length - 1;
        var gradient = '';
        (colorLst.length < colorLength) && colorLst.push(colorRef);
        for (var i = 0; i < colorLst.length;i++) {
          gradient += 'color-stop(' + layerParam[i] + ',' + colorLst[i] + '),color-stop(' + layerParam[i + 1] + ',' + colorLst[i] + '),';
        }
        if (colorLst.length < colorLength) {
          gradient += 'color-stop(' + layerParam[colorLst.length] + ',#fff),color-stop(1,#fff),';
        }
        this.setData({
          'color.trigger': true,
          'color.gradient': gradient.slice(0, -1),
          'color.colorLst': colorLst
        }); 
        break;
    }
  },
  handleReset: function () {
    this.setData({
      'curOption.color': '',
      'curOption.fruit': '',
      'color.trigger': false,
      'color.colorLst': [],
      'color.gradient': ''
    }); 
  },
  handleShake: function () {
    var _this = this;
    var layerParam = this.data.layer[this.data.curOption.layer];
    var colorLst = this.data.color.colorLst;
    var colorLength = layerParam.length - 1;
    var gradient = '';
    for (var i = 0; i < colorLst.length; i++) {
      gradient += 'color-stop(' + layerParam[i] + ',' + colorLst[i] + '),';
    }
    if (colorLst.length < colorLength) {
      gradient += 'color-stop(' + layerParam[colorLst.length] + ',#fff),color-stop(1,#fff),';
    }
    _this.setData({
      'triggerShake': true
    });
    var t = setTimeout(function () {
      _this.setData({
        'triggerShake': false,
        'triggerDecorate': true,
        'color.gradient': gradient.slice(0, -1)
      });
    }, 600);
  },
  handleDecorate: function (e) {
    var option = e.target.dataset.option;
    var index = option.split('decorate')[1] - 1;
    var decorateTrigger = this.data.decorate.trigger;
    decorateTrigger[index] = !decorateTrigger[index];
    this.setData({
      'decorate.trigger': decorateTrigger
    });
  },
  handleFinish: function () {
    this.setData({
      'triggerName': true
    });
  },
  handleName: function (e) {
    var value = e.detail.value;
    this.setData({
      'cocktailName': value,
      'triggerName': false,
      'triggerResult': true
    });
  },
  onShareAppMessage: function () {
    return {
      title: (app.globalData.userInfo.nickName || '我') + '调制了一杯【' + this.data.cocktailName + '】，你也来试试吧！',
      desc: '调制你的专属鸡尾酒',
      path: '/pages/welcome/welcome'
    }
  }
});