var user=require("../models/user");
var formidable=require("formidable");
//var Content=require("../models/content");
//var acticals=require("../models/acticals");

exports.usersData = function (req, res) {
        user.find({ "email":req.session.user.email }, { "password": 0, by: 0 }, function (err, results) {
            //console.log(results)
            if (results.length == 0) {
                res.json({ "result": 0 });
            } else {
                res.json({
                    "result": 1,
                    "data": results[0]
                });
            }
        })
    
}