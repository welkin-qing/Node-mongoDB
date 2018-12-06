var formidable = require('formidable')
var path = require('path')
var url = require('url')
var fs = require('fs')
var gm = require('gm')
var user = require('../models/user')

exports.showPage = (req, res) => {
    res.render('settings/avatarForm.html', {})
}
//上传图片

exports.doAvatar = (req, res) => {
    var form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../uploads/images')
    form.keepExtensions = true
    form.maxFieldsSize = 5 * 1024 * 1024
    form.parse(req, (err, fields, files) => {
        if (!err) {
            var pathname = url
                .parse(files.realfile.path)
                .pathname.match(/\/(upload_.+)$/)[1]
            req.session.cuturl = pathname
            res.redirect('/settings/cut')
        } else {
            console.log(err)
            res.send('Error!plase try again later!')
        }
    })
}
//下发要裁剪的图片
exports.cutPage = (req, res) => {
    /*调试语句*开始*/
    if (req.session.cuturl == '') {
        res.redirect('/settings/profile')
        return
    }
    /*调试语句*结束*/
    //gm获取图片尺寸
    var avatarurl = path.resolve(
        __dirname,
        '../uploads/images/' + req.session.cuturl
    )
    gm(avatarurl).size((err, size) => {
        var origin_w = size.width //获取裁剪图片宽
        var origin_h = size.height //获取裁剪图片高
        //如果图片尺寸比大于500/400，则规定宽=500，且宽要大于500，不然图片会被拉宽
        if (origin_w / origin_h >= 500 / 400 && origin_w > 500) {
            //console.log(1)
            var view_w = 500
            var view_h = (500 / origin_w) * origin_h
            //如果图片尺寸比小于500/400，则规定高=400，且高要大于400，不然图片会被拉长
        } else if (origin_w / origin_h <= 500 / 400 && origin_h > 400) {
            // console.log(2)
            var view_w = (400 / origin_h) * origin_w
            var view_h = 400
            //如果图片宽<500,高<400,返回原图
        } else {
            //  console.log(3)
            var view_w = origin_w
            var view_h = origin_h
        }
        res.render('settings/cut.html', {
            cuturl: req.session.cuturl,
            view_w: view_w,
            view_h: view_h,
            origin_w: origin_w,
            origin_h: origin_h
        })
    })
}

//处理裁剪
exports.saveAvatar = (req, res) => {
    //var form = new formidable.IncomingForm()
    var avatarurl = path.resolve(
        __dirname,
        '../uploads/images/' + req.session.cuturl
    )
    console.log('55555555555'+avatarurl)
    //console.log(req.body)
    const { wh, y, x } = req.body
    gm(avatarurl)
        .crop(wh, wh, x, y)
        .write(avatarurl, err => {
            if (!err) {
                user.updateOne(
                    { email: req.session.email },
                    {
                        $set: {
                            avatar:
                                '../uploads/images/' + req.session.cuturl
                        }
                    },
                    function (err, result) {
                        //console.log(11)
                        if (result !== '') {
                            res.json({
                                result: 1
                            })
                        }
                    }
                )
            } else {
                console.log(err)
                res.json({
                    result: 0
                })
            }
        }) //裁剪图片后覆盖原上传图片

}

//module.exports = avatar
