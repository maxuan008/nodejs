var Mysql = require("../mysql/mysql");
var templater = require("./templater");
var async = require("async");
var mgconfig = require("../../../config/mgconfig.json");
var EventProxy =   require('eventproxy');

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


//修改主键rfid的数据， 修改数据为data: json类型
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



//var rolefun = require('./rolefun');
//获取角色下的所有功能
 rolefun.getrolefuns = function (rid, callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_role_fun";
    var wherejson = {rid:rid};
    var selectstr = " `rolefunid` as `rfid` ,  `fid` , `status` ";
    //console.log(222222222);

    //对角色的模块初始化数据
    this.initRoleFuns(rid ,function(err,funsdatas){
        //console.log(333333333);
        if(err)  return  callback(err);
        else  
           templater.get(table, wherejson,selectstr ,function(err, docs){
                console.log(docs);
                if(err) console.log(err);
               
                return callback(err,docs);
           });

    }); //this.initRoleFuns end

 }

 rolefun.initRoleFuns = function (rid, callback) {
   
    //1.获取项目的模块功能数据
    var funTable =  mgconfig[global.mgENV].mysql.header + "_fun";
    var roleTable = mgconfig[global.mgENV].mysql.header + "_role";
    var sqlstr = "select `fid` , `pid` , `fun_name`  from  " + funTable + " where `isvalid`='1'  "  +
                 " AND `pid` IN (select `pid` from  " + roleTable + "  where  rid = " + rid + " ) ";

    var ep =new EventProxy(); 



     ep.all("initRoleFuns",function(data){
          funs = data.funs;
          rolefuns = data.rolefuns;
         var rolefunsIDstr = data.rolefunsIDstr;

         var table = mgconfig[global.mgENV].mysql.header + "_role_fun";

         //循环检查
         var i=-1;
         var tmpFuns = funs;
         async.eachSeries(funs,function(fun,callback){
             i++;
             var fid = fun.fid;
             var wherejson = {rid:rid , fid: fid};

             //判断funs中的元素是否存在于rolefuns
             //console.log("rolefuns:",rolefuns);
            
             var funjsontmp = { fid : fid };
              //console.log("funjsontmp:",funjsontmp);
              if(rolefunsIDstr.indexOf(fid) == -1 ) { //创建此角色的功能
                 var rolefundata = {pid: fun.pid, rid:rid , fid:fid  };
                 templater.add(table,rolefundata,function(err,addoc){  
                    if(err) console.log(err);

                    callback();
                 }); //templater.add

             } else { //如果存在则删除tmpFuns[i];

                callback();
             }      
            
         }, function(err){ 
             if(err)  console.log(err);

             return callback(err, resdatas);
         }); //async.eachSeries end

     });  //ep.all end






    ep.all("checkRoleFuns",function(funs){
         var myself = require('./rolefun');

         var roleFunTable = mgconfig[global.mgENV].mysql.header + "_role_fun";
         var sqlstr2 = "select  fid  from " + roleFunTable + " where `rid` = '" + rid + "' ";
        // console.log("SQL2：",sqlstr2);
         var data={funs:funs};
         templater.SQL( sqlstr2 ,function(err, rolefuns){
            data.rolefuns = rolefuns;
            //console.log(funs);
            if(err) console.log(err);
            
            myself.translateToStr(rolefuns,function(rolefunsIDstr){
                data.rolefunsIDstr =rolefunsIDstr;
                //console.log(data);
                ep.emit("initRoleFuns",data);
               //return callback(err,rolefuns);
            });

           //return callback(err,docs);
         });

    });  //ep.all end


    
    templater.SQL( sqlstr ,function(err, funs){
        //console.log(funs);
        if(err) console.log(err);
        resdatas = funs;

        ep.emit("checkRoleFuns",funs);
         //   return callback(err,funs);
     });



 };





//将fid转化为 字符串
rolefun.translateToStr = function (rolefuns, callback){
    var restr = '_';
    for(var i=0 ; i< rolefuns.length; i++ )  restr = restr + rolefuns[i].fid + "|";
    console.log(restr);
    return callback(restr) ;

}









module.exports = rolefun;




