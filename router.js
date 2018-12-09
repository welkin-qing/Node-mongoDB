var express = require('express')
var User = require('./models/user')
var formidable = require('formidable'); 
var multer = require('multer')
const path = require('path');
var fs = require('fs')
var md5 = require('blueimp-md5')

var upload = multer({dest:'upload/'});
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res, next) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      // return res.status(500).json({
      //   err_code: 500,
      //   message: err.message
      // })
      return next(err)
    }
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }
    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/register', function (req, res, next) {
  res.render('register.html')
})

router.post('/register', function (req, res, next) {
  var body = req.body
  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return next(err)
    }
    // console.log(data)
    if (data) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
      return res.send(`邮箱或者密码已存在，请重试`)
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        return next(err)
      }

      // 注册成功，使用 Session 记录用户的登陆状态
      req.session.user = user

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  })
})
//neww
router.get('/topic/new',function(req, res){
  
  if(req.session.user){
    res.render('topic/new.html', {
      user: req.session.user
    })
  }else{
    res.render('login.html')
  }
})
//show
router.get('/topic/show',function(req, res){
  
  if(req.session.user){
    res.render('topic/show.html', {
      user: req.session.user
    })
  }else{
    res.render('login.html')
  }
})

//请求profile页面
router.get('/settings/profile',function(req, res){
  if(req.session.user){
    res.render('settings/profile.html', {
      user: req.session.user
    })
  }else{
    res.render('login.html')
  }
})

router.post('/settings/profile', function (req, res, next) {
  var body = req.body
  //var user = req.session.user
  User.find({
    email: req.session.user.email
  }, function (err, user) {
    if (err) {
      return next(err)
    } else {
      User.update({ email: req.session.user.email }, {
        $set: {
          nickname: body.nickname,
          bio: body.bio,
          gender: body.gender,
          birthday: body.birthday
        }
      }, function (err, user) {
        if (err) {
          return next(err)
        } else {
          if (req.session.user.nModified != 0) {
            req.session.user = user
            res.status(200).json({
              err_code: 0,
              message: 'OK',
              result: 1
            })
            
          }
        }

      })
    }
  })
})

//请求avatarForm页面
router.get('/settings/avatarForm',function(req, res){
  
  if(req.session.user){
    res.render('settings/avatarForm.html', {
      user: req.session.user
    })
  }else{
    res.render('login.html')
  }
})

//admin
router.get('/settings/admin',function(req, res){
  if(req.session.user){
    res.render('settings/admin.html', {
      user: req.session.user
    })
  }else{
    res.render('login.html')
  }
  //console.log(user.password)
})

router.post('/settings/admin', function (req, res, next) {
  var body = req.body
  var str = ''
  User.find({
    email: req.session.user.email
  }, function (err, user) {
    if (err) {
      return next(err)
    } else {
      str = req.session.user.password
      if (str === md5(md5(body.password[0]))) {
        if (body.password[1] === body.password[2]) {
          User.update({ email: req.session.user.email }, { $set: { password: md5(md5(body.password[1])) } }, function (err, user) {
            if (err) {
              return next(err)
            }
            req.session.user = user
            res.status(200).json({
              err_code: 0,
              message: 'OK'
            })
          })
        } else {
          return res.status(200).json({
            err_code: 2,
            message: ' password error.'
          })
        }
      } else {
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid.'
        })
      }
    }

    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

  })

})

router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null

  // 重定向到登录页
  res.redirect('/login')
})


module.exports = router
