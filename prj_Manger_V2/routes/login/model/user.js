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

//获取用户所有的项目和相应的角色
user.getAllPrjAndRoles =  function (uid,callback){

   var table_project = mgconfig[global.mgENV].mysql.header + "_project";
   var table_role_user =  mgconfig[global.mgENV].mysql.header + "_role_user";
   var table_role = mgconfig[global.mgENV].mysql.header + "_role";


   var sqlstr = "select b.roleuserid as ruid , a.prj_name , a.domain_url , a.port ,c.role_name " + 
                "  from `" + table_project +"` as a , `" +table_role_user+ "`  as b ,   `" +table_role+"` as c  " + 
                " where a.pid=b.pid and b.rid = c.rid  and c.pid = a.pid and a.isvalid = '1' and b.isvalid = '1' and  c.isvalid = '1'  " + 
                " and b.uid = '" + uid +"' ";
   console.log(sqlstr);
   templater.SQL(sqlstr , function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

}



//获取用户所在的项目信息
user.getUserAllPrj =  function (uid,callback){

   var table_project = mgconfig[global.mgENV].mysql.header + "_project";
   var table_role_user =  mgconfig[global.mgENV].mysql.header + "_role_user";
   var table_role = mgconfig[global.mgENV].mysql.header + "_role";

   var sqlstr = "select pid , `prj_name` , port , domain_url  from `" + table_project +"`  where  `isvalid` ='1'   " + 
                " and pid IN (select c.pid from  `" +table_role_user+ "`  as b ,   `" +table_role+"` as c where b.rid = c.rid  and b.isvalid = '1' and  c.isvalid = '1'  and  b.uid = '" + uid +"'   )";


   console.log(sqlstr);
   templater.SQL(sqlstr , function(err, docs){
         if(err) console.log(err);
         return callback(err,docs);
    });

}



//获取一个项目下的功能和角色信息
user.getPrjRolesAndFuns =  function (doc,callback){
   var pid = doc.pid;
   var sqlstr = "CALL stored_getPrjRoleAndFuns(" + pid + ")  ";
               
   var result =doc , rolefuns = [];
   //console.log(sqlstr);
   templater.SQL(sqlstr , function(err, docs){
         if(err) console.log(err);
         //result.pid = pid;
         result.funs = docs[0];
         result.roles = docs[1];

         var roles = docs[1];

         async.eachSeries(roles, function(role, callback) { 
            var rid = role.rid;
            var j=rolefuns.length;
            rolefuns[j] = {rid:rid };

            var sqlstr ="CALL stroed_getRoleFuns(" + rid + ")  "; 
            templater.SQL(sqlstr , function(err, roleFuns){
                if(err) console.log(err);
                rolefuns[j].funs = roleFuns[0];
                //console.log('TTTTTTTT:',roleFuns[0]);
                callback();
            });

            
        }, function(err){
            if(err) console.log(err);

            result.rolefuns = rolefuns
            return callback(err,result);

        }); //async.eachSeries end 

         
    }); //templater.SQL end

}


//设置选择的项目和用户的角色， funs的url信息
user.setSelectRoleAndFunUrls = function setSelectRoleAndFunUrls(pid,uid,callback){
    var sqlstr = "call stored_get_userRoleAndFunUrls(" + pid + ", " + uid +"); ";
    var result = {} , havfunUrls = [] ,ishavedomain = [] ;
    templater.SQL(sqlstr , function(err, docs){
         if(err) return  callback(err);
         
         var doc = docs[1];
         var rid = docs[0].rid;
         
         for(var i=0;i<doc.length;i++) {
             havfunUrls[i]= doc[i].url;
             ishavedomain[i]= doc[i].ishavedomain;
         }

         result = {rid :rid, havfunUrls:havfunUrls , ishavedomain: ishavedomain  };

         return callback(err,result);
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




