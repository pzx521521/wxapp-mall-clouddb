//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    hiddenmodalput: true, 
    password: '',
    vertify: false,
    initPassword: false,
    tip: '请输入密码',
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.checkPassword();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  //==============密码相关=========================
  inputPassword: function (e) {
    //第一次输入密码
    if (!app.globalData.password){
      this.changePassword();
      app.globalData.vertify = true
      this.setData({
        vertify: true,
      })      
    } 
    //判断密码是否正确
    else if (!app.globalData.vertify){
      if (app.globalData.password == this.data.password){
        app.globalData.vertify = true
        this.setData({
          vertify: true,
        })
      }else{
        this.setData({
          tip: "密码错误, 请重新输入!",
          hiddenmodalput: false,
        })        
      }      
    } 
    //修改密码
    else if (app.globalData.vertify){
      tip: "请输入新的密码!",
      this.changePassword();
    }
  },
  //--------------syngoodDB------------------------
  changePassword: function () {
    const db = wx.cloud.database();
    const _ = db.command;
    var passworddbid = this.data.passworddbid;
    db.collection('data1').doc(passworddbid).update({
      data: {
        //默认是更新  style.color  字段为 'blue' 而不是把  style  字段更新为  { color: 'blue' }  对象：
        //如果需要替换更新一条记录，可以在记录上使用  set  方法，替换更新意味着用传入的对象替换指定的记录：
        password: _.set(this.data.password)
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功：', this.data.password);
        wx.showToast({
          title: '[数据库][更新记录] 成功：' + this.data.password,
        })
      },
      fail: err => {
        icon: 'none',
          console.log('[数据库] [更新记录] 失败：', err)
      }
    })
  }, 
  checkPassword: function (e) {
    if (app.globalData.vertify) {
      this.setData({
        vertify: true,
      })
    } else {
      this.getPassword();
      if (!app.globalData.password) {
        this.setData({
          tip: "初次登录, 请输入密码",
          hiddenmodalput: false,
        })
      }
    }
  }, 
  getPassword: function (e) {
    var _this = this;
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data1').where({
      mark: "password"
    }).get({
      success: res => {
        this.setData({
          passworddbid: res.data[0]._id,
          tip: "请输入密码",
        })        
        app.globalData.password = res.data[0].password;  
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
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    this.inputPassword();
  },
  getpassword: function (e) {
    this.data.password = e.detail.value;
  },

})
