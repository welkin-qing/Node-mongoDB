var path = require('path')
var url = require('url')
var fs = require('fs')
var formidable=require("formidable");
var Article = require('../models/article')
var user = require('../models/user')

exports.getArticle = function(req, res){
   // console.log('88888888889999999999999')
    //console.log(abc)
   // console.log(req.body)
   // var pathname=url.parse(req.url,true).query;
    //console.log(pathname)
    Article.find({
        email: req.body.email,
    }, (err, result) => {
        res.send({
            content:  result,
            result: 1
        })
    })
}

exports.getdata = function(req, res){
    Article.find({
        //email: req.body.email,  //查询所有
    }, (err, result) => {
        res.send({
            content:  result,
            result: 1
        })
    })
}