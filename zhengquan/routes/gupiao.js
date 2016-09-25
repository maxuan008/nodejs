var assert=require('assert');
var async = require('async');
var moment = require('moment')
var config = require('./config');
var EventProxy =   require('eventproxy');
var MySql = require('./MySql');


function Zhengquan(resu) {
	   this.gp_id = resu.gp_id  ;
	   this.name = resu.name  ;
	   this.code  = resu.code   ;
	   this.status   = resu.status  ;
	   this.price   = resu.price  ;
	   this.flag   = resu.flag  ;	
	   this.price   = resu.price  ;	
			
		};	
		
	module.exports = Zhengquan;

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };
 //sleep(10000);  等待10秒。
 
 
 Zhengquan.CancelGupiao =function CancelGupiao (gp_id,callback) {
	var sqlstr='UPDATE `gupiao`  SET status = 0 WHERE gp_id = ' + gp_id;
	MySql.query(sqlstr, function(err, doc) {
		return    callback(err, doc);	    
   });		   
}
 
 
 Zhengquan.CancelQiquan  = function CancelQiquan (id,callback) {
	 var sqlstr='UPDATE `qiquan`  SET status = 0 WHERE qq_id = ' + id;
	 console.log(sqlstr);
		MySql.query(sqlstr, function(err, doc) {
			return    callback(err, doc);	    
	   });		
 }

 
 

 Zhengquan.updateKey =function updateKey(sqlstr,callback){
	MySql.query(sqlstr, function(err, doc) {
		return    callback(err, doc);	    
   });

}


 
function IsGupiaoExist(gupiaoname  , gupiaocode ,userid, callback) {
	var sqlstr="select * FROM `gupiao`  where  status = 1 and userid="+ userid +" and (name='"+gupiaoname+"' OR code='"+gupiaocode+"')   ";
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		console.log(doc);
		if(err) return callback(err);
		else
			if(doc.length!=0)  return callback('股票已存在，请重新输入!')
			else return callback(err,0)
   });
}





Zhengquan.AddGupiao=function AddGupiao(gupiaoname  , gupiaocode , gupiaoprice ,userid,callback) {
	 IsGupiaoExist(gupiaoname  , gupiaocode ,userid, function(err ,flag){
		 if(err) return callback(err);
		 else
			 if(flag==0) {
				 MySql.query('INSERT INTO gupiao SET ?', {'userid':userid,name:gupiaoname , code: gupiaocode , price: gupiaoprice }, function(err, doc) {
                      console.log(doc);
					 return callback(err,doc);
				 });
			 }  
	 });
}

function IsQiquanExist(name  , flag , userid , callback) {
	var sqlstr="select * FROM `qiquan`  where  status = 1  and userid="+ userid +"   and     name='"+ name+"' and flag="+flag+"  ";
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		//console.log(doc);
		if(err) return callback(err);
		else
			if(doc.length!=0)  return callback('期权已存在，请重新输入!')
			else return callback(err,0)
   });
}


Zhengquan.AddQiquan=function AddQiquan(name  , code , price , flag, userid,callback) {
	//console.log('name:' +name + ',flag:' +flag );
	IsQiquanExist(name  , flag , userid,function(err ,isflag){
		 //console.log("isflag:" + isflag);
		 if(err) return callback(err);
		 else
			 if(isflag==0) {
				 MySql.query('INSERT INTO qiquan SET ?', {'userid':userid,'name':name , 'code': code , 'price': price , 'flag': flag }, function(err, doc) {
					 // console.log(err);  console.log(doc);
					 return callback(err,doc);
				 });
			 } 
	 });
}



