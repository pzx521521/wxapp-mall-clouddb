// page/admin/allOrders/allOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdeal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrdersList();
  },

  //getOrdersList
  getOrdersList: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('order').where({
      
    }).get({
      success: res => {
        this.setData({
          orders: res.data,
        })
        var orders = this.data.orders; 
        var orders_deal = [];
        var orders_nodeal = [];
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].isdeal){
            orders_deal.push(orders[i])
          }else{            
            orders_nodeal.push(orders[i])
          }
        }
        this.setData({
          orders_deal: orders_deal,
          orders_nodeal: orders_nodeal
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
  changeDeal: function(e) {
    this.setData({
      isdeal: !this.data.isdeal
    })
    
  },
  markDeal: function (e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定标记为已处理?',
      success: function (res) {
        if (res.confirm) {
          var item = e.currentTarget.dataset.obj;
          var index = e.currentTarget.dataset.index;
          let dbid = e.currentTarget.dataset.dbid;
          let orders_deal = _this.data.orders_deal;
          let orders_nodeal = _this.data.orders_nodeal;
          orders_deal.push(item);
          orders_nodeal.splice(index, 1);
          _this.setData({
            orders_deal: orders_deal,
            orders_nodeal: orders_nodeal
          }); 
          _this.DBmarkDeal(dbid);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })   
  }, 
  DBmarkDeal: function (counterId) {
    if (!counterId){
      return
    }
    const db = wx.cloud.database()
    db.collection('order').doc(counterId).update({
      data: {
        isdeal: true
      },
      success: res => {
        console.error('[数据库] [更新记录] 成功：', counterId)
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },  
})