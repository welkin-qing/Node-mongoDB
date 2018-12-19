var formidable=require("formidable");
var url=require("url");
var user = require('../models/user')
//var Content=require("../models/user.js");
//var acticals=require("../models/acticals");
exports.dosave=(req,res)=>{
    //存储发布文章的详细内容
    var form=new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        console.log('aaaaaaaaaa')
        console.log(fields);
        
        var username=req.session.username;
        var email=req.session.email;
        var content=fields.content;
        var picture=fields.picture;
        var nackname=fields.nackname;
        var avatar=fields.avatar;
        var date=new Date();
        Content.create({
            username,
            email,
            nackname,
            content,
            picture,
            date,
            avatar 
        },(err,results)=>{
            Content.find({"_id":results._id},(err,result)=>{
                 var id=result[0]._id;//把文章的唯一_id存储
                 acticals.create({//存储发布文章的同时 生成一个新的acticals 集合用来存储 点赞的信息
                     "host":email
                 },(err,resul)=>{
                     var secondID=resul._id;
                     acticals.updateOne({"_id":secondID},{"$set":{"id":id}},(err,resu)=>{//把文章的唯一_id存储在acticals集合中
                            res.json({
                                "result":1
                            })
                     })
                 })
            })
        });
    })
}

exports.getContent=(req,res)=>{
    Content.find({},(err,result)=>{
        acticals.find({},(err,resul)=>{
            res.send({
                "Content":result,
                "acticals":resul
            });
        })  
    })
}