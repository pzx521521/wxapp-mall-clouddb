// page/component/details/details.js
Page({
  data:{
    goods: {},
    goodid: 0,
    num: 1,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },
  //Goods // 商品详情
  getGoods: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "goods"
    }).get({
      success: res => {
        for (var i = 0; i < res.data[0].data.length; i++) {
          if (res.data[0].data[i].id == this.data.goodid) {
            this.setData({
              goods: res.data[0].data[i]
            })
          }
        }
        var goodsPicsInfo = [];
        var goodsPicsObj = {};
        var goodspic = this.data.goods.goodspics;
        var goodspics = goodspic.substring(0, goodspic.length - 1);
        var goodspicsArr = goodspics.split("#");
        goodsPicsInfo.push({
          "picurl": this.data.goods.pic
        });
        for (var i = 0; i < goodspicsArr.length; i++) {
          goodsPicsInfo.push({
            "picurl": goodspicsArr[i]
          });
        }
        this.setData({
          goodsPicsInfo: goodsPicsInfo
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
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart: function (e) {
    const num = this.data.num;
    this.setData({
      show: true
    })
    var arr = wx.getStorageSync('cart') || [];
    // 如果购物车有数据
    if (arr.length > 0) {
      // 遍历购物车数组
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等
        if (arr[j]&&(arr[j].id == this.data.goodid)) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）
          arr[j].count = arr[j].count + num;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          // 返回（在if内使用return，跳出循环节约运算，节约性能）
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
      arr.push(this.data.goods);
    }
    // 购物车没有数据，把item项push放入当前数据（第一次存放时）
    else {
      arr.push(this.data.goods);
    }
    // 最后，把购物车数据，存放入缓存
    try {
      wx.setStorageSync('cart', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能）
      return;
    } catch (e) {
      console.log(e)
    }
  },  
  onLoad: function (options) {
    this.data.goodid = options.id;
    this.getGoods(options.goodid);
  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})