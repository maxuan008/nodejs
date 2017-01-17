var Mysql = require("../mysql/mysql");
var templater = require("./templater");
var async = require("async");
var mgconfig = require("../config/mgconfig.json");

function project(data) {
     this.data = data;
     this.data.mgenv = global.mgENV;
}



//在project表中删除一条数据，删除条件为数组数据wherejson

 project.delete = function (wherejson,callback){
     console.log('cog:',global.mgENV,mgconfig);
    
    var table =  mgconfig[global.mgENV].mysql.header + "_project";

    templater.delete(table, wherejson,function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

 }


//获取项目pid下的所有功能模块
 project.getfuns_ID = function (pid,callback){
     //console.log('cog:',global.mgENV,mgconfig);

    var table =  mgconfig[global.mgENV].mysql.header + "_fun";
    var wherejson = {pid:pid};
    var selectstr   = " `fid` , `fun_name` , `docname` , `url` ";  

    templater.get(table, wherejson,selectstr,function(err, docs){
         //console.log(docs);
         if(err) console.log(err);
         return callback(err,docs);
    });

 }




//查找一个项目下的所有角色

//获取不在此ruid角色中的用户列表数据
 project.getRoles_ID = function (pid,callback){

    var roleTable =  mgconfig[global.mgENV].mysql.header + "_role";   

    var sqlstr = "select * from " + roleTable + " where  `isvalid` ='1'  and  pid= " + pid ;
    
    console.log(sqlstr);
    templater.SQL(sqlstr,function(err, docs){
         //console.log(docs);
         if(err) console.log(err);
         return callback(err,docs);
    });
 }


//获取不在此ruid角色中的用户列表数据
 project.getUnRoles_ID = function (pid,callback){
     //console.log('cog:',global.mgENV,mgconfig);
    
    var projectTable =  mgconfig[global.mgENV].mysql.header + "_project";
    var roleTable =  mgconfig[global.mgENV].mysql.header + "_role";   

    var sqlstr = "select `rid` , `role_name` from " + roleTable + " where  `isvalid` ='1'  and  " + 
                 "  pid IN ( select pid from " + projectTable + " where `isvalid` ='1'  and pid= " + pid + "  )";
    
    console.log(sqlstr);

    templater.SQL(sqlstr,function(err, docs){
         //console.log(docs);
         if(err) console.log(err);
         return callback(err,docs);
    });

 }


//获取一个项目下的所有角色，及角色所拥有的功能和用户数据
project.getRole_FunUsers = function (pid,callback) {
     var rolefun = require("./rolefun");
     var roleuser = require("./roleuser"); 
     var result = [];

     this.getRoles_ID(pid,function(err,roledocs){
         if(err) console.log(err);
         //console.log(1111111111);
         async.eachSeries(roledocs, function(role,callback){
             var role = {rid: role.rid , role_name: role.role_name };

                    rolefun.getrolefuns(role.rid, function(err,fundocs){
                        if(err)  console.log(err);
                        var funs = fundocs;

                        roleuser.getroleusers(role.rid, function(err,userdocs){
                            if(err) console.log(err);
                            var users = userdocs;
                            result[result.length] = {role: role, funs :funs , users: users };
                            
                            callback();
                        }); //roleuser.getroleusers end

                    });  //rolefun.getrolefuns end


         },function(err) {
             if(err)  console.log(err);

             return callback(err , result );

         }); //async.eachSeries end

     }); // this.getRoles_ID end


}


 

module.exports = project;




