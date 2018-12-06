var user=require("../models/user");
var formidable=require("formidable");
//var Content=require("../models/content");
//var acticals=require("../models/acticals");

exports.usersData = function (req, res) {
    console.log('23232323232'+req.body.email)
    //var form = new formidable.IncomingForm();
    //var form = new req.body.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //     console.log('fffffffffffffffff'+req.body.emai)
    //     user.find({ "email":req.body.emai }, { "password": 0, by: 0 }, function (err, results) {
    //         //console.log(req.json)
    //         console.log(result)
    //         if (results.length == 0) {
    //             res.json({ "result": 0 });
    //             //return;
    //         } else {
    //             res.json({
    //                 "result": 1,
    //                 "data": results[0]
    //             });
    //         }
    //         //    Content.find({"email":fields.email},function(err,result){
    //         //        res.json({
    //         //            "result":1,
    //         //            "data":results[0],//登陆用户的信息
    //         //            //"ContentNumber":result.length//获取用户文章的发布量
    //         //        });
    //         //    })
    //     })
    // })
}