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



 Zhengquan.IsExistDeal= function IsExistDeal(gp_id,userid,callback) {
	var sqlstr="select * FROM `gupiao_deal`  where  `status` = 1 and `userid`='"+ userid +"' and `gp_id` = '" + gp_id + "'  ";
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		 console.log(doc);
	     return callback(err,doc)
    }); 
	 
 }


 Zhengquan.IsExistDeal_qiquan= function IsExistDeal_qiquan(qq_id,userid,callback) {
	var sqlstr="select * FROM `qiquan_deal`  where  `status` = 1 and `userid`='"+ userid +"' and `qq_id` = '" + qq_id + "'  ";
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		 console.log(doc);
	     return callback(err,doc)
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
		    	
				if(parseInt(sql['flag'])==1 )  edu= value.price  *  value.count;
				else if(parseInt(sql['flag'])==2 ) { edu= value.price  *  value.count * 10000 ; edu =edu.toFixed(1); } 


		    	if(value.flag==1)  tmp1='买入';
		    	else if(value.flag==2)  tmp1='卖出';
		    	
		    	
  	
		    	reu=reu + "<tr class='info'  > ";
				reu=reu + "<td style='width:110px;' >   </td> ";
				reu=reu + "<td style='width:110px;' >   </td> ";
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
	//deal_money
    var data={};
	data.deal_money = sql.deal_money;
	data.dealdate = sql.Date;
	data.qq_id = parseInt(sql['id']) ;
	data.price = parseFloat(sql['price']);
	data.userid = parseInt(userid );
	data.flag = parseInt(sql['flag'] );
	data.count = sql['Count'];	
	data.status = 1;	
	data.remark = sql.remark;	

	console.log(data);
MySql.query('INSERT INTO qiquan_deal  SET ?',  data , function(err, doc) {
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
	var loadCodeInfo={} , datas={} ;
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   
		    //console.log(results);
		    if(results.length==0) return callback(err,nulltmp,datas);
		    
		    async.eachSeries(results,function(value,callback){
                loadCodeInfo[value.qq_id] = value.code;
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

				console.log(loadCodeInfo);

				datas.loadCodeInfo = JSON.stringify(loadCodeInfo);

		    	return callback(err,reu,datas);
		    
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}





function GetCountAndying(gp_id,userid, callback) {
	var  nulltmp=null,n=0 , count=0, ying=0, data={}, days=0 , jiaoge_yingli=0 , yield = 0,  totalBuy=0;
	var  buyStamp = 0, sellStamp = 0;
	var  buy_money_stamp=0 , sell_money_stamp=0 ;
	var sqlstr= "SELECT * FROM `gupiao_deal`  where status = 1 and gp_id = " + gp_id + " and userid= " + userid;
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, results) {
		//console.log(results);
	  	if(results ==null)  return callback(err,0,0,n);
		   else
			   async.eachSeries(results,function(value,callback){
				   n++;
				   if(value.flag==1) {
					   totalBuy = totalBuy +  value.count;  
					   count=count + value.count;  
					   ying = ying - value.count * value.price; 
					   jiaoge_yingli = jiaoge_yingli - value.deal_money;
					   buyStamp = buyStamp + value.count * Date.parse( value.dealdate  );
					   
					   buy_money_stamp = buy_money_stamp +   value.count * Date.parse( value.dealdate  );
					  
					   
					   return callback();
					} else if(value.flag==2) {
					    count=count - value.count; 
					    ying = ying + value.count * value.price; 
						jiaoge_yingli = jiaoge_yingli + value.deal_money;
					    sellStamp = sellStamp + value.count * Date.parse( value.dealdate  );
						
						sell_money_stamp = sell_money_stamp +   value.count * Date.parse( value.dealdate  );						
						
						return callback();
					 } 
				   
				   
				   return callback();
			   }, function(err){
				    data.yield = yield;
					data.jiaoge_yingli = jiaoge_yingli;
					
					data.totalBuy = totalBuy;
					
					data.days = [ count * Date.parse(new Date()) + sellStamp -  buyStamp ] / (totalBuy * 86400000) ;

			     
			    	return callback(err,count, ying,n,data);

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
		    	
		    	GetCountAndying(value.gp_id, userid,  function(err,count,ying,n, data){
		    		
		    		var td_div_pricetmp='td_div_price' + value.gp_id;
			    	var td_input_pricetmp='td_input_price' + value.gp_id;
			    	var jiaoyitmp='jiaoyi' + value.gp_id;
			    	var mingxitmp='mingxi' + value.gp_id;
					var yinglitmp='td_div_yingli' + value.gp_id;
					var shijitmp = 'shiji'+value.gp_id;
					var counttmp='td_div_count' + value.gp_id;
					var jiaogetmp = 'jiaoge'+value.gp_id;



		    		 total  = total + count * value.price;
		    		 var yingli = ying + count * value.price ; yingli =yingli.toFixed(1);
					 var jiaoge_yingli=data.jiaoge_yingli;  jiaoge_yingli = jiaoge_yingli.toFixed(1);
					 var days = data.days  ; days = days.toFixed(1);
					 
					 var shiji_yingli =  data.jiaoge_yingli +  count * value.price;  shiji_yingli = shiji_yingli.toFixed(1); // shiji_shouyi = shiji_shouyi.toFixed(1);
					 
					 var yield =0;
					 
					 var  codeTmp= value.code + '' ;
					 var  yingli_TMP = '';
					 console.log(codeTmp,'len:', codeTmp.length );
					 if(codeTmp.length == 5)  {  //如果为港股
						 yingli_TMP = yingli + "(港币)";
						 
					 } else { //非港股
						 yingli_TMP = yingli + "(元)";						 
						 
					 }

					 					 
		    		 var tr_tmp='tr_gupiaoSheet' +value.gp_id;
		    		 reu=reu + " <tr id=\'" + tr_tmp +  "\'  class='success'> ";
		    		 reu=reu + "<td>"+ value.name + " <br>"+ value.code + " </td>";
		    		 reu=reu + "<td>" + data.totalBuy + " /<div id='"+counttmp+"'>" +  count  + "</div></td>";
					 
		    		 reu=reu + "<td> " + days + "(天) </td>";		
					 			 
		    		 reu=reu + "<td  ondblclick=\"showInput('"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\" ><div id='" + td_div_pricetmp +"' >" + value.price +"</div>  <input  id='"+td_input_pricetmp +"'  type='text'  value='"+value.price+"'  style='display: none; width:100px;'  onblur= \"updateKey('gupiao' , 'price', "+value.gp_id+", '"+td_input_pricetmp+"','"+ td_div_pricetmp+"')\"  /> </div></td>";
		    		
					 reu=reu + "<td><div id='"+yinglitmp+"'>" + yingli_TMP  + "</div></td>";

					 reu=reu + "<td><div id='"+jiaogetmp+"'  >" + jiaoge_yingli + "</div><br><label id='"+shijitmp+"' >"+ shiji_yingli + "</label>"  + "</td>";		 
					 reu=reu + "<td>" + yield + "</div></td>";	
					 					 
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
				
				  //var dd1='2016-01-01' , dd2='2016-01-02';
                  //console.log('uu:', [Date.parse(dd2)  - Date.parse(dd1)] / (24*60*60 )  );
		    	return callback(err,reu,total , allcode);	   
		    });  // async  end
    });  // MySql  query  end
}






function GetCountAndying_qiquan(id, userid, callback) {
	var  nulltmp=null,n=0 , count=0, ying=0, data={},jiaoge=0;
	var sqlstr= "SELECT * FROM `qiquan_deal`   where status = 1 and qq_id =  " + id + " and userid=" + userid;
	//console.log(sqlstr);
	MySql.query(sqlstr, function(err, results) {
		//console.log(results);
	  	if(results ==null)  return callback(err,0,0,n);
		   else
			   async.eachSeries(results,function(value,callback){
				   n++;
				   if(value.flag==1) {count=count + value.count; jiaoge = jiaoge - value.deal_money;  ying = ying - value.count * value.price * 10000;}
				   if(value.flag==2) {count=count - value.count; jiaoge = jiaoge + value.deal_money;   ying = ying + value.count * value.price * 10000;} 
				   callback();
			   }, function(err){	
				    data.jiaoge = jiaoge;	    
			    	return callback(err,count, ying,n, data);
		});  // async  end
		   
	});
	
}



Zhengquan.GetQiquanSheetList= function GetQiquanSheetList(userid, callback) {
	var reu='', nulltmp=null, total=0, nametmp='' , namestr='', shizhi=0 , shizhi_total = 0, shiji_yingli_total = 0;
    var sqlstr= "SELECT * FROM `qiquan`   where status = 1 and userid=  " + userid;
    //console.log(sqlstr);
	var loadCodeInfo={} , datas={} ;
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   // console.log(results);
		    //console.log('cont:'+results.length);

		    if(results.length==0)   return callback(err,null,total ,datas);
		    else 
		    async.eachSeries(results,function(value,callback){
		    	
		    	GetCountAndying_qiquan(value.qq_id, userid, function(err,count,ying, n , datasDoc){	
					loadCodeInfo[value.qq_id] = value.code;

			    	var td_div_pricetmp='td_div_price' + value.qq_id;
			    	var td_input_pricetmp='td_input_price' + value.qq_id;
					var shizhitmp='td_shizhi' + value.qq_id;
			    	var jiaoyitmp='jiaoyi' + value.qq_id;
			    	var mingxitmp='mingxi' + value.qq_id;
					var yinglitmp='td_div_yingli' + value.qq_id;
					var shijitmp = 'shiji'+ value.qq_id;
					var jiaogetmp = 'jiaoge'+ value.qq_id;	
					var counttmp = 'td_div_count' + value.qq_id;
					var jiaoge = 0;

					if(datasDoc) jiaoge =  datasDoc.jiaoge;

					var  shiji_yingli = parseFloat(jiaoge) +  count * value.price*10000;

                    shiji_yingli = shiji_yingli.toFixed(1);


		    		nametmp=value.name + "&nbsp;&nbsp;<br> ("+value.code +") ";  
					namestr =value.name +"  "+ value.code  ;  

			    		
						total  = total + count * value.price*10000;
						shizhi = count * value.price*10000;

						shizhi_total = parseFloat(shizhi_total) + parseFloat(shizhi);
						shiji_yingli_total = parseFloat(shiji_yingli_total) + parseFloat(shiji_yingli);

						shizhi_total= shizhi_total.toFixed(1); 
						shiji_yingli_total = shiji_yingli_total.toFixed(1);
						shizhi = shizhi.toFixed(1);

			    		var yingli = ying + count * value.price*10000;
			    		var tr_tmp='tr_Sheet' +value.qq_id;


			    		reu=reu + " <tr id=\'" + tr_tmp +  "\'  class='success'> ";
			    		reu=reu + "<td>"+ nametmp + " </td>";
			    		reu=reu + "<td><div id='" + counttmp + "'>" + count + "</div></td>";
			    		reu=reu + "<td ><div id='" + td_div_pricetmp +"' >" + value.price +"</div></td>";
			    		reu=reu + "<td ><div id='" + shizhitmp +"' >" + shizhi +"</div></td>";	
								    	 
			    		reu=reu + "<td><div id='"+jiaogetmp+"'  >" + jiaoge + "</div><label id='"+shijitmp+"' >"+ shiji_yingli + "</label><label>(元)</label>"  + "</td>";	
			    		reu=reu + "<td><a id='"+mingxitmp+"'   onclick='addmingxi_qiquan("+value.qq_id+")' >明细</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a id='"+jiaoyitmp+"'   onclick=\"addQiquanJiaoyi("+value.qq_id+", '"+namestr+"')\" >交易</a>" ;
		    		    reu=reu +	"<input type='hidden' id='"+jiaoyitmp+"' value='0' ><input type='hidden' id='"+mingxitmp+"'  value='0' ></td>";
			    		reu=reu + "</tr>";
				    	callback();	

		    	});

		    }, function(err){
		    	//console.log(reu);

				console.log(loadCodeInfo);
				datas.loadCodeInfo = JSON.stringify(loadCodeInfo);
				datas.shizhi_total =  shizhi_total;
				datas.shiji_yingli_total = shiji_yingli_total;
		    	
		    	return callback(err,reu,total ,datas);
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}

 
 







Zhengquan.GetQiquanSheetList_for_auto= function GetQiquanSheetList_for_auto(userid, callback) {
	var reu='', nulltmp=null, total=0, nametmp='' , namestr='', shizhi=0 , shizhi_total = 0, shiji_yingli_total = 0;
    var sqlstr= "SELECT * FROM `qiquan`   where status = 1 and userid=  " + userid;
    //console.log(sqlstr);
	var loadCodeInfo={} , datas={} ;
	MySql.query(sqlstr, function(err, results) {
		   if (err) callback(err);
		   // console.log(results);
		    //console.log('cont:'+results.length);

		    if(results.length==0)   return callback(err,null,total ,datas);
		    else 
		    async.eachSeries(results,function(value,callback){
		    	
		     GetCountAndying_qiquan(value.qq_id, userid, function(err,count,ying, n , datasDoc){	
					
				if(count == 0) callback();	
				else {				
						loadCodeInfo[value.qq_id] = value.code;
						var td_div_pricetmp='td_div_price' + value.qq_id;
						var td_input_pricetmp='td_input_price' + value.qq_id;
						var shizhitmp='td_shizhi' + value.qq_id;
						var jiaoyitmp='jiaoyi' + value.qq_id;
						var mingxitmp='mingxi' + value.qq_id;
						var yinglitmp='td_div_yingli' + value.qq_id;
						var shijitmp = 'shiji'+ value.qq_id;
						var jiaogetmp = 'jiaoge'+ value.qq_id;	
						var counttmp = 'td_div_count' + value.qq_id;
						var jiaoge = 0;

						if(datasDoc) jiaoge =  datasDoc.jiaoge;

						var  shiji_yingli = parseFloat(jiaoge) +  count * value.price*10000;

						shiji_yingli = shiji_yingli.toFixed(1);

						nametmp=value.name + "&nbsp;&nbsp;<br> ("+value.code +") ";  
						namestr =value.name +"  "+ value.code  ;  

						total  = total + count * value.price*10000;
						shizhi = count * value.price*10000;

						shizhi_total = parseFloat(shizhi_total) + parseFloat(shizhi);
						shiji_yingli_total = parseFloat(shiji_yingli_total) + parseFloat(shiji_yingli);

						shizhi_total= shizhi_total.toFixed(1); 
						shiji_yingli_total = shiji_yingli_total.toFixed(1);
						shizhi = shizhi.toFixed(1);

						var yingli = ying + count * value.price*10000;
						var tr_tmp='tr_Sheet' +value.qq_id;

						reu=reu + " <tr id=\'" + tr_tmp +  "\'  class='success'> ";
						reu=reu + "<td>"+ nametmp + " </td>";
						reu=reu + "<td><div id='" + counttmp + "'>" + count + "</div></td>";
						reu=reu + "<td ><div id='" + td_div_pricetmp +"' >" + value.price +"</div></td>";
						reu=reu + "<td ><div id='" + shizhitmp +"' >" + shizhi +"</div></td>";	
										
						reu=reu + "<td><div id='"+jiaogetmp+"'  >" + jiaoge + "</div><label id='"+shijitmp+"' >"+ shiji_yingli + "</label><label>(元)</label>"  + "</td>";	
						reu=reu + "<td><a id='"+mingxitmp+"'   onclick='addmingxi_qiquan("+value.qq_id+")' >明细</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a id='"+jiaoyitmp+"'   onclick=\"addQiquanJiaoyi("+value.qq_id+", '"+namestr+"')\" >交易</a>" ;
						reu=reu +	"<input type='hidden' id='"+jiaoyitmp+"' value='0' ><input type='hidden' id='"+mingxitmp+"'  value='0' ></td>";
						reu=reu + "</tr>";
						callback();	
					} //if end

		     });

		 }, function(err){
		    	//console.log(reu);

				console.log(loadCodeInfo);
				datas.loadCodeInfo = JSON.stringify(loadCodeInfo);
				datas.shizhi_total =  shizhi_total;
				datas.shiji_yingli_total = shiji_yingli_total;
		    	
		    	return callback(err,reu,total ,datas);
		   
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
 

 

		
		