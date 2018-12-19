//article表
var mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
var Schema = mongoose.Schema

var articleSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    topic: {  //标题
        type: String,
        default: ''
    },
    content: {  //内容
        type: String,
        default: ' '
    },
    plate: {  //板块
        type: String,
        default: '分享'
    },
    created_time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Article', articleSchema)
