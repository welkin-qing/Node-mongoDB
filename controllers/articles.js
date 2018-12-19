var path = require('path')
var url = require('url')
var fs = require('fs')
var Article = require('./models/article')

exports.getArticle = (req, res) => {
    var pathname=url.parse(req.url,true).query;
    Article.find({
        email: pathname.email,
    }, (err, result) => {
        res.send({
            content:  result.content
        })
    })
}