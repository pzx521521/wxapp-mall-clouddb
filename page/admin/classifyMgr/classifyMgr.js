// page/admin/deleteClassify/deleteClassify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifydbid:'',
    classifydesc:'',
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
    this.getClassify();
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
  getClassify: function (e) {
    var _this = this;
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "classify"
    }).get({
      success: res => {
        this.setData({
          //根据id排序
          classify: res.data[0].data.sort(_this.classifyCompare),
          classifydbid: res.data[0]._id
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
  //-----------------add-----------------------------------
  classifyid: function (e) {
    this.data.classifyid = e.detail.value;
  },
  classifydesc: function (e) {
    this.data.classifydesc = e.detail.value;
  },
  addClassify: function (e) {
    let classify = this.data.classify;
    let classifydesc = this.data.classifydesc,
    classifyid = this.data.classifyid;
    if (!classifyid || !classifydesc){
      wx.showToast({
        icon: 'none',
        title: '请输入值, 不能为空'
      });
      return
    }
    var classifyidItem = {};
    classifyidItem.desc = classifydesc;
    classifyidItem.id = classifyid;
    classify.push(classifyidItem);
    this.setData({
      classify: classify,
    })
    this.synClassifyDB();
  },
  //---------------delete------------------------------
  deleteClassify: function (e) {
    let classify = this.data.classify;
    var index = e.currentTarget.dataset.index;
    classify.splice(index, 1);
    this.setData({
      classify: classify,
    })    
    this.synClassifyDB();
  },
  //--------------synClassifyDB------------------------
  synClassifyDB: function () {
    const db = wx.cloud.database();
    const _ = db.command;
    var classifydbid = this.data.classifydbid;
    db.collection('data1').doc(classifydbid).update({
      data: {
        //默认是更新  style.color  字段为 'blue' 而不是把  style  字段更新为  { color: 'blue' }  对象：
        //如果需要替换更新一条记录，可以在记录上使用  set  方法，替换更新意味着用传入的对象替换指定的记录：
        data: _.set(this.data.classify)
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功：', classifydbid);
        wx.showToast({
          title: '[数据库][更新记录] 成功：' + classifydbid,
        })
      },
      fail: err => {
        icon: 'none',
          console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  },  

})