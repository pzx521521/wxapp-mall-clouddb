// page/admin/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        id: options.id,
      })
      this.getOrdersList(options.id)
    }    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //getOrdersList
  getOrdersList: function (id) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('order').where({
      name: id
    }).get({
      success: res => {
        this.setData({
          orders: res.data[0],
          hasList: true
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