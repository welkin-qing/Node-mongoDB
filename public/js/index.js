(function(){
    //计数器   只能实例9次
    var count=window.count=[];
    //图片上传类  一个类实例化一个li
    function UploadItem(){
        //声明一个id  交给服务器识别每个实例的 图片渲染方法
        this.id=Date.parse(new Date())+parseInt(Math.random()*9999);
        //通过参数callback提交id给后台
        this.$dom=$(['<li>',
        '<span class="glyphicon glyphicon-remove-circle" id="delete"></span>',
        '      <iframe src="/imageupload?callback=fn'+this.id+'" width="90" height="90" frameborder="no" id="iframe"></iframe>',
        '      <div class="mini_pic"></div>',
        '      <div class="loading"></div>',
        '</li>'].join(""));
    
        //this
        this.$preview=this.$dom.find(".mini_pic");
        this.$iframe=this.$dom.find("#iframe");
        this.$loading=this.$dom.find(".loading");
        this.$delete=this.$dom.find("#delete");
        this.idx=count.length;
        var self=this;
        
        //实例化li方法
        window["newli"]=function(){
            if(count.length<8){
                new UploadItem();
            }
        }
        //图片渲染方法  挂载在window对象中
        window["fn"+this.id]=function(url){
            count.push(url);
            console.log(count);
            var image=new Image();
            image.src='/uploads/images/'+url;
            image.onload=function(){
                //隐藏loading图
                self.$loading.hide();
                //显示预览图
                self.$preview.css({
                    "backgroundImage":"url(/uploads/images/"+url+")"
                });
                self.$preview.show();
            }
        }
        //控制loading图的方法
        window["loading"]=function(){
            // 隐藏iframe
            self.$iframe.hide();   
            //loading图出现
            self.$loading.show();
        }
        //渲染dom  上树
        $("#img-box-ul").append(this.$dom);
        
        //删除图片显示出现
        this.$preview.mouseenter(function(){
            self.$delete.show();
        })
        this.$preview.mouseleave(function(){
            self.$delete.hide();
        })
        this.$delete.mouseenter(function(){
            $(this).show();
        })
        this.$delete.mouseleave(function(){
            $(this).hide();
        })
        //删除上传的图片
        this.$delete.click(function(e){ 
            self.$dom.remove();
            count.splice(self.idx,1);
            var addpic=$("#iframe");
            console.log(addpic.length);
            if(count.length<9 && addpic.length==0){
                new UploadItem(); 
            }else if(count.length==8){
                new UploadItem(); 
            }
            e.stopPropagation();
        })
    }
    new UploadItem();
    //排序  最后一项参与不排序
    $("#img-box-ul").sortable({
        "items":"li:not(:last)"
    });
})();