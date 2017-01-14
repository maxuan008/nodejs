var Mysql = require("../mysql/mysql");
var templater = require("./templater");
var async = require("async");
var mgconfig = require("../config/mgconfig.json");

function roleuser(data) {
     this.data = data;
     this.data.mgenv = global.mgENV;
}

//获取主键为ruid的角色信息
 roleuser.getInfo = function (ruid,callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var roleuserTable =  mgconfig[global.mgENV].mysql.header + "_role_user";

    var sqlstr = " select * from " + roleuserTable + " where  rid = '"+ruid+"' ";

    templater.SQL(sqlstr,function(err, docs){
         console.log(docs);
         if(err) console.log(err);
         return callback(err,docs[0]);
    });

 }



//添加数组里的用户
 roleuser.add_Arry = function (datas, callback) {
    
     var roleuserTable =  mgconfig[global.mgENV].mysql.header + "_role_user";
        console.log('DDDDDD' , roleuserTable );
     templater.add_Arry(roleuserTable,datas , function(err){
        return callback(err);
     });


 }


//在fun表中删除一条数据，删除条件为数组数据wherejson

 roleuser.delete = function (wherejson,callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_role_user";

    templater.delete(table, wherejson,function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

 }


//修改主键为ruid的用户数据
 roleuser.update_ID = function (ruid, callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_role_user";
    var wherejson = {roleuserid:ruid};

    templater.update(table, wherejson,data ,function(err, docs){
         console.log(docs);
         if(err) console.log(err);
         return callback(err,docs);
    });

 }



//获取不在此ruid角色中的用户列表数据
 roleuser.getUnRoleUsers = function (ruid,callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var roleuserTable =  mgconfig[global.mgENV].mysql.header + "_role_user";
    var userTable = mgconfig[global.mgENV].mysql.header + "_user";

    var sqlstr = "select `uid` as userid , `username` , `fullname` from " + userTable + " where  `isvalid` ='1'  " +
                   " and `uid` NOT IN ( select `uid` from " + roleuserTable + " where `isvalid` ='1'  and  rid = '"+ruid+"')  ";

    templater.SQL(sqlstr,function(err, docs){
         console.log(docs);
         if(err) console.log(err);
         return callback(err,docs);
    });

 }







module.exports = roleuser;




