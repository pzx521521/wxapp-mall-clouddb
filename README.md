# wxapp-mall-clouddb
微信小程序-云开发 商城 微信云数据库 无服务器 加后台管理
# 说明:
# 目前云开发仅针对认证后的公众号使用(每年300的费用那个)
作者用的时候还没有这个规定, 所以(不换appid且不用作者的微信登录) 或者()换非认证后的appid)
**后会导致 若干数据库相关的bug**, 如数据库修改无效等等 

+ 9.20更新: 数据库分为两个文件: db_data1.txt db_order.txt 分别导入data1, order. 注意修改为自己的openid
  数据上传的时候注意权限管理, 如果权限不对(openid不对应或者没有), 会导致读不到数据
## 前言
最近微信出了一个云开发, 就是有一个免费的数据库给你使用.
因为没有服务器所以是没有付款功能
这样就可以尝试这不是用后台进行开发
由于对小程序研究不深, 代码不一定是最优解, 代码也有很多不规范的地方和重复代码(懒得一个个改了)
数据上传的时候注意权限管理, 如果权限不对(openid不对应或者没有), 会导致读不到数据
## 如何使用
+ 如果需要范例数据, 请先导入数据库(在开发工具的云开发控制台)[点击查看官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/import.html)
+ 数据库是db.txt 一定要把openid改成自己的opendid, 不可以不填. 不是自己openid和不填都可能会导致读取不到
  order 要放在order数据库中 其他放在data1数据库中
+ 由于官方没有给出导出数据库, 在page/component/databaseGuide/savadb中给出了导出数据库, 会打印在控制台中  
+ 如果不需要范例数据请先进入后台插入数据
+ 如何进入后台: 在"我的"插页3s内点击头像7次(不要问我为什么是77777~)
+ 第一次进入后台会提示输入初始的密码, 进入后台会验证密码
## 更多说明
+ 因为没有服务器...  所以付款功能注释掉了, 需要的同学可以开一下, 然后写一下逻辑(逻辑和不付款冲突, 所以就没写)
+ 因为考虑到首页展示的要精细一点(相对于展示全部商品),因此会有不同的图片和标题, 管理首页的时候靠id关联 
+ 后台添加/管理页有详细的字段解释
## 功能
- [x] 首页
- [x] 搜索
- [x] 分类
- [x] 购物车
- [x] 个人中心
- [x] 商品列表
- [x] 商品详情
- [x] 订单
- [x] 地址管理
- [x] 后台增删商品列表
- [x] 后台增删商品详情
- [x] 后台增删订单

## 实现效果
![admin](http://pzx521521.github.io/pic/wxmailclouddb/admin.jpg) 
![admin_classifyMgr](http://pzx521521.github.io/pic/wxmailclouddb/admin_classifyMgr.jpg) 
![admin_goodsMgr](http://pzx521521.github.io/pic/wxmailclouddb/admin_goodsMgr.jpg) 
![admin_modifyIndex](http://pzx521521.github.io/pic/wxmailclouddb/admin_modifyIndex.jpg) 
![admin_modifyIndex2](http://pzx521521.github.io/pic/wxmailclouddb/admin_modifyIndex2.jpg) 
![admin_order](http://pzx521521.github.io/pic/wxmailclouddb/admin_order.jpg) 
![admin_order2](http://pzx521521.github.io/pic/wxmailclouddb/admin_order2.jpg) 
![cart](http://pzx521521.github.io/pic/wxmailclouddb/cart.jpg) 
![classify](http://pzx521521.github.io/pic/wxmailclouddb/classify.jpg) 
![detail](http://pzx521521.github.io/pic/wxmailclouddb/detail.jpg) 
![detail2](http://pzx521521.github.io/pic/wxmailclouddb/detail2.jpg) 
![index](http://pzx521521.github.io/pic/wxmailclouddb/index.jpg) 
![modal](http://pzx521521.github.io/pic/wxmailclouddb/modal.jpg) 
![password](http://pzx521521.github.io/pic/wxmailclouddb/password.jpg) 
![user](http://pzx521521.github.io/pic/wxmailclouddb/user.jpg) 

## 相关
文章：[css参考](https://github.com/lin-xin/wxapp-mall)

## 运行
需要安装有微信开发者工具。(9.10号以后的版本 基础库 2.2.3 开始支持)
把项目下载到本地。
在微信开发者工具中打开该项目则可预览。
## By the way
star me...