Zhengquan.gupiaobuy=function gupiaobuy(userid,sql, callback) {
		//console.log(sql); //console.log(userid) 
		//var sqlstr = "INSERT INTO gupiao 
 var jsonData = { }
   
   jsonData.dealdate = sql['Date'];
   jsonData.gp_id = parseInt(sql['id']) ;   	
   jsonData.price = parseFloat(sql['price']) ;  
   jsonData.userid = parseInt(userid )  ;  
   jsonData.flag =  parseInt(sql['flag'] );  
   jsonData.count = sql['Count'] ;  
   jsonData.status = 1 ;  
   jsonData.deal_money = parseFloat(sql['deal_money']) ;   ;  
   jsonData.remark =  sql['remark'] ;  ;  
	  		
 MySql.query('INSERT INTO gupiao_deal  SET ?', jsonData  , function(err, doc) {
					 // console.log(err);  console.log(doc);
        //console.log(err);
		//return callback(null);
		return callback(err,doc);
 });
	
}


Zhengquan.mingxi = function mingxi(userid , sql, callback) {
	
	
	var sqlstr='' , reu='' , tmp1='' , edu=0;
	if(parseInt(sql['flag'])==1 ) 
		sqlstr="select b.dealdate , b.flag , b.price , b.count  from gupiao a  ,  gupiao_deal  b  where a.gp_id=b.gp_id and a.userid="+ parseInt(userid) + " and a.gp_id =" + parseInt(sql['id']) +" and a.status=1 and b.status=1  "; 
	else if(parseInt(sql['flag'])==2)
		sqlstr="select b.dealdate , b.flag , b.price , b.count  from qiquan a  ,  qiquan_deal  b  where a.qq_id=b.qq_id and a.userid="+ parseInt(userid) + "  and  a.qq_id =" + parseInt(sql['id']) +"  and  a.status=1 and b.status=1  "; 
	//console.log(sqlstr);
	
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   
		    //console.log(results);
		    if(results.length==0) return callback(err,'Null');
		    
		    async.eachSeries(results,function(value,callback){
		    	//var dealdate= new Date();
		    	if (value.dealdate == null) 
		    		var datetmp='null';
		    	else
		    	   var datetmp= moment(value.dealdate).format('YYYY-MM-DD');
		    	
		    	if(value.flag==1)  tmp1='买入';
		    	else if(value.flag==2)  tmp1='卖出';
		    	
		    	edu= value.price  *  value.count ;
  	
		    	reu=reu + "<tr class='info'  > ";
		    	reu=reu + "<td style='width:110px;' > " + datetmp + " </td> ";
		    	reu=reu + "<td style='width:100px;' > " + tmp1 + " </td> ";
		    	reu=reu + "<td style='width:100px;' > " + value.price + " </td> ";
		    	reu=reu + "<td style='width:100px;'> " +  value.count  + " </td> ";
		    	reu=reu + "<td style='width:150px;'>  " + edu  + " </td> ";
		    	reu=reu + "</tr>";
		    	
		    	callback();
		    	
		    }, function(err){
		    	//MySql.end();
		    	//console.log(reu);
		    	return callback(err,reu);
		    
		   
		    });  // async  end
		    
		 	
 });  // MySql  query  end
	
}




Zhengquan.qiquanbuy=function qiquanbuy(userid,sql, callback) {
	//console.log(sql); //console.log(userid) 
	//var sqlstr = "INSERT INTO qiquan_deal  SET  'gp_id': parseInt(sql['id']) "
	
MySql.query('INSERT INTO qiquan_deal  SET ?',  {'dealdate': sql['Date'] , 'qq_id': parseInt(sql['id']) ,'price': parseFloat(sql['price']) ,  'userid': parseInt(userid )   ,  'flag': parseInt(sql['flag'] ) ,  'count':  sql['Count'], 'status': 1  } , function(err, doc) {
				 // console.log(err);  console.log(doc);
    //console.log(err);
	//return callback(null);
	return callback(err,doc);
});

}






