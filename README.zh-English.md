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
```
4. Start the database (open another terminal)
```js
mongod
```
###### The source code
```js
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

## The basic configuration

#### Use the art-template template engine

- app is the project entry file, while router is the routing file

- User.js is the user user table

#### Login and registration
- use Html5 for form validation
- verify that the mailbox or nickname exists during registration. If so, prompt that the mailbox or nickname has been registered
- when logging in, look up the password in the data table. If it is correct, log in successfully and use md5 encryption twice. If it fails, the prompt will appear
- after successful login, it will jump to the personal homepage

#### Change the password
1. Determine whether the new passwords are the same twice, and prompt the user if they are different
2. The basic information setting page will be entered only after successful login, so the original password will be searched according to the mailbox, and the original password will be matched
3. If the password is changed successfully, it will jump to the login page for re-login

#### Get avatars
1. Use the iframe tag to inline a page in your personal Settings, and the avatarForm page to add pictures
2. After routing, switch to the cut page and use gm to cut the picture. When cutting, use the template engine to get the size of the picture
3. Upload the cropped picture to your own head position

#### Personal information modification
1. Modify the information according to the registered account
2. Return to the personal homepage after the information modification is completed
3. You need to log in again for viewing

#### Published an article
1. Design the article table structure
2. Click "initiate" to enter the new page, and then save the data into the article table
3. Complete the jump to the home page
4. Complete the rendering of the current article using the showdown plugin（Similar to the github readme format）
    - Deal with the structure of the title and article sections
    - Manage the timing of your posts

#### Realize the browsing of the article
- user
    * After the user publishes the article, redirects to the homepage to be able to browse own publication article
- tourists
    * Visitors can browse any article by clicking on the article without logging in

#### Time operation
The zeroing operations before hours, minutes and seconds were processed

#### Unsubscribe
The logout of the account is achieved and the account information is cleared from the database

###### Part of the code is as follows:
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
##### Upload code
1. git add .
2. git commit -m "Submit information"
3. git push

