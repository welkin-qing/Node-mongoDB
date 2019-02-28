简体中文 | [English](./README.zh-English.md) 

<div align="center">

![](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/logo.png)

A multi-person blog based on MongoDB database and node+express

一个基于MongoDB数据库，使用 node+express 开发的多人博客

![](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/release-1.0-darkcyan.svg)
![](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/build-passing-brightgreen.svg)
![](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/dependencies-up%20to%20date-brightgreen.svg)
![](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/license-MIT-darkcyan.svg)

</div>

-----

# 安装及使用
### 1.首先需要本地安装 MongoDB 数据库 
1. 装包
```js
npm init -y
npm install --save mongoose
```
2. 连接数据库
```js
mongoose.connect(‘mongodb://localhost/test’)
```
3. 设计数据表
```js
var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})
```
4. 启动数据库(另打开终端)
```js
mongod
```
###### 源码
```
var mongoose = require('mongoose')

var Schema = mongoose.Schema
//连接数据库
mongoose.connect('mongodb://localhost/test')

var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

var User = mongoose.model('User', userSchema)

```
[mongodb数据库安装及使用教程](https://blog.csdn.net/Welkin_qing/article/details/83420214)

### 2.安装项目到本地
```js
git clone https://github.com/welkin-qing/Node-mongoDB
cd Node-mongoDB
npm install
node app.js
```
-----

## 基本配置

#### 使用art-template模板引擎

- app为项目入口文件，router为路由文件

- user.js为user用户表

#### 登录注册
- 使用 Html5 进行表单验证
- 注册时验证邮箱或昵称是否存在，若存在则提示邮箱或昵称已经注册过
- 登录时，在数据表中查找密码，若正确则登录成功并使用两次md5加密，若失败则提示
- 登录成功则跳转到个人主页页面

#### 更换密码

1. 先判断两次的新密码是否相同，若不相同则提示用户
2. 因为登录成功才会进入到基本信息设置页面，所以根据邮箱进行查找原始密码，对原始密码进行匹配
3. 更换密码成功则跳转到登录页进行重新登录

#### 获取头像
1. 先在个人设置里使用使用iframe标签内联一个页面，avatarForm页面，用来添加图片
2. 再进行路由切换到cut页面使用gm进行裁剪图片，裁剪的时候使用模板引擎进行对图片大小的获取
3. 将裁剪好的图片上传到自己的头像位置

[添加图片](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/choose.png)

[裁剪图片](https://github.com/welkin-qing/Node-mongoDB/blob/master/img/cut.png)

#### 个人信息修改
1. 根据注册的账号进行对信息的修改
2. 信息修改完成后回到个人主页
3. 需要重新登录进行查看

#### 发表文章
1. 设计文章表article结构
2. 点击发起进入new页面，然后将数据保存到article表中
3. 完成到主页的跳转
4. 使用showdown插件完成对当前文章的渲染（类似于github readme格式）
    - 处理好标题和文章板块的结构
    - 处理好发布文章的时间

#### 实现文章的浏览
- 用户
    * 用户发表文章之后，跳转到主页可以浏览自己发表的文章
- 游客
    * 游客在不用登录之前，点击文章可以浏览任意文章

#### 时间操作
处理了具体小时，分钟，秒前面的补零操作

#### 注销账户
实现了账户的注销，并且从数据库中清除该账户信息

部分代码如下：
```js
if(req.session.user){
    User.find({
      email: req.session.user.email
    }, function(err, user){
      if(err){
        return next(err)
      }else{
        //console.log(user)
        User.deleteMany({ email: req.session.user.email }, function(err, user){
          if(err){
            return next(err)
          }
          req.session.user = null
          res.status(200).json({
            err_code: 0,
            message: 'OK'
          })
        })
      }
    })
  }else{
    res.render('login.html')
  }
```
##### 上传代码
1. git add .
2. git commit -m "提交信息"
3. git push