//cancel x: 0:_id  , 1:userid,modid,projid
Zhengquan.GetGupiaoList= function GetGupiaoList(userid,callback) {
	var reu='', nulltmp=null,n=0 , idtmp='null', codetmp='null';
    var sqlstr="SELECT * FROM `gupiao`  where status = 1 and userid=" + userid + " ORDER BY code DESC";
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   
		    //console.log(results);
		    if(results.length==0) return callback(err,nulltmp,"null|null");
		    
		    async.eachSeries(results,function(value,callback){
				
		    	var tr_gupiaotmp= 'tr_gupiao' + value.gp_id ,  hid_gupiaotmp= 'hid_gupiao' + value.gp_id  ;
		    	var td_div_nametmp='td_div_name'+value.gp_id  ,   td_div_codetmp='td_div_code' + value.gp_id, td_div_pricetmp='td_div_price' + value.gp_id;
		    	var td_input_nametmp='td_input_name'+value.gp_id,   td_input_codetmp='td_input_code' + value.gp_id, td_input_pricetmp='td_input_price' + value.gp_id;
		    	reu=reu + "<tr id=\'" + tr_gupiaotmp+ "\' class=\'success\'    > ";
		    	//reu=reu + "<input type=\'hidden\' id=\'"+hid_gupiaotmp+"\'  value=\'"+value.gp_id+"\'   >";
		    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_nametmp+"','"+ td_div_nametmp+"')\" ><div id='" + td_div_nametmp +"' >" + value.name +"</div> <input id='"+td_input_nametmp +"'  type='text'  value='"+value.name+"' style='display: none; width:100px;'  onblur=\"updateKey('gupiao' , 'name', "+value.gp_id+", '"+td_input_nametmp+"','"+ td_div_nametmp+"')\"  />    </td>";
		    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_codetmp+"','"+ td_div_codetmp+"')\" ><div id='" + td_div_codetmp +"' >" + value.code +"</div>  <input  id='"+td_input_codetmp +"'  type='text'  value='"+value.code+"'  style='display: none; width:100px;'  onblur=\"updateKey('gupiao' , 'code', "+value.gp_id+", '"+td_input_codetmp+"','"+ td_div_codetmp+"')\"   />  </td>";
		    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\" ><div id='" + td_div_pricetmp +"' >" + value.price +"</div>  <input  id='"+td_input_pricetmp +"'  type='text'  value='"+value.price+"'  style='display: none; width:100px;'  onblur= \"updateKey('gupiao' , 'price', "+value.gp_id+", '"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\"  /></td>";
		    	reu=reu + "<td><a onclick='AjaxCancelGupiao("+value.gp_id + ")'>注销</a></td>";
		    	reu=reu + " </tr>";
				
				idtmp = idtmp + "," + value.gp_id;
				codetmp = codetmp + "," + value.code;
		    	
		    	callback();
		    	
		    }, function(err){
		    	//MySql.end();
				var allcode=idtmp + "|" + codetmp ;
		    	return callback(err,reu , allcode);
		    
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}

Zhengquan.GetQiquanList = function GetQiquanList(userid,callback){
	var reu='', nulltmp=null,n=0 ;
    var sqlstr="SELECT * FROM `qiquan`  where status = 1 and userid=" + userid;
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   
		    //console.log(results);
		    if(results.length==0) return callback(err,nulltmp);
		    
		    async.eachSeries(results,function(value,callback){
		    	var tr_tmp= 'tr_qiquan' + value.qq_id ,  hid_tmp= 'hid_qiquan' + value.qq_id  ;
		    	var td_div_nametmp='td_div_name'+value.qq_id  ,   td_div_codetmp='td_div_code' + value.qq_id, td_div_pricetmp='td_div_price' + value.qq_id;
		    	var td_input_nametmp='td_input_name'+value.qq_id,   td_input_codetmp='td_input_code' + value.qq_id, td_input_pricetmp='td_input_price' + value.qq_id;
		    	var td_div_flagtmp='td_div_flag'+value.qq_id  ,   td_input_flagtmp='td_input_flag'+value.qq_id;
		    	
		    	
		    	
		    	if(value.flag==1) {
		    		reu=reu + "<tr id=\'" + tr_tmp+ "\' class=\'success\'    > ";
			    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_nametmp+"','"+ td_div_nametmp+"')\" ><div id='" + td_div_nametmp +"' >" + value.name +"</div> <input id='"+td_input_nametmp +"'  type='text'  value='"+value.name+"' style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'name' ,  'qq_id' , "+value.qq_id+" , '"+td_input_nametmp+"','"+ td_div_nametmp+"', 1)\"  />    </td>";
			    	
			    	reu=reu + "<td  ondblclick=\"showInput_V2('"+td_input_flagtmp+"','"+ td_div_flagtmp+"')\" ><div id='" + td_div_flagtmp +"' >认购</div> " ;	
			    	reu=reu +	"<select id='"+td_input_flagtmp +"' style='display: none;'  onblur=\"updateSQL(  'qiquan' , 'flag' ,  'qq_id'  , "+value.qq_id+"   , '"+td_input_flagtmp+"','"+ td_div_flagtmp+"', 2)\"    >  <option  value='1'>认购&nbsp;&nbsp;&nbsp;&nbsp;</option>  <option  value='2'>认沽 &nbsp;&nbsp;&nbsp;&nbsp;</option>   </select>  </td>";
			    	
			    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_codetmp+"','"+ td_div_codetmp+"')\" ><div id='" + td_div_codetmp +"' >" + value.code +"</div>  <input  id='"+td_input_codetmp +"'  type='text'  value='"+value.code+"'  style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'code'  ,  'qq_id' , "+value.qq_id+"  , '"+td_input_codetmp+"','"+ td_div_codetmp+"', 1)\"   />  </td>";
			    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\" ><div id='" + td_div_pricetmp +"' >" + value.price +"</div>  <input  id='"+td_input_pricetmp +"'  type='text'  value='"+value.price+"'  style='display: none; width:100px;'  onblur= \"updateSQL(  'qiquan' , 'price'  ,  'qq_id' , "+value.qq_id+"   , '"+td_input_pricetmp+"','"+ td_div_pricetmp+"',1)\"  /></td>";
			    	reu=reu + "<td><a onclick='AjaxCancelQiquan("+value.qq_id + ")'>注销</a></td>";
			    	reu=reu + " </tr>";
			    	callback();
		    	}
		    	
		    	if(value.flag==2) {
		    		reu=reu + "<tr id=\'" + tr_tmp+ "\' class=\'success\'    > ";
			    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_nametmp+"','"+ td_div_nametmp+"')\" ><div id='" + td_div_nametmp +"' >" + value.name +"</div> <input id='"+td_input_nametmp +"'  type='text'  value='"+value.name+"' style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'name' ,  'qq_id' , "+value.qq_id+" , '"+td_input_nametmp+"','"+ td_div_nametmp+"', 1)\"  />    </td>";
  
			    	reu=reu + "<td  ondblclick=\"showInput_V2('"+td_input_flagtmp+"','"+ td_div_flagtmp+"')\" ><div id='" + td_div_flagtmp +"' >认沽</div> " ;	
			    	reu=reu +	"<select id='"+td_input_flagtmp +"' style='display: none;'  onblur=\"updateSQL(  'qiquan' , 'flag' ,  'qq_id'  , "+value.qq_id+"   , '"+td_input_flagtmp+"','"+ td_div_flagtmp+"', 2)\"    >  <option  value='1'>认购&nbsp;&nbsp;&nbsp;&nbsp;</option>  <option  value='2'>认沽 &nbsp;&nbsp;&nbsp;&nbsp;</option>   </select>  </td>";
			    	
			    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_codetmp+"','"+ td_div_codetmp+"')\" ><div id='" + td_div_codetmp +"' >" + value.code +"</div>  <input  id='"+td_input_codetmp +"'  type='text'  value='"+value.code+"'  style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'code'  ,  'qq_id' , "+value.qq_id+"  , '"+td_input_codetmp+"','"+ td_div_codetmp+"', 1)\"   />  </td>";
			    	reu=reu + "<td  ondblclick=\"showInput('"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\" ><div id='" + td_div_pricetmp +"' >" + value.price +"</div>  <input  id='"+td_input_pricetmp +"'  type='text'  value='"+value.price+"'  style='display: none; width:100px;'  onblur= \"updateSQL(  'qiquan' , 'price'  ,  'qq_id' , "+value.qq_id+"   , '"+td_input_pricetmp+"','"+ td_div_pricetmp+"',1)\"  /></td>";
			    	reu=reu + "<td><a onclick='AjaxCancelQiquan("+value.qq_id + ")'>注销</a></td>";
			    	reu=reu + " </tr>";
			    	callback();
		    	}
		    	
		    	
		    		
		    	
		    }, function(err){
		    	//MySql.end();
		    	return callback(err,reu);
		    
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}





function GetCountAndying(gp_id,userid, callback) {
	var  nulltmp=null,n=0 , count=0, ying=0;
	var sqlstr= "SELECT * FROM `gupiao_deal`  where status = 1 and gp_id = " + gp_id + " and userid= " + userid;
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, results) {
		//console.log(results);
	  	if(results ==null)  return callback(err,0,0,n);
		   else
			   async.eachSeries(results,function(value,callback){
				   n++;
				   if(value.flag==1) {count=count + value.count;  ying = ying - value.count * value.price;}
				   if(value.flag==2) {count=count - value.count;  ying = ying + value.count * value.price;} 
				   return callback();
			   }, function(err){
			    
			    	return callback(err,count, ying,n);

		});  // async  end
		   
	});
	
}




Zhengquan.GetGupiaoSheetList= function GetGupiaoSheetList(userid, callback) 
{   var reu='', nulltmp=null,n=0 , total=0 , idtmp='null', codetmp='null';
  console.log('USER:' + userid);
  var sqlstr="SELECT * FROM `gupiao`   where status = 1 and userid= "+ userid  + " ORDER BY code DESC" ;
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   //console.log(results);
		    //console.log('cont:'+results.length);
		    if(results.length==0)   return callback(err,nulltmp,0 ,"null|null");
		    else 
		    async.eachSeries(results,function(value,callback){
		    	
		    	GetCountAndying(value.gp_id, userid,  function(err,count,ying,n){
		    		
		    		var td_div_pricetmp='td_div_price' + value.gp_id;
			    	var td_input_pricetmp='td_input_price' + value.gp_id;
			    	var jiaoyitmp='jiaoyi' + value.gp_id;
			    	var mingxitmp='mingxi' + value.gp_id;
					var yinglitmp='td_div_yingli' + value.gp_id;
					var counttmp='td_div_count' + value.gp_id;

		    		 total  = total + count * value.price;
		    		 var yingli = ying + count * value.price;
					 var yingli =yingli.toFixed(3);
					 
		    		 var tr_tmp='tr_gupiaoSheet' +value.gp_id;
		    		 reu=reu + " <tr id=\'" + tr_tmp +  "\'  class='success'> ";
		    		 reu=reu + "<td>"+ value.name + " <br>"+ value.code + " </td>";
		    		 reu=reu + "<td><div id='"+counttmp+"'>" + count + "</div></td>";
		    		 reu=reu + "<td  ondblclick=\"showInput('"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\" ><div id='" + td_div_pricetmp +"' >" + value.price +"</div>  <input  id='"+td_input_pricetmp +"'  type='text'  value='"+value.price+"'  style='display: none; width:100px;'  onblur= \"updateKey('gupiao' , 'price', "+value.gp_id+", '"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\"  /></td>";
		    		 reu=reu + "<td><div id='"+yinglitmp+"'>" + yingli  + "</td>";
		    		 reu=reu + "<td><a  id='"+mingxitmp+"'   onclick='addmingxi("+value.gp_id+")' >明细</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a id='"+jiaoyitmp+"'   onclick=\"addGupiaoJiaoyi("+value.gp_id+", '"+value.name+"')\" >交易</a>" ;
		    		 reu=reu +	"<input type='hidden' id='"+jiaoyitmp+"' value='0' ><input type='hidden' id='"+mingxitmp+"'  value='0' ></td>";
		    		 reu=reu + "</tr>";	
					 
					 idtmp = idtmp + "," + value.gp_id;
				     codetmp = codetmp + "," + value.code;
					 		    	
			    	 callback();	    

		    	});

		    }, function(err){
		    	//console.log(reu);	    	
				var allcode=idtmp + "|" + codetmp ;
		    	return callback(err,reu,total , allcode);	   
		    });  // async  end
    });  // MySql  query  end
}






