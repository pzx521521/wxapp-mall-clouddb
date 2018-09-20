// page/component/databaseGuide/savadb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSliderList()
    this.getVenuesList()
    this.getChoiceList()
    this.getClassify()
    this.getGoods()
    this.getOrdersList()
  },
  showDB: function (e) {
    this.setData({
      simages: JSON.stringify(this.data.images),
      svenuesItems: JSON.stringify(this.data.venuesItems),
      schoiceItems: JSON.stringify(this.data.choiceItems),
      sorders: JSON.stringify(this.data.orders),
      snavLeftItems: JSON.stringify(this.data.navLeftItems),
      snavRightItems: JSON.stringify(this.data.navRightItems),
    })    
    
  },
  //getSliderList
  getSliderList: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "images"
    }).get({
      success: res => {
        this.setData({
          images: res.data[0]
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
  //venuesList
  getVenuesList: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "venuesItems"
    }).get({
      success: res => {
        this.setData({
          venuesItems: res.data[0],
          loadingHidden: true
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
  //getChoiceList
  getChoiceList: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "choiceItems"
    }).get({
      success: res => {
        this.setData({
          choiceItems: res.data[0],
          loadingHidden: true
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
  //Classify
  getClassify: function (e) {
    var _this = this;
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "classify"
    }).get({
      success: res => {
        this.setData({
          navLeftItems: res.data[0],
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
          navRightItems: res.data[0]
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
  //getOrdersList
  getOrdersList: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('order').get({
      success: res => {
        this.setData({
          orders: res.data,
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
})