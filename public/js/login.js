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
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
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
            }
        },
        onSuccess:function(e){
            $.ajax({
                "url":"/login",
                "type":"post",
                "data":{
                    "username":$("input[name=username]").val(),
                    "password":$("input[name=password]").val(),
                },
                "success":function(data){
                     if(data.result==1){
                         alert("登陆成功！");
                         location="/";
                     }else{
                         alert("用户名或密码错误!");
                         $("input[name=username]").focus();
                     }
                }
            })
        }
    });
});