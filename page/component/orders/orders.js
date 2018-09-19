// page/component/orders/orders.js
const app = getApp();
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    openid:''
  },

  onReady() {
    
  },
  
  onShow:function(){
    const self = this;
    var orders = wx.getStorageSync('tempOder');
    self.setData({
      orders: orders
    })   
    this.getTotalPrice();
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },
  onLoad() {
    var self = this;
    /**
   * 获取用户信息
   */
    if (typeof (app.globalData.userInfo) == "undefined"){
      wx.showModal({
        title: '提示',
        content: '请先登录',
        text: 'center',
        complete() {
          wx.switchTab({
            url: '/page/component/user/user'
          })
        }
      })
    }else{
      console.log(app.globalData.userInfo);
    }
  },
  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].count * orders[i].price;
    }
    this.setData({
      total: total
    })
  },
  onAdd: function (order) {
    const db = wx.cloud.database()
    db.collection('order').add({
      data: order,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        wx.setStorageSync('tempOder', null); 
        wx.setStorageSync('cart', null);
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  toPay() { 
    var userInfo = app.globalData.userInfo; 
    var order ={};
    let orders = this.data.orders;
    if (orders.length == 0){
      return;
    } 
    order.openid = userInfo.openid;
    order.address = this.data.address;
    order.nickName = userInfo.nickName;
    order.data = orders;
    order.status ='已提交';
    order.count = 1;
    order.name = userInfo.nickName + new Date().getTime();
    order.thumb = orders[0].goodspics;
    order.money = this.data.total;   
    this.onAdd(order);
    wx.showModal({
      title: '提示',
      content: '已提交订单, 此处不负责付款',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/component/user/user'
        })
      }
    })
  },

})