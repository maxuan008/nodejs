var Mysql = require("../mysql/mysql");
var templater = require("./templater");
var async = require("async");
var mgconfig = require("../../../config/mgconfig.json");

function fun(data) {
     this.data = data;
     this.data.mgenv = global.mgENV;
}



//在fun表中删除一条数据，删除条件为数组数据wherejson
 fun.delete = function (wherejson,callback){
     console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_fun";

    templater.delete(table, wherejson,function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

 }









module.exports = fun;




