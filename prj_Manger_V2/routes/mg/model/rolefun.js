var Mysql = require("../mysql/mysql");
var templater = require("./templater");
var async = require("async");
var mgconfig = require("../config/mgconfig.json");

function rolefun(data) {
     this.data = data;
     this.data.mgenv = global.mgENV;
}



//在fun表中删除一条数据，删除条件为数组数据wherejson

 rolefun.delete = function (wherejson,callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_role_fun";

    templater.delete(table, wherejson,function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

 }



 rolefun.update_ID = function (rfid, data,callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_role_fun";
    var wherejson = {rolefunid:rfid};

    templater.update(table, wherejson,data ,function(err, docs){
         console.log(docs);
         if(err) console.log(err);
         return callback(err,docs);
    });

 }





module.exports = rolefun;