function GetCountAndying_qiquan(id, userid, callback) {
	var  nulltmp=null,n=0 , count=0, ying=0;
	var sqlstr= "SELECT * FROM `qiquan_deal`   where status = 1 and qq_id =  " + id + " and userid=" + userid;
	//console.log(sqlstr);
	MySql.query(sqlstr, function(err, results) {
		//console.log(results);
	  	if(results ==null)  return callback(err,0,0,n);
		   else
			   async.eachSeries(results,function(value,callback){
				   n++;
				   if(value.flag==1) {count=count + value.count;  ying = ying - value.count * value.price;}
				   if(value.flag==2) {count=count - value.count;  ying = ying + value.count * value.price;} 
				   callback();
			   }, function(err){		    
			    	return callback(err,count, ying,n);
		});  // async  end
		   
	});
	
}



Zhengquan.GetQiquanSheetList= function GetQiquanSheetList(userid, callback) {
	var reu='', nulltmp=null, total=0, nametmp='' , namestr='';
    var sqlstr= "SELECT * FROM `qiquan`   where status = 1 and userid=  " + userid;
    //console.log(sqlstr);
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   // console.log(results);
		    //console.log('cont:'+results.length);
		    if(results.length==0)   return callback(err,null,0);
		    else 
		    async.eachSeries(results,function(value,callback){
		    	
		    	GetCountAndying_qiquan(value.qq_id, userid, function(err,count,ying, n){
		    		
			    	var td_div_pricetmp='td_div_price' + value.qq_id;
			    	var td_input_pricetmp='td_input_price' + value.qq_id;
			    	var jiaoyitmp='jiaoyi' + value.qq_id;
			    	var mingxitmp='mingxi' + value.qq_id;

		    			if(value.flag==1)  {nametmp=value.name + "&nbsp;&nbsp;  认购  <br> ("+value.code +") "; namestr =value.name +"  "+ value.code +"  认购"; }
			    		else  {nametmp=value.name + "&nbsp;&nbsp;  认沽 <br> ("+value.code +") ";  namestr =value.name +"  "+ value.code + "  认沽";  }
			    		total  = total + count * value.price;
			    		var yingli = ying + count * value.price;
			    		var tr_tmp='tr_Sheet' +value.qq_id;
			    		reu=reu + " <tr id=\'" + tr_tmp +  "\'  class='success'> ";
			    		reu=reu + "<td>"+ nametmp + " </td>";
			    		reu=reu + "<td>" + count + "</td>";
			    		reu=reu + "<td  ondblclick=\"showInput('"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\" ><div id='" + td_div_pricetmp +"' >" + value.price +"</div>  <input  id='"+td_input_pricetmp +"'  type='text'  value='"+value.price+"'  style='display: none; width:100px;'  onblur= \"updateSQL(  'qiquan' , 'price'  ,  'qq_id' , "+value.qq_id+"   , '"+td_input_pricetmp+"','"+ td_div_pricetmp+"',1)\"  /></td>";
				    	 
			    		reu=reu + "<td>" + yingli  + "</td>";
			    		reu=reu + "<td><a id='"+mingxitmp+"'   onclick='addmingxi_qiquan("+value.qq_id+")' >明细</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a id='"+jiaoyitmp+"'   onclick=\"addQiquanJiaoyi("+value.qq_id+", '"+namestr+"')\" >交易</a>" ;
		    		    reu=reu +	"<input type='hidden' id='"+jiaoyitmp+"' value='0' ><input type='hidden' id='"+mingxitmp+"'  value='0' ></td>";
			    		reu=reu + "</tr>";
				    	callback();	

		    	});

		    }, function(err){
		    	//console.log(reu);
		    	
		    	return callback(err,reu,total);
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}

 
 
 Zhengquan.updateSQLstring = function updateSQLstring(sql, userid, callback) {
	 var sqlstr=sql + " and `userid` = '" + userid +"'";
	 console.log(sqlstr);
	 MySql.query(sqlstr, function(err, doc) {
		  callback(err, doc);  
		  console.log(doc);
	 });
	 
	 //console.log(sqlstr); 
	 //callback(null,'OK');
 }
 

 

		
		