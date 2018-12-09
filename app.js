var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var mysql = require('mysql')
var formidable = require('formidable')
var router = require('./router')

var app = express()

var avatar = require('./controllers/avatar')
var content = require('./controllers/content')
var users = require("./controllers/users")

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/',express.static(path.join(__dirname, './node_modules/')))
app.use('/uploads', express.static('./uploads'))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录



// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(
    session({
        // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
        // 目的是为了增加安全性，防止客户端恶意伪造
        secret: 'welkin',
        resave: false,
        saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
    })
)

// 把路由挂载到 app 中
app.use(router)

app.get('/avatar', avatar.showPage)
app.post('/avatar', avatar.doAvatar)
app.get('/settings/cut', avatar.cutPage)
app.post("/settings/cut" ,avatar.saveAvatar);
app.post("/send"       ,content.dosave);
app.checkout('/settings/profile', users.usersData)
// 配置一个处理 404 的中间件
app.use(function(req, res) {
    res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function(err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

app.listen(5000, function() {
    console.log('running...')
})
