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
                    stringLength: {
                        min: 4,
                        max: 12,
                        message: '用户名必须是4-12个字符'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名只能为数字，字母，下划线和点'
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
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    identical: {
                        field: 'confirmPassword',
                        message: '密码与确认密码不一致'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码必须是6-16个字符'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码只能为数字，字母，下划线和点'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    identical: {
                        field: 'password',
                        message: '密码与确认密码不一致'
                    }
                }
            },
        },
        onSuccess:function(e){    
            $.ajax({
                "url":"/regist",
                "type":"post",
                "data":{
                    "username":$("input[name=username]").val(),
                    "password":$("input[name=password]").val(),
                    "email":$("input[name=email]").val(),
                },
                "success":function(data){
                    if(data.result==1){
                        alert("注册成功！");
                        location="/login";            
                    }else{
                        alert("注册失败！请重新注册！");
                        $("input[name=username]").focus();
                    }
                }
            })
        }
    });
});