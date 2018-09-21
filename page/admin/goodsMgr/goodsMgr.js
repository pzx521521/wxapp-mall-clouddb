// page/admin/goodsMgr/goodsMgr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
          goods: res.data[0].data,
          gooddbid: res.data[0]._id
        })
        this.getMaxid();
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
  getMaxid: function (e) {
    let goods = this.data.goods,
      maxid = 0;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].id > maxid){
        maxid = goods[i].id;
      }      
    }
    this.setData({
      maxid: maxid,
    })    
  }, 
  //-----------------add-----------------------------------
  getValue: function (e) {
    this.setData({
      goodid: e.detail.value.goodid,
      goodclassify: e.detail.value.goodclassify,
      gooddesc: e.detail.value.gooddesc,
      goodpic: e.detail.value.goodpic,
      gooddprice: e.detail.value.gooddprice,
      gooddetail: e.detail.value.gooddetail,
      goodgoodspics: e.detail.value.goodgoodspics,
      goodparameter: e.detail.value.goodparameter,
      goodservice: e.detail.value.goodservice,
      goodtitle: e.detail.value.goodtitle,
    })
    this.addGood();
  },
  addGood: function (e) {
    let goods = this.data.goods;
    let goodid = this.data.goodid,
      goodclassify = this.data.goodclassify,
      gooddesc = this.data.gooddesc,
      goodpic = this.data.goodpic,
      gooddprice = this.data.gooddprice,
      gooddetail = this.data.gooddetail,
      goodgoodspics = this.data.goodgoodspics,
      goodparameter = this.data.goodparameter,
      goodservice = this.data.goodservice,
      goodtitle = this.data.goodtitle;
    if (!goodid || !goodclassify || !goodpic || !gooddprice){
      wx.showToast({
        icon: 'none',
        title: '请输入值, 必填值不能为空'
      });
      return
    }
    //NaN: Not a Number
    if (isNaN(gooddprice)) {
      wx.showToast({
        icon: 'none',
        title: gooddprice+ '不是数字'
      });
      return
    }
    var goodidItem = {};
    goodidItem.id = goodid;
    goodidItem.classify = goodclassify;
    goodidItem.desc = gooddesc;
    goodidItem.goodspics = goodpic;
    goodidItem.price = gooddprice;

    goodidItem.detail = gooddetail;
    goodidItem.goodspics = goodgoodspics;
    goodidItem.parameter = goodparameter;
    goodidItem.service = goodservice;
    goodidItem.title = goodtitle;

    goods.push(goodidItem);
    this.setData({
      goods: goods,
    })
    this.getMaxid();
    this.syngoodDB();
  },
  //---------------delete------------------------------
  deleteGoods: function (e) {
    let goods = this.data.goods;
    var index = e.currentTarget.dataset.index;
    goods.splice(index, 1);
    this.setData({
      goods: goods,
    })    
    this.getMaxid();
    this.syngoodDB();
  },
  //--------------syngoodDB------------------------
  syngoodDB: function () {
    const db = wx.cloud.database();
    const _ = db.command;
    var gooddbid = this.data.gooddbid;
    db.collection('data1').doc(gooddbid).update({
      data: {
        //默认是更新  style.color  字段为 'blue' 而不是把  style  字段更新为  { color: 'blue' }  对象：
        //如果需要替换更新一条记录，可以在记录上使用  set  方法，替换更新意味着用传入的对象替换指定的记录：
        data: _.set(this.data.goods)
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功：', gooddbid);
        wx.showToast({
          title: '[数据库][更新记录] 成功：' + gooddbid,
        })
      },
      fail: err => {
        icon: 'none',
          console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  },  
})