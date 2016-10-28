var assert=require('assert');
var async = require('async');
var moment = require('moment')
var config = require('../config');
var EventProxy = require('eventproxy');
var MySql = require('../MySql');

function refer_qiquan(resu) {
		this.resu = resu;
	};	
	
module.exports = refer_qiquan;



refer_qiquan.toSQL =  function toSQL(sqlstr, callback){
	MySql.query(sqlstr, function(err, doc) {
		//console.log(doc);
        return callback(err,doc);
   });

}




//插入数据
refer_qiquan.insertData =  function insertData(data, callback){
	console.log(data);
   MySql.query('INSERT INTO `refer_qiquan`  SET ?', data  , function(err, doc) {
		// console.log(err);  console.log(doc);
		return callback(err,doc);
   });
}



//按Json格式更新数据
refer_qiquan.updateData_Json = function updateData_Json(data,ID , callback ) {
 //console.log(data);
 var sql1 = "UPDATE `refer_qiquan`  SET  ";
 var sql2 = " where `rq_id` = '" + ID + "'";
 var sqlstr = '';
 var i=0;
 async.forEachOf(data, function (value, key, callback) {
	 i++;

	 if(i==1)  sql1 = sql1 + " `" + key + "` = '" + value + "' "  ;
	 else  sql1 = sql1 + " , "  + " `" + key + "` = '" + value + "' ";

    callback();
}	, function (err) {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
	if(i == 0) {	return callback("refer_qiquan.updateData_Json中Json数据为空");}
    else  //如果JSON中有数据
	{
	  sqlstr = sql1 + sql2;
	  console.log(sqlstr);
	  MySql.query(sqlstr, function(err, doc) {
			return    callback(err, doc);	    
	   });	
	}  //if end
}); //async.forEachOf end 


}



//按Json格式，查询符合条件的数据
refer_qiquan.searchData_Json = function searchData_Json(data, callback ) {
 //console.log(data);
 var sqlstr = "select * from  `refer_qiquan` where 1   ";

 var i=0;
 async.forEachOf(data, function (value, key, callback) {
	 i++;
     if(value != '' ) sqlstr = sqlstr + " and  `" + key + "` like '%" + value + "%' ";

    callback();
 }	, function (err) {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
	if(i == 0) {console.log('AAAAA');	return callback("refer_qiquan.searchData_Json中Json数据为空");}
    else  //如果JSON中有数据
	{
	  console.log(sqlstr);
	  MySql.query(sqlstr, function(err, doc) {
			return    callback(err, doc);	    
	   });	
	}  //if end
 }); //async.forEachOf end 

}




refer_qiquan.delRole =  function delRole(ID ,  callback ) {
	var sqlstr="DELETE FROM `refer_qiquan`   WHERE `rq_id` = '" + ID + "'"; 
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		return    callback(err, doc); 
    });	

}





 function delRole_V3(ID){
	var sqlstr="DELETE FROM `refer_qiquan`   WHERE `rq_id` = '" + ID + "'"; 
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		if(err)  console.log(err); 
    });	
}







//code是否存在
refer_qiquan.isExist_ForCode =  function isExist_ForCode(code , callback){
   var sqlstr = "SELECT * FROM `refer_qiquan` WHERE  `code`= '" + code + "'  and `status` = '1'";
   console.log(sqlstr);
   MySql.query(sqlstr,  function(err,docs) {
	   //console.log(err, docs.length);
      if( err || docs.length <= 0  ) return callback(false);
	  else if(docs.length > 0 )   return callback(true);
    });
}


//ID是否存在
refer_qiquan.isExist_ForID =  function isExist_ForID(ID , callback){
   var sqlstr = "SELECT * FROM `refer_qiquan` WHERE  `rq_id`= '" + ID + "'  ";
   console.log(sqlstr);
   MySql.query(sqlstr,  function(err,docs) {
      if(docs.length <= 0  ) return callback(false);
	  else if(docs.length > 0 )   return callback(true);
    });
}



//查询数据
refer_qiquan.searchData =  function searchData(sql, callback){
    sqlstr=sql;
	MySql.query(sqlstr, function(err, doc) {
		//console.log(doc);
        return callback(err,doc);
   });

}

//更新数据
refer_qiquan.updateData =  function updateData(sql, callback){
    sqlstr=sql;
    MySql.query(sqlstr, function(err, doc) {
		return   callback(err, doc);	    
	 });	
}
