var app = getApp()
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: '',
    curIndex: 0
  },
  classifyCompare: function (obj1, obj2) {
    if (obj1.id < obj2.id) {
      return -1;
    } else if (obj1.id > obj2.id) {
      return 1;
    } else {
      return 0;
    }
  }, 
  //Classify
  getClassify: function (e) {
    var _this =this;
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "classify"
    }).get({
      success: res => {
        this.setData({
          navLeftItems: res.data[0].data.sort(_this.classifyCompare),
          curNav: res.data[0].data[0].desc
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  //Goods
  getGoods: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "goods"
    }).get({
      success: res => {
        this.setData({
          navRightItems: res.data[0].data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  onLoad: function () {
    var that = this;
    this.getClassify();
    this.getGoods();
  },

  //事件处理函数
  switchRightTab: function (e) {
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index,
    })
  }

})