
//测试数据库
var mysql      = require('mysql');
var mysql = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wenqing123',
  database:'test',
  port:3306
});

mysql.connect();
console.log("mysql has connnected");
 
// var  sql = 'INSERT INTO user;';
//查
// mysql.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });
 

// mysql.end();
// console.log("mysql has colsed");



