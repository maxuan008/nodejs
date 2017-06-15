var fs = require('fs');
var EventProxy = require('eventproxy');
var path = require('path');
var formidable = require('formidable');
var UUID = require('uuid');
var mgenv = global.mgENV;
var templater = require('../../module/templater');

var exceltype = ['csv'];

function zhengquan(data) {
     this.data = data;
}


//为一个用户添加指定的证券
zhengquan.addzhengquan  = function(table, codevalue ,userid,callback  ){
    sqlstr = "CALL s_isUserZhengquanExist('" + table + "' , '" + codevalue + "'   ,   " + userid + ")";

    templater.SQL(sqlstr, function(err,docs){ if(err)  return callback(err); 
        //console.log(docs);
        var zhengquancount = docs[0][0].zhengquancount;

        if(zhengquancount > 0 ) return  callback('用户的此证券已存在'); 
        else if(zhengquancount <= 0)  //不存在则开始插入，此证券。
            templater.add(table,{code:codevalue  ,  userid: userid  , createtime:new Date()  },function(err,doc){
               return callback(err,doc);
            });
        
    });  //templater.SQL end 
}


//为一个用户添加指定的证券,如果存在则返回证券信息
zhengquan.addzhengquan_V2  = function(table, codevalue ,userid,type ,zhengquanName, callback  ){
    sqlstr = " select * from " + table  + " where status = 1 and code = '" + codevalue + "' and userid = " + userid ; 
    var result = {};
    templater.SQL(sqlstr, function(err,docs){ if(err)  return callback(err); 
        //console.log(docs);
        var zhengquancount = docs.length;

        if(zhengquancount > 0 ) { console.log(codevalue,'存在'); if(type ==1)  result.id = docs[0].qq_id;if(type ==2)  result.id = docs[0].gp_id;  return callback(err, result);   } 
        else if(zhengquancount <= 0)  //不存在则开始插入，此证券。
        console.log(codevalue,'不存在'); 
            templater.add(table,{code:codevalue  ,name:zhengquanName,  userid: userid  , createtime:new Date()  },function(err,doc){  if(err)  return callback(err); 
               result.id = doc.insertId;
               return callback(err,result);
            });
        
    });  //templater.SQL end 
}


module.exports = zhengquan;




