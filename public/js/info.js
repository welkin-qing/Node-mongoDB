$(document).ready(function() {
    $('#Myform').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '请输入正确的用户名',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名只能为数字，字母，下划线和点'
                    },
                    remote: {
                        url: '/info',
                        type:"checkout",
                        data: function(validator) {
                            return {
                                email: validator.getFieldElements('email').val()
                            };
                        },
                        message: '该用户名已被使用，请重新输入'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '电子邮件不能为空'
                    },
                    emailAddress: {
                        message: '请输入正确的邮箱地址'
                    },
                    remote: {
                        url: '/regist',
                        // Send { email: 'its value', username: 'its value' } to the back-end
                        type:"checkout",
                        data: function(validator) {
                            return {
                                email: validator.getFieldElements('email').val()
                            };
                        },
                        message: '该邮件已被注册！'
                    }
                        
                }
            },
            nackname: {
                validators: {
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '昵称必须是2-16个字符'
                    },
                    regexp: {
                        regexp: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                        message: '昵称存在特殊符号，请重新输入'
                    },
                }
            },
            age: {
                validators: {
                    regexp:{
                        regexp:/^\d*\.?\d+$/,
                        message:'请输入数字',
                    },
                    lessThan: {
                        value: 120,
                        inclusive: true,
                        message: '年龄不能大于120或小于16'
                    },
                    greaterThan: {
                        value: 16,
                        message: '年龄不能大于120或小于16'
                    },
                }
            },
            tele: {
                validators: {
                    regexp: {
                        regexp: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
                        message: '请输入正确的手机号码'
                    },
                }
            },
            avatar:{
                validators: {
                    file: {
                        maxSize: 5*1024*1024,
                        message: '仅支持大小5M以内的文件'
                    },
                    regexp: {
                        regexp: /\w(\.jpeg|\.png|\.jpg|\.bmp)/i,
                        message: '仅支持上传jpeg,png,jpg,bmp格式的图片'
                    },
                }
            }
        },
        onSuccess:function(e){
            //if(confirm("确认修改吗？")){
                    $.ajax({
                        "url":"/update",
                        "type":"POST",
                        "data":{
                            "username":$("input[name=username]").val(),
                            "nackname":$("input[name=nackname]").val(),
                            "email":$("input[name=email]").val(),
                            "introduction":$("input[name=introduction]").val(),
                            "birth":$("input[name=birth]").val(),
                            "gender":$("input[name=gender]:checked").val(),
                            "age":$("input[name=age]").val(),
                            "tele":$("input[name=tele]").val(),
                        },
                        "success":function(data){
                            if(data.result==1){
                                alert("修改成功！");
                                location="/info";            
                            }else{
                                alert("修改失败！请稍后重试！");
                                $("input[name=username]").focus();
                            }
                        }
                    })
           // }    
        }
    });
});