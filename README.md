# node.js + mongodb 搭建博客

#### 使用art-template模板引擎

- app为项目入口文件，router为路由文件

- user.js为user用户表

#### 登录注册
- 注册时验证邮箱或昵称是否存在，若存在则提示邮箱或昵称已经注册过
- 登录时，在数据表中查找密码，若正确则登录成功，若失败则提示
- 登录成功则跳转到个人主页页面

#### 更换密码

1. 先判断两次的新密码是否相同，若不相同则提示用户
2. 因为登录成功才会进入到基本信息设置页面，所以根据邮箱进行查找原始密码，对原始密码进行匹配
3. 更换密码成功则跳转到登录页进行重新登录

#### 图片获取
1. 先在个人设置里使用使用iframe标签内联一个页面，avatarForm页面，用来添加图片
2. 再进行路由切换到cut页面使用gm进行裁剪图片，裁剪的时候使用模板引擎进行对图片大小的获取
3. 将裁剪好的图片上传到自己的头像位置

#### 个人信息修改
1. 根据注册的账号进行对信息的修改
2. 信息修改完成后回到个人主页
3. 需要重新登录进行查看

#### 文章编写
1. 设计文章表article结构
2. 点击发起进入new页面，然后将数据保存到article表中
3. 完成到show页面的跳转
4. 使用showdown插件完成对文章的渲染（类似于github readme格式）
    - 处理好标题和板块的结构
    - 处理好发布文章的时间


##### 上传代码
1. git add .
2. git commit -m "提交信息"
3. git push

