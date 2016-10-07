var assert=require('assert');
var async = require('async');
var config = require('./config');
var EventProxy =   require('eventproxy');
var MySql = require('./MySql');

function Qiquan(resu) {
	   this.gq_id = resu.gq_id  ;
	   this.name = resu.name  ;
	   this.code  = resu.code   ;
	   this.status   = resu.status  ;
	   this.price   = resu.price  ;
	   this.flag   = resu.flag  ;	
	   this.price   = resu.price  ;	
		};	
		
	module.exports = Qiquan;

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };
 //sleep(10000);  等待10秒。
 
 
Gupiao.CancelGupiao =function CancelGupiao (gp_id,callback) {
	var sqlstr='UPDATE `gupiao`  SET status = 0 WHERE gp_id = ' + gp_id;
	MySql.query(sqlstr, function(err, doc) {
		return    callback(err, doc);	    
   });
		   
}


Gupiao.updateKey =function updateKey(sqlstr,callback){
	MySql.query(sqlstr, function(err, doc) {
		return    callback(err, doc);	    
   });

}






 
function IsGupiaoExist(gupiaoname  , gupiaocode , callback) {
	var sqlstr="select * FROM `gupiao`  where  status = 1 and (name='"+gupiaoname+"' OR code='"+gupiaocode+"')   ";
	console.log(sqlstr);
	MySql.query(sqlstr, function(err, doc) {
		console.log(doc);
		if(err) return callback(err);
		else
			if(doc.length!=0)  return callback('股票已存在，请重新输入!')
			else return callback(err,0)
   });
}


Gupiao.AddGupiao=function AddGupiao(gupiaoname  , gupiaocode , gupiaoprice ,callback) {
	 IsGupiaoExist(gupiaoname  , gupiaocode , function(err ,flag){
		 if(err) return callback(err);
		 else
			 if(flag==0) {
				 MySql.query('INSERT INTO gupiao SET ?', {name:gupiaoname , code: gupiaocode , price: gupiaoprice }, function(err, doc) {
                      console.log(doc);
					 return callback(err,doc);
				 });
			 }
		 
	 });
	
	
}





//cancel x: 0:_id  , 1:userid,modid,projid
Gupiao.GetGupiaoList= function GetGupiaoList(callback) 
{   var reu='', nulltmp=null,n=0 ;

	MySql.query('SELECT * FROM `gupiao`  where status = 1', function(err, results) {
		   if (err) callback(err);
		   
		    //console.log(results);
		    if(results.length==0) return callback(err,nulltmp);
		    
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
		    	
		    	callback();
		    	
		    }, function(err){
		    	//MySql.end();
		    	return callback(err,reu);
		    
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}



function GetCountAndying(gp_id, callback) {
	var  nulltmp=null,n=0 , count=0, ying=0;
	var sqlstr= "SELECT * FROM `gupiao_deal`   where status = 1 and gp_id =  " + gp_id + " ";
	//console.log(sqlstr);
	MySql.query(sqlstr, function(err, results) {
		//console.log(results);
		
	  	if(results ==null)  return callback(err,0,0);
		   else
			   async.eachSeries(results,function(value,callback){
				   if(value.flag==1) {count=count + value.count;  ying = ying - value.count * value.price;}
				   if(value.flag==2) {count=count - value.count;  ying = ying + value.count * value.price;} 
			   }, function(err){
			    
		return callback(err,count, ying);

		});  // async  end
		   
	});
	
}




Gupiao.GetGupiaoSheetList= function GetGupiaoSheetList(callback) 
{   var reu='', nulltmp=null,n=0 , total=0;

	MySql.query('SELECT * FROM `gupiao`   where status = 1', function(err, results) {
		   if (err) callback(err);
		   console.log(results);
		    console.log('cont:'+results.length);
		    if(results.length==0)   return callback(err,nulltmp);
		    else 
		    async.eachSeries(results,function(value,callback){
		    	
		    	GetCountAndying(value.gp_id, function(err,count,ying){
		    		total  = total + count * value.price;
		    		var yingli = ying + count * value.price;
		    		var tr_tmp='tr_gupiaoSheet' +value.gp_id;
		    		reu=reu + " <tr id=\'" + tr_tmp +  "\'  class='success'> ";
		    		reu=reu + "<td>"+ value.name + " <br>"+ value.code + " </td>";
		    		reu=reu + "<td>" + count + "</td>";
		    		reu=reu + "<td>" + value.price  + "</td>";
		    		reu=reu + "<td>" + yingli  + "</td>";
		    		reu=reu + "<td><a>明细</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a>交易</a></td>";
		    		reu=reu + "</tr>";
			    	
			    	callback();
		    		
		    	});

		    }, function(err){
		    	//console.log(reu);
		    	
		    	return callback(err,reu,total);
		   
		    });  // async  end
		    
		 	
    });  // MySql  query  end

}



 
 
 
 

 

		
		