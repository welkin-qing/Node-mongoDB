[简体中文](https://github.com/welkin-qing/Node-mongoDB) | English

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

# Installation and use
### 1. The first step is to install MongoDB database locally
1. Install package
```js
npm init -y
npm install --save mongoose
```
2. Connect to the database
```js
mongoose.connect(‘mongodb://localhost/test’)
```
3. Design data tables
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
4. Start the database (open another terminal)
```js
mongod
```
###### The source code
```
var mongoose = require('mongoose')

var Schema = mongoose.Schema
//Connect to the database
mongoose.connect('mongodb://localhost/test')

var userSchema = new Schema({
  username: {
    type: String,
    required: true // There must be
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
[Mongodb database installation and use tutorial](https://blog.csdn.net/Welkin_qing/article/details/83420214)

### 2.Install the project locally
```js
git clone https://github.com/welkin-qing/Node-mongoDB
cd Node-mongoDB
npm install
node app.js
```
-----