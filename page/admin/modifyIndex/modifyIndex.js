// page/admin/modifyIndex/modifyIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imodel: 1,
    //dbid
    imagedbid: '',
    venuesItemsdbid: '',
    choiceItemsdbid: '',
    //----input---
    imagepicurl: '',
    venuesItemspicurl: '',
    venuesItemsid: '',
    choiceItemspicurl: '',
    choiceItemsTitel: '',
    choiceItemsid: '',
    //----inputEnd---
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSliderList();
    this.getVenuesList();
    this.getChoiceList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  inputOnBlur: function (e) {

  },
  changeDeal: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      imodel: index
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
          images: res.data[0].images || [],
          imagedbid: res.data[0]._id
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
          venuesItems: res.data[0].venuesItems || [],
          venuesItemsdbid: res.data[0]._id,
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
          choiceItems: res.data[0].choiceItems || [],
          choiceItemsdbid: res.data[0]._id,
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
  //----------------------SliderList------------------
  imagepicurl: function (e) {
    this.data.imagepicurl = e.detail.value;
    e.detail.value = '';
  },
  addImages: function (e) {
    let images = this.data.images,
      imagepicurl = this.data.imagepicurl,
      imagedbid = this.data.imagedbid;
    var image = {};
    if (!imagepicurl) {
      wx.showToast({
        icon: 'none',
        title: '请输入网址'
      })
      return
    }    
    image.picurl = imagepicurl;
    images.push(image);
    this.setData({
      images: images,
    })
    this.synImagesDB(imagedbid);
  },
  deleteImages: function (e) {
    let images = this.data.images,
      imagedbid = this.data.imagedbid;
    var index = e.currentTarget.dataset.index;
    images.splice(index, 1);
    this.setData({
      images: images,
    })
    this.synImagesDB(imagedbid);
  },
  synImagesDB: function (imagedbid) {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('data1').doc(imagedbid).update({
      data: {
        //默认是更新  style.color  字段为 'blue' 而不是把  style  字段更新为  { color: 'blue' }  对象：
        //如果需要替换更新一条记录，可以在记录上使用  set  方法，替换更新意味着用传入的对象替换指定的记录：
        images: _.set(this.data.images)
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功：', imagedbid);
        wx.showToast({
          title: '[数据库][更新记录] 成功：' + imagedbid,
        })
        this.setData({
          imagepicurl: '',
        })
      },
      fail: err => {
        icon: 'none',
          console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  //----------------------venuesList------------------
  venuesItemspicurl: function (e) {
    this.data.venuesItemspicurl = e.detail.value;
  },
  venuesItemsid: function (e) {
    this.data.venuesItemsid = e.detail.value;
  },
  addVenuesItems: function (e) {
    let venuesItems = this.data.venuesItems,
      venuesItemsdbid = this.data.venuesItemsdbid,
      venuesItemspicurl = this.data.venuesItemspicurl,      
      venuesItemsid = this.data.venuesItemsid;
    var venuesItem = {};
    if (!venuesItemsid || !venuesItemspicurl) {
      wx.showToast({
        icon: 'none',
        title: '请输入网址和id'
      })
      return
    }
    if (isNaN(venuesItemsid)) {
      wx.showToast({
        icon: 'none',
        title: 'id请输入对应的数字'
      })
      return
    }  
    venuesItem.smallpic = venuesItemspicurl;
    venuesItem.id = venuesItemsid;
    venuesItems.push(venuesItem);
    this.setData({
      venuesItems: venuesItems,
    })
    this.synVenuesItemsDB(venuesItemsdbid);
  },
  deleteVenuesItems: function (e) {
    let venuesItems = this.data.venuesItems,
      venuesItemsdbid = this.data.venuesItemsdbid;
    var index = e.currentTarget.dataset.index;
    venuesItems.splice(index, 1);
    this.setData({
      venuesItems: venuesItems,
    })
    this.synVenuesItemsDB(venuesItemsdbid);
  },
  synVenuesItemsDB: function (venuesItemsdbid) {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('data1').doc(venuesItemsdbid).update({
      data: {
        //默认是更新  style.color  字段为 'blue' 而不是把  style  字段更新为  { color: 'blue' }  对象：
        //如果需要替换更新一条记录，可以在记录上使用  set  方法，替换更新意味着用传入的对象替换指定的记录：
        venuesItems: _.set(this.data.venuesItems)
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功：', venuesItemsdbid);
        wx.showToast({
          title: '[数据库][更新记录] 成功：' + venuesItemsdbid,
        })
        this.setData({
          venuesItemspicurl: '',
          venuesItemsid: '',
        })
      },
      fail: err => {
        icon: 'none',
          console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  //----------------------ChoiceList------------------

  choiceItemspicurl: function (e) {
    this.data.choiceItemspicurl = e.detail.value;
  },
  choiceItemsid: function (e) {
    this.data.choiceItemsid = e.detail.value;
  },
  choiceItemsTitel: function (e) {
    this.data.choiceItemsTitel = e.detail.value;
  },
  addChoiceItems: function (e) {
    let choiceItems = this.data.choiceItems,
      choiceItemsdbid = this.data.choiceItemsdbid,
      choiceItemspicurl = this.data.choiceItemspicurl,
      choiceItemsTitel = this.data.choiceItemsTitel,
      choiceItemsid = this.data.choiceItemsid;
    var choiceItem = {};
    if (!choiceItemsid || !choiceItemspicurl || !choiceItemsTitel) {
      wx.showToast({
        icon: 'none',
        title: '请输入网址,titel和id'
      })
      return
    }
    if (isNaN(choiceItemsid)) {
      wx.showToast({
        icon: 'none',
        title: 'id请输入对应的数字'
      })
      return
    }  
    choiceItem.goodspics = choiceItemspicurl;
    choiceItem.id = choiceItemsid;
    choiceItem.title = choiceItemsTitel;
    choiceItems.push(choiceItem);
    this.setData({
      choiceItems: choiceItems,
    })
    this.synChoiceItemsDB(choiceItemsdbid);
  },
  deleteChoiceItems: function (e) {
    let choiceItems = this.data.choiceItems,
      choiceItemsdbid = this.data.choiceItemsdbid;
    var index = e.currentTarget.dataset.index;
    choiceItems.splice(index, 1);
    this.setData({
      choiceItems: choiceItems,
    })
    this.synChoiceItemsDB(choiceItemsdbid);
  },
  synChoiceItemsDB: function (choiceItemsdbid) {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('data1').doc(choiceItemsdbid).update({
      data: {
        //默认是更新  style.color  字段为 'blue' 而不是把  style  字段更新为  { color: 'blue' }  对象：
        //如果需要替换更新一条记录，可以在记录上使用  set  方法，替换更新意味着用传入的对象替换指定的记录：
        choiceItems: _.set(this.data.choiceItems)
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功：', choiceItemsdbid);
        wx.showToast({
          title: '[数据库][更新记录] 成功：' + choiceItemsdbid,
        });
        this.setData({
          venuesItemspicurl: '',
          choiceItemsid: '',
          choiceItemspicurl: '',
        })
      },
      fail: err => {
        icon: 'none',
          console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  },

})