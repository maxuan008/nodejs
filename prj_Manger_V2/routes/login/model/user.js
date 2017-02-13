var Mysql = require("../mysql/mysql");
var templater = require("./templater");
var async = require("async");
var mgconfig = require("../config/mgconfig.json");

function user(data) {
     this.data = data;
     this.data.mgenv = global.mgENV;
}



//获取用户的所有角色信息
user.getAllRoles =  function (uid,callback){

   var table =  mgconfig[global.mgENV].mysql.header + "_role_user";
   var wherejson = {uid: uid , isvalid : '1' };

   templater.get(table, wherejson, null , function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

}





//在user表中删除一条数据，删除条件为数组数据wherejson
 user.delete = function (wherejson,callback){
     console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_user";

    templater.delete(table, wherejson,function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

 }











module.exports = user;




