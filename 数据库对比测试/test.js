//链接mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.0.100',
    user     : 'nodejs',
    password : '123456',
    database : 'test'
});
connection.connect();


//链接redis
var redis = require("redis"),client = redis.createClient({host:'192.168.0.100' , port:6379});






/************测试redis性能*****************/
/************max作为链接参数****************/
/**************************************/
/************结果************************/
/************异步方式:读取**********************/
/************一万次：0.024，0.029，0.026， 0.067 秒*******/
/************二万次：0.051，0.004，0.054， 0.005 秒*******/
/************五万次：0.113，0.101，0.138， 0.106 秒*******/
/************十万次：0.248，0.461，0.219，0.23 ，0.194 ， 0.177 ， 0.204 ，0.207 秒*******/
/************百万次：1.702，2.154，2.39，1.644 ， 1.569 秒*******/

/************异步方式:写**********************/
/************一万次：*******/
/************二万次：0.021 ,0.164   秒*******/
/************五万次： 秒*******/
/************十万次：0.164 秒*******/
/************百万次： 秒*******/



console.log((1489215260678 - 1489215260514)/1000 );

var max = 1;
var frist, end;

for(var i=1;i<=max;i++) {
  //redisGo(i,max);
  //redisInsert(i,max);
}


function redisGo(i,max) {

    var key = "b50001";

    client.get( key, function(err, reply) {
        if (err) throw err; 
        //console.log(i,reply);
        if(i==1) {  frist = new Date().getTime();  console.log("第一次",reply,frist); }
        else if(i==max) {
            end = new Date().getTime() ; 
            console.log("第" + max + "次:",reply ,end);
            console.log("用时：",(end-frist)/1000); 
        } 
    });

}


function redisInsert(i,max) {
    var key = 'b' + i;

    client.set(key, new Date().getTime() + ":aaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccddddddddddddddddddddeeeeeeeeeeeeeeeeeee"  );           

}






/************异步方式**********************/
/************测试mysql性能*****************/
/************max作为链接参数****************/
/************结果************************/
/************异步方式**********************/
/************一万次：3.843，3.872，3.841， 3.868 ， 1.367 ， 1.404 ， 1.396 ， 1.411秒*******/
/************二万次：7.483，7.452，7.53， 7.585， 2.603，2.658，2.675， 2.697秒*******/
/************五万次：18.658，18.441，16.173，18.741 , 6.552   存储过程： 8.521 ，8.629 ， 8.528 ，8.533 秒*******/
/************十万次：35.956，37.212 ，37.89，37.369 ，37.977  存储过程： 17.204 ，17.037 ， 17.086 秒*******/
/************百万次：出现BUG，内存问题*******/


var max = 1;
var frist, end;

for(var i=1;i<=max;i++) {
  //mysqlGo(i,max);
}


function mysqlGo(i,max) {
    //var sqlstr = "select id from `conn` where 1 ";
    var sqlstr = "CALL test()"

    connection.query( sqlstr, function (error, results) {
    if (error) throw error;
    //console.log('MYSQL:', results[0].id);   .getTime()
        //if(i==1) {  frist = Date.parse(new Date());  console.log("第一次",frist); }
        //else if(i==max) {end = Date.parse(new Date()); ; console.log("第" + max + "次:" +end);  }

        if(i==1) {  frist = new Date().getTime();  console.log("第一次",frist); }
        else if(i==max) {
            end = new Date().getTime() ; 
            console.log("第" + max + "次:" +end);
            console.log("用时：",(end-frist)/1000);  }
    });
}
//connection.end();





