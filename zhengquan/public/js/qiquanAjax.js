//申明全局变量：

var qiquanAllCodeInfo={};

var qiquanRefer={};  //智能决策的参照物




//期权信息页面加载运行
function qiquanLoad() {
   var allcodetmp = $('#allcode').val();
   qiquanAllCodeInfo=JSON.parse(allcodetmp);
   console.log('期权ID信息:',qiquanAllCodeInfo );

   getPrice();

}


//期权资产表页面加载运行
function  qiquan_assets_Load() {
   var allcodetmp = $('#allcode').val();
   qiquanAllCodeInfo=JSON.parse(allcodetmp);
   console.log('期权ID信息:',qiquanAllCodeInfo );
   getPrice_qiquan();

}	


//决策系统加载运行
function qiquan_autoDecision_Load() {
   var allcodetmp = $('#allcode').val();
   qiquanAllCodeInfo=JSON.parse(allcodetmp);

   var refercodetmp =  $('#refercode').val();
   qiquanRefer = JSON.parse(refercodetmp );

   console.log('期权ID信息:',qiquanAllCodeInfo );
   getPrice_qiquan_autoDecision();

}

function getPrice_qiquan_autoDecision()
{
 showprice_qiquan_autoDecision();
 
 //在规定的时间段进行实时股价显示 如 09:00---16:20
 
 var oDate = new Date();
 var oMonth = oDate.getMonth() +1;
 var oDay = oDate.getFullYear() + "-" + oMonth + "-" + oDate.getDate();
 
 console.log(oDay);
 
 var headTime = oDay + " 09:00:00";
 var footTime = oDay + " 15:10:00";
 
 var time1 = Date.parse(headTime);
 var time2 = Date.parse(footTime);
 var nowtimeStamp = Date.parse(new Date());
 
 console.log(time1, nowtimeStamp, time2 );
 
 if(nowtimeStamp >= time1 && nowtimeStamp <= time2)  var int=self.setInterval("showprice_qiquan_autoDecision()",3000);	

}



function getPrice_qiquan()
{
 showprice_qiquan();
 
 //在规定的时间段进行实时股价显示 如 09:00---16:20
 
 var oDate = new Date();
 var oMonth = oDate.getMonth() +1;
 var oDay = oDate.getFullYear() + "-" + oMonth + "-" + oDate.getDate();
 
 console.log(oDay);
 
 var headTime = oDay + " 09:00:00";
 var footTime = oDay + " 15:20:00";
 
 var time1 = Date.parse(headTime);
 var time2 = Date.parse(footTime);
 var nowtimeStamp = Date.parse(new Date());
 
 console.log(time1, nowtimeStamp, time2 );
 
 if(nowtimeStamp >= time1 && nowtimeStamp <= time2)  var int=self.setInterval("showprice_qiquan()",30000);	

}





function showprice_qiquan_autoDecision() {
  //获取已有的期权代号和ID信息
  var idvalue=[],codevalue=[];
  $.each(qiquanAllCodeInfo,function(qqid,qqval){
      idvalue[idvalue.length] = qqid;
	  codevalue[codevalue.length] = qqval;
  });

   //获取对比物的期权代号和ID信息
  var idvalue_refer=[],codevalue_refer=[];
  $.each(qiquanRefer,function(id,val){
      idvalue_refer[idvalue_refer.length] = id;
	  codevalue_refer[codevalue_refer.length] = val;
  }); 
  //console.log(idvalue,codevalue); 

  var cc=0;
//从新浪财经处获取期权交易信息
  var listid='list=sh510050';

  var sst='' ,codetype='';
  var tmpstr='' , typeflag ='';
  
  if(codevalue.length > 0) {  //如果存在期权，则
	 
	  for (i in codevalue) {	 //制作新浪请求的参数		
		    sst = codevalue[i];
		    if(sst) listid= listid + ",CON_OP_" +sst;		  
	  }  //for end
	  
	  for (j in codevalue_refer) {	 //制作新浪请求的参数		
		    sst = codevalue_refer[j];
		    if(sst) listid= listid + ",CON_OP_" +sst;		  
	  }  //for end



     console.log('参数:',listid);
  
	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",

			success : function(){    

				$("table#loudong").html(""); 
				$("#infoshow").text(""); 

				//获取50etf
			    var etf_str = eval('hq_str_sh510050');
			    var etf_arr = etf_str.split(',');
		    	var etf_price = etf_arr[3];
				var etfvalue = etf_price*10000;
                
				console.log('50etf 价格:' ,etfvalue );
				$("#50etf").text(etfvalue);
                var emailInfo = '';
         	  for (z in codevalue) {	 //制作新浪请求的参数		
				   
					//获取对比物期权价格
					var  hq_str_CON_OP =  eval('hq_str_CON_OP_' + codevalue[z]);
					var  ele =hq_str_CON_OP.split(',');
                    
					 //把已有的标的，与对比物足够比较分析。
					 // 步骤 1. 获取已有标的的 购 沽方向 ， 月份，期价 ，买价
				 	 // 步骤 2. 循环获取对比物中购 沽方向一致的对比物的信息， 月份，期价 ，卖价
					// 步骤 3. 分析认购情况：估值1.获取标的的期价（转化）+ 买价 ， 估值2.获取对比物期价（转化）+ 卖价+双向手续费
					//         如果估值2 < 估值1 ， 则出现市场漏洞。
                    var name_exist = ele[37], buyPrice_exist = ele[1], price_exist = ele[2] ;
					//去除50etf分后出现的A
					if(name_exist.indexOf('A') != -1) name_exist =name_exist.substring(0,name_exist.indexOf('A'));

					if(name_exist.length == 13  ) { var qijia= name_exist.substring(9); var month_exist =  name_exist[6] + name_exist[7]; } 
					if(name_exist.length == 12  ) { var qijia= name_exist.substring(8); var month_exist =  name_exist[6]; }

                    if(name_exist.indexOf('购')!=-1)  { var type_exist=1; }
    				if(name_exist.indexOf('沽')!=-1)  { var type_exist=2; }  

					var buy_exist =  ele[1], buy_count = ele[0] , code_exist= codevalue[z];

					console.log('标的物代码',name_exist,'代码：',code_exist,'期价:',qijia,'月份:',month_exist,'方向',type_exist, '买入价:',buy_exist, '买入数量：',buy_count);
                    
					//var timestamp = Date.parse(new Date());
					var myDate = new Date();
					if( [ parseInt(myDate.getMonth() ) + 1 ] <= month_exist ) var shichang = month_exist - myDate.getMonth() ;
					else var shichang = 12 + parseInt(month_exist - myDate.getMonth() );
					
					//更新股票数据库
					var sqlstring="UPDATE `qiquan` SET `flag`='" + type_exist + "', `name`='" + name_exist + "' , `price`= '"+ price_exist +"' WHERE  `qq_id` ='"+idvalue[z] + "'";
					updateSQLstring(sqlstring);

					var qijia_zhunhua = parseInt(qijia*10) + parseInt(buy_exist*10000);
					var buy1_exist_value = parseInt(qijia*10) + parseInt(buy_exist*10000);
					var sale1_exist_value = parseInt(qijia*10) + parseInt(ele[3]*10000);

					var buy1_chajia =  etfvalue - buy1_exist_value  ;
					var sale1_chajia =  etfvalue - sale1_exist_value ;

					var buy1_baifenbi = (buy1_chajia / etfvalue) * (12 / shichang) * 100;
                    var sale1_baifenbi = (sale1_chajia / etfvalue) * (12 / shichang) * 100; 
					buy1_baifenbi=buy1_baifenbi.toFixed(2) ,  sale1_baifenbi=sale1_baifenbi.toFixed(2);
                    if(buy1_chajia < 0) buy1_baifenbi = "-" + buy1_baifenbi;
                    if(sale1_chajia < 0) sale1_baifenbi = "-" + sale1_baifenbi;					

                    //更新标的实时价格
					$("#td_div_price" + idvalue[z] ).text(price_exist);
                    
					var td_price_tmp = $("#td_div_price" + idvalue[z] ).text();
					//$('#jiantou_price'+idvalue[z]).text("↑" );   document.getElementById('jiantou_price'+idvalue[z]).style.color = "red"; 
					if(  parseFloat( price_exist)  >  parseFloat(td_price_tmp)  ) { $('#jiantou_price'+idvalue[z]).text("↑" );   document.getElementById('jiantou_price'+idvalue[z]).style.color = "red"; }
                    if(  parseFloat( price_exist)  <  parseFloat(td_price_tmp)  ) { $('#jiantou_price'+idvalue[z]).text("↓" );   document.getElementById('jiantou_price'+idvalue[z]).style.color = "green"; }


					$("#sale1_val" + idvalue[z] ).text(sale1_exist_value + "("+  sale1_chajia.toFixed(0) + ", " + sale1_baifenbi + "% )");	

					var td_sale1_str = 	$("#sale1_val" + idvalue[z] ).text();
					var indexof_tmp = td_sale1_str.indexOf("(");
					if(indexof_tmp != -1 ) {
						td_sale1_tmp =td_sale1_str.substr(0,indexof_tmp);  
						//$('#jiantou_guzhi_sale'+idvalue[z]).text("↑" );   document.getElementById('jiantou_guzhi_sale'+idvalue[z]).style.color = "red"; 
						if(  parseFloat( sale1_exist_value)  >  parseFloat(td_sale1_tmp)  ) { $('#jiantou_guzhi_sale'+idvalue[z]).text("↑" );   document.getElementById('jiantou_guzhi_sale'+idvalue[z]).style.color = "red"; }
						if(  parseFloat( sale1_exist_value)  <  parseFloat(td_sale1_tmp)  ) { $('#jiantou_guzhi_sale'+idvalue[z]).text("↓" );   document.getElementById('jiantou_guzhi_sale'+idvalue[z]).style.color = "green"; }

					}

				
					$("#buy1_val" + idvalue[z] ).text(buy1_exist_value + "("+ buy1_chajia.toFixed(0) + ", " + buy1_baifenbi + "% )");		

					var td_buy1_str = 	$("#buy1_val" + idvalue[z] ).text();
					var indexof_tmp = td_buy1_str.indexOf("(");
					if(indexof_tmp != -1 ) {
						td_buy1_tmp =td_buy1_str.substr(0,indexof_tmp);  
						//$('#jiantou_guzhi_buy'+idvalue[z]).text("↑" );   document.getElementById('jiantou_guzhi_buy'+idvalue[z]).style.color = "red"; 
						if(  parseFloat( buy1_exist_value)  >  parseFloat(td_buy1_tmp)  ) { $('#jiantou_guzhi_buy'+idvalue[z]).text("↑" );   document.getElementById('jiantou_guzhi_buy'+idvalue[z]).style.color = "red"; }
						if(  parseFloat( buy1_exist_value)  <  parseFloat(td_buy1_tmp)  ) { $('#jiantou_guzhi_buy'+idvalue[z]).text("↓" );   document.getElementById('jiantou_guzhi_buy'+idvalue[z]).style.color = "green"; }

					}


                   if(type_exist == 1 ) {  //如果已有的此期权为认购类型
                            
							for (y in codevalue_refer) {	 //制作新浪请求的参数		
								//获取对比物期权价格
								var  hq_str_CON_OP_refer =  eval('hq_str_CON_OP_' + codevalue_refer[y]);
								var  ele_refer =hq_str_CON_OP_refer.split(',');
								var name_refer = ele_refer[37], salePrice_refer = ele_refer[3];

					           //去除50etf分后出现的A
					           if(name_refer.indexOf('A') != -1) name_refer =name_refer.substring(0,name_refer.indexOf('A'));

								
								if(name_refer.length == 13  ) { var qijia_refer = name_refer.substring(9); var month_refer =  name_refer[6] + name_refer[7]; } 
								if(name_refer.length == 12  ) { var qijia_refer = name_refer.substring(8); var month_refer =  name_refer[6]; }
								
								if(name_refer.indexOf('购')!=-1)  { var type_refer=1; $("#td_div_flag" + idvalue_refer[y] ).text('认购');}
								if(name_refer.indexOf('沽')!=-1)  { var type_refer=2; $("#td_div_flag" + idvalue_refer[y] ).text('认沽');}  

								var sale_refer =  ele_refer[3], buy_refer = ele_refer[1]  , price_refer = ele_refer[2] ;
								var sale_count = ele_refer[4] , code_refer= codevalue_refer[y];
								console.log('对比物代码',code_refer,'期价:',qijia_refer,'月份:',month_refer,'方向',type_refer, '卖出价:',sale_refer, '卖出数量：',sale_count);

								//更新股票数据库
								var sqlstring="UPDATE `refer_qiquan` SET `flag`='" + type_refer + "', `name`='" + name_refer + "'  , `price` = '"+ price_refer +"' ,  `buy_1` = '"+ buy_refer +"'     , `sale_1`= '"+ sale_refer +"' WHERE  `rq_id` ='"+idvalue_refer[y] + "'";
								updateSQLstring(sqlstring);


								var buy1_value_refer = parseInt(qijia_refer*10) + parseInt(buy_refer*10000);
								var sale1_value_refer = parseInt(qijia_refer*10) + parseInt(sale_refer*10000);
								//console.log('OOSID:', buy1_value_refer , sale1_value_refer );
								var buy1_chajia_refer =  etfvalue - buy1_value_refer  ;
								var sale1_chajia_refer =  etfvalue - sale1_value_refer ;

								if( [ parseInt(myDate.getMonth() ) + 1 ] <= month_refer ) var shichang_refer = month_refer - myDate.getMonth() ;
								else var shichang_refer = 12 + parseInt( month_refer - myDate.getMonth() ) ;

								var baifenbi_tmp =  ( (sale1_chajia_refer) / etfvalue) * (12 / shichang_refer) * 100;
								baifenbi_tmp=baifenbi_tmp.toFixed(2) ;	
								if(sale1_chajia_refer < 0 ) baifenbi_tmp = "-" + baifenbi_tmp;	
									

								//更新卖一价
								$("#td_div_sale" + idvalue_refer[y] ).text(sale_refer);
								$("#td_div_name" + idvalue_refer[y] ).text(name_refer);
								$("#td_div_code" + idvalue_refer[y] ).text(codevalue_refer[y]);
                                $("#td_div_sale1_value" + idvalue_refer[y] ).text(sale1_value_refer + "("+  sale1_chajia_refer.toFixed(0) +", " + baifenbi_tmp +  "%)");	

								//开始分析
								// 步骤 3. 分析认购情况：估值1.获取标的的期价（转化）+ 买价 ， 估值2.获取对比物期价（转化）+ 卖价+双向手续费
								//         如果估值2 < 估值1 ， 则出现市场漏洞。
							
								if(type_refer == 1  ) {  //如果此对比物为认购类型

										
										qijia_zhunhua_refer = parseInt(sale1_value_refer)  + 14  ;
										
										console.log(qijia,buy_exist , qijia_zhunhua);
										console.log(qijia_refer,sale_refer , qijia_zhunhua_refer);

										if(parseInt(qijia_zhunhua_refer) <  parseInt(qijia_zhunhua) ) {
                                            console.log('出现市场漏洞');
											$("#infoshow").text("出现市场漏洞");
                                            cc++;
											//qijia_zhunhua=qijia_zhunhua.toFixed(0);
											//qijia_zhunhua_refer=qijia_zhunhua_refer.toFixed(0);

											var loudong_value = parseInt(qijia_zhunhua)  -  parseInt(qijia_zhunhua_refer)  ;

											//var loudongInfo = " 标的："+ name_exist+" (买价：" + buy_exist+ ", 估值：" + qijia_zhunhua +") ==换为==》 对比物：" + name_refer +"(卖价：" + sale_refer +", 估值：" + qijia_zhunhua_refer + ") , 有实际价值差价：" + qijia_zhunhua +" - " + qijia_zhunhua_refer + " = " + loudong_value +" ";

										    var loudongtmp = " <tr class='success' > " +" <td colspan='7'>" + cc + ".  标的："+ name_exist+" (买价：" + buy_exist+ ", 估值：" + qijia_zhunhua +") ==换为==》 对比物：" + name_refer +"(卖价：" + sale_refer +", 估值：" + qijia_zhunhua_refer + ") , 有实际价值差价：" + qijia_zhunhua +" - " + qijia_zhunhua_refer + " = " + loudong_value +" </td> </tr>  ";
                                           
										    $("table#loudong").append(loudongtmp);

											emailInfo = emailInfo + "<P>" + cc + ".  标的："+ name_exist+" (买价：" + buy_exist+ ", 估值：" + qijia_zhunhua +") ==换为==》 对比物：" + name_refer +"(卖价：" + sale_refer +", 估值：" + qijia_zhunhua_refer + ") , 有实际价值差价：" + qijia_zhunhua +" - " + qijia_zhunhua_refer + " = " + loudong_value +" ";
											

									   } //if end
									
								}

							}  //for end   
                                 


				   }  //if end


	           }  //for end    
         	 
 
			emailInfo=JSON.stringify(emailInfo);
			console.log(emailInfo);
			//if(emailInfo) sendEmail(emailInfo);



			} //success end

	   });  //$.ajax   end


    } //if end


}




function sendEmail(Info) {
		 $.ajax({
			 url:'/AjaxSendEmail',
			 data:{ 'info':Info   },
			 type:'Post',
			 datatype:'json',
			 
			 success: function(data) {
				 
				 //alert(data.des); alert(data.gp_id)
				 if(data.status=='200')  console.log('邮件发送成功' );
				 if(data.status=='404')  console.log('邮件发送失败:' + data.err);
			 }
			 
		 });  //ajax end

}








function showprice_qiquan() {
  //获取期权代号和ID信息
  var idvalue=[],codevalue=[];
  $.each(qiquanAllCodeInfo,function(qqid,qqval){
      idvalue[idvalue.length] = qqid;
	  codevalue[codevalue.length] = qqval;
  });
  //console.log(idvalue,codevalue); 


//从新浪财经处获取期权交易信息
  var listid='list=fx_shkdcny';

  var sst='' ,codetype='';
  var tmpstr='' , typeflag ='';
  
  if(codevalue.length > 0) {  //如果存在期权，则
	 
	  for (i in codevalue) {	 //制作新浪请求的参数		
		    sst = codevalue[i];
		    listid= listid + ",CON_SO_" +sst;		  
	  }  //for end
	  
     console.log('参数:',listid);
  
	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",

			success : function(){
              var  shiji_yingli_total=0, shizhi_total=0;
			  
			   for(x in codevalue)
			   { 
			    	//获取港币汇率
					var hk_hlstr = eval('hq_str_fx_shkdcny');
					var hk_hlarr = hk_hlstr.split(',');
					var hk_exchange =  hk_hlarr[1];

					//获取期权价格
					var  hq_str_CON_SO =  eval('hq_str_CON_SO_' + codevalue[x]);
					var  ele =hq_str_CON_SO.split(',');

					//获取页面持仓，现价，市值，交割和实际盈亏
					var td_count = $("#td_div_count" + idvalue[x] ).text();
					var td_price = $("#td_div_price" + idvalue[x] ).text();
					var td_shizhi = $("#td_shizhi" + idvalue[x] ).text();
					var td_jiaoge = $("#jiaoge" + idvalue[x] ).text();	
					var td_shiji = $("#shiji" + idvalue[x] ).text();	

					console.log(td_count,td_price,td_shizhi , td_jiaoge , td_shiji   );								
					
					//console.log(arr_CON_SO);
					var hq_name = ele[0];
					var hq_price = ele[14];
					console.log('名称：',hq_name,'价格：',hq_price);

					var qiquanType= "", qiquanFlagVal='';
    				if(hq_name.indexOf('购')!=-1)  { qiquanType= "认购"; qiquanFlagVal=1;  }
    				if(hq_name.indexOf('沽')!=-1)  {qiquanType= "认沽";   qiquanFlagVal=2;  }                  
					//更新价格...信息
                    if(parseFloat(td_price) != parseFloat(hq_price) ) {  //如果价格发生变化
                       var new_prece = parseFloat(hq_price);
					   var new_shizhi = parseFloat(new_prece *  td_count * 10000);
					   new_shizhi =  new_shizhi.toFixed(1);
                       
					   var chajiatmp =  parseFloat(new_shizhi - td_shizhi);

					   var new_shiji = parseFloat(td_shiji) + parseFloat(chajiatmp)  ;
					   new_shiji = new_shiji.toFixed(1);

					   //总市值，总实际盈利
                       shiji_yingli_total = parseFloat(shiji_yingli_total) + parseFloat(new_shiji) ;
					   
					   shizhi_total = parseFloat(shizhi_total)  +  parseFloat(new_shizhi) ;

					   shiji_yingli_total = shiji_yingli_total.toFixed(1);
					   shizhi_total = shizhi_total.toFixed(1);
					   
					   //$('#td_div_name'+idvalue[x]).text(hq_name);
                       //$('#jiantou'+idvalue[x]).text("↑" );   document.getElementById('jiantou'+idvalue[x]).style.color = "red"; 
					   
					   if(  parseFloat( hq_price)  >  parseFloat(td_price)  ) { $('#jiantou'+idvalue[x]).text("↑" );   document.getElementById('jiantou'+idvalue[x]).style.color = "red"; }
                       if(  parseFloat( hq_price)  <  parseFloat(td_price)  ) { $('#jiantou'+idvalue[x]).text("↓" );   document.getElementById('jiantou'+idvalue[x]).style.color = "green"; }

					   $('#td_div_price'+idvalue[x]).text(hq_price);
   

					   //if( parseFloat(hq_price) > parseFloat(td_price)    ) document.getElementById('jiantou'+idvalue[x]).style.color = "red";
					   //else  document.getElementById("color").style.color = "green";

					   $("#td_shizhi" + idvalue[x] ).text(new_shizhi);
					   $("#shiji" + idvalue[x] ).text(new_shiji);
					   $("#total_val").text(shizhi_total);
					   $("#shiji_total_yingli").text(shiji_yingli_total); 
					}


					//更新股票数据库
					var sqlstring="UPDATE `qiquan` SET `flag`='" + qiquanFlagVal + "', `name`='" + hq_name + "' , `price`= '"+ hq_price +"' WHERE  `qq_id` ='"+idvalue[x] + "'";
					updateSQLstring(sqlstring);


			   }


			} //success end



	  });




  } //if end



}















function getPrice()
{
 showprice();
 
 //在规定的时间段进行实时股价显示 如 09:00---16:20
 
 var oDate = new Date();
 var oMonth = oDate.getMonth() +1;
 var oDay = oDate.getFullYear() + "-" + oMonth + "-" + oDate.getDate();
 
 console.log(oDay);
 
 var headTime = oDay + " 09:00:00";
 var footTime = oDay + " 16:20:00";
 
 var time1 = Date.parse(headTime);
 var time2 = Date.parse(footTime);
 var nowtimeStamp = Date.parse(new Date());
 
 console.log(time1, nowtimeStamp, time2 );
 
 if(nowtimeStamp >= time1 && nowtimeStamp <= time2)  var int=self.setInterval("showprice()",3000);	

}


function showprice()
{
  //var allcode=$("input#allcode").val();
  //alert(allcode);
  //var tmp=allcode.split("|");
  //alert(tmp[0]); alert(tmp[1]);
  var idvalue=[],codevalue=[];
  $.each(qiquanAllCodeInfo,function(qqid,qqval){
      idvalue[idvalue.length] = qqid;
	  codevalue[codevalue.length] = qqval;
	
  });


  //var idvalue=tmp[0].split(",");
  //var codevalue=tmp[1].split(",");
  //alert(idvalue.length); alert(codevalue.length);
  var listid='list=fx_shkdcny';
  var sh_txt = "6,5,9," ;
  var sz_txt = "0,1,2,3,";
  
  var sst='' ,codetype='';
   var tmpstr='' , typeflag ='';
  
  if(codevalue.length > 0) {

	  for (i in codevalue) {
	  			
		    sst = codevalue[i];
		    listid= listid + ",CON_SO_" +sst;		  
	  }  //for end
	  
     console.log('参数:',listid);
	  
	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",
	
            success : function(){
               //alert(data)
			   //console.log(codevalue);

			   var hk_shizhi_total=0, rmb_shizhi_total=0;
			   var zhangmian_yingli_total=0, shiji_yingli_total=0;
			   
			   for(x in codevalue)
			   { 
				   //var tmp=eval('hq_str_sh' + codevalue[x]); 
				   // alert(tmp);
			        //console.log(eval('hq_str_fx_shkdcny')); 

					console.log(x, idvalue[x]);
					
					var hk_hlstr = eval('hq_str_fx_shkdcny');
					var hk_hlarr = hk_hlstr.split(',');
					
					var hk_exchange =  hk_hlarr[1];
					//console.log('港币汇率:' ,  hk_exchange);

					//获取期权价格
					var  hq_str_CON_SO =  eval('hq_str_CON_SO_' + codevalue[x]);
					var  ele =hq_str_CON_SO.split(',');
					
					//console.log(arr_CON_SO);
					var hq_name = ele[0];
					var hq_price = ele[14];

					console.log('名称：',hq_name,'价格：',hq_price);

					var qiquanType= "", qiquanFlagVal='';
    				if(hq_name.indexOf('购')!=-1)  { qiquanType= "认购"; qiquanFlagVal=1;  }
    				if(hq_name.indexOf('沽')!=-1)  {qiquanType= "认沽";   qiquanFlagVal=2;  }                  
					//更新name...信息
					$('#td_div_name'+idvalue[x]).text(hq_name);

                    var price_tmp = $('#td_div_price'+idvalue[x]).text();
                    
			//$('#jiantou'+idvalue[x]).text("↑" );   document.getElementById('jiantou'+idvalue[x]).style.color = "red"; 
			//$('#jiantou'+idvalue[x]).text("↓" );   document.getElementById('jiantou'+idvalue[x]).style.color = "green"; 
					if(  parseFloat( hq_price)  >  parseFloat(price_tmp)  ) { $('#jiantou'+idvalue[x]).text("↑" );   document.getElementById('jiantou'+idvalue[x]).style.color = "red"; }
                    if(  parseFloat( hq_price)  <  parseFloat(price_tmp)  ) { $('#jiantou'+idvalue[x]).text("↓" );   document.getElementById('jiantou'+idvalue[x]).style.color = "green"; }
					$('#td_div_price'+idvalue[x]).text(hq_price);


					$('#td_div_flag'+idvalue[x]).text(qiquanType);
					//$('input#td_input_price'+idvalue[x]).val(prictmp);

					//更新股票数据库
					var sqlstring="UPDATE `qiquan` SET `flag`='" + qiquanFlagVal + "', `name`='" + hq_name + "' , `price`= '"+ hq_price +"' WHERE  `qq_id` ='"+idvalue[x] + "'";
					updateSQLstring(sqlstring);

			   }  //for end

            } //success end
   
       }); //ajax end
  
 
   }

}




function  AjaxAddGupiao()
{
	var gupiaoname=$('#input_gupiaoname_tianjia').val();
	var gupiaocode=$('#input_gupiaocode_tianjia').val();
	var gupiaoprice=$('#input_gupiaoprice_tianjia').val();
	
	
	if(gupiaoname=='' || gupiaoprice=='' || gupiaocode=='' )  alert('Warn:请检查输入股票数据,  数据不能为空!'); 
	else
		{
		// alert(gupiaoname);
		// alert(gupiaoprice);
		// alert(gupiaocode);
		
		  var reg = new RegExp("^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
          //var obj = document.getElementById("name");
           if(!reg.test(gupiaoprice)){
             alert("股价为正浮点数据!");
			 return ;
            }
		  
		  
		  // var reg_price = new RegExp("^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$"); 
		   
		  // if(!reg_price.test(greg_price)){
          //   alert("请输入浮点数字!");
		  //	 return ;
          //  } 
		  
		   //var reg = new RegExp("/\d{6}/");
		   if(!/^\d{5,6}$/.test(gupiaocode)){
             alert("股票代码为数字，并且为6位!");
			 return ;
            } 
		
		
		 $.ajax({
			 url:'/AjaxAddGupiao',
			 data:{name:gupiaoname, price:gupiaoprice  , code:gupiaocode},
			 type:'Post',
			 datatype:'json',
			 
			 success: function(data) {
				 
				 //alert(data.des); alert(data.gp_id)
				 if(data.des==true) {
					 alert('添加成功');
					 $('#input_gupiaoname_tianjia').val(null);
					 $('#input_gupiaocode_tianjia').val(null);
					 $('#input_gupiaoprice_tianjia').val(null);
					 //alert(data.gp_id);
					 
					 
						var  trtmp= "<tr id='tr_gupiao"+data.gp_id+"' class='success'> ";
						trtmp = trtmp +  "<td  ondblclick=\"showInput('td_input_name"+data.gp_id+"','td_div_name"+data.gp_id+"')\"> <div id='td_div_name"+data.gp_id+"' >" + gupiaoname + "</div><input id='td_input_name"+data.gp_id+"'  type='text'  value='" + gupiaoname + "' style='display: none; width:100px;'  onblur=\"updateKey('gupiao' , 'name', "+data.gp_id+", 'td_input_name"+data.gp_id+"','td_div_name"+data.gp_id+"')\"  /></td>" ;
						trtmp = trtmp +  "<td  ondblclick=\"showInput('td_input_code"+data.gp_id+"','td_div_code"+data.gp_id+"')\">  <div id='td_div_code"+data.gp_id+"' >" + gupiaocode + "</div><input  id='td_input_code"+data.gp_id+"'  type='text'  value='" + gupiaocode + "'  style='display: none; width:100px;'  onblur=\"updateKey('gupiao' , 'code', "+data.gp_id+", 'td_input_code"+data.gp_id+"','td_div_code"+data.gp_id+"')\"   /></td>" ;
						trtmp = trtmp +	"<td  ondblclick=\"showInput('td_input_price"+data.gp_id+"','td_div_price"+data.gp_id+"')\">   <div id='td_div_price"+data.gp_id+"' >"+ gupiaoprice +"</div><input  id='td_input_price"+data.gp_id+"'  type='text'  value='" + gupiaoprice + "'  style='display: none; width:100px;'  onblur=\"updateKey('gupiao' , 'price', "+data.gp_id+", 'td_input_price"+data.gp_id+"','td_div_price"+data.gp_id+"')\"   /></td>";
						trtmp= trtmp +  "<td> <a onclick=\'AjaxCancelGupiao("+data.gp_id+")\'>注销</a></td> ";
						trtmp= trtmp +  "</tr>";
						//alert(trtmp);
						
						$("table#table_gupiao").append(trtmp); 
						
						var allcode=$("input#allcode").val();
  
                        var tmp=allcode.split("|");
                        var idvalue=tmp[0] + "," + data.gp_id;
                        var codevalue=tmp[1]+ "," + gupiaocode;
						var docvalue= idvalue + "|" + codevalue;
						//alert(docvalue);
						$("input#allcode").val(docvalue);
					 }
				 
					else  alert('warn:' + data.des);
			 }
			 
		 });  //ajax end
			
		}//if end

}





function isReferExist(code){
   var flag =0;
  $.each(qiquanRefer,function(id,val){
      if(val == code ) flag =1;
  });

  return flag;

}





function AjaxAddqiquan_auto() 
{
	//var name=$('#input_qiquanname_tianjia').val();
	var code=$('#input_qiquancode_tianjia').val();
	//var price=$('#input_qiquanprice_tianjia').val();
	//var flag=$('select#qiquanflag').val();
	var flagname='';
     
	if(isReferExist(code) == 1 ) {alert('此期权已存在.'); return ;}
	
	//if(flag==1) flagname='认购';
	//if(flag==2) flagname='认沽';
	//alert(name);alert(code);alert(price);	alert(flag);
	
	if( code==''  )  alert('Warn:请检查输入期权数据,  数据不能为空!'); 
	
	else
		{

		 $.ajax({
			 url:'/AjaxAddqiquan_refer',
			 data:{ 'code':code   },
			 type:'Post',
			 datatype:'json',
			 
			 success: function(data) {
				 
				 //alert(data.des); alert(data.gp_id)
				 if(data.status=='200') {
					// alert('添加成功');
					// $('#input_qiquanname_tianjia').val(null);
					// $('#input_qiquancode_tianjia').val(null);
					// $('#input_qiquanprice_tianjia').val(null);
					// alert(data.id);

					 
						var  trtmp= "<tr id='tr_qiquan"+data.id+"' class='success'> ";
						trtmp = trtmp +  "<td  > <div id='td_div_name"+data.id+"' ></div>" +
					                      "</td>" ;
						trtmp = trtmp +  "<td  > <div id='td_div_flag"+data.id+"' ></div>" +
								"  </td>" ;
                        trtmp = trtmp +  "<td  >  <label id='jiantou_refer_sale"+data.id+"' style='float: left;'></label>  <div id='td_div_sale1_value"+data.id+"'></div>" +
								"  </td>" ;

						trtmp = trtmp +  "<td >  <div id='td_div_code"+data.id+"' >" + code + "</div></td>" ;
						trtmp = trtmp +	"<td  >  <label id='jiantou_refer_price"+data.id+"' style='float: left;'></label> <div id='td_div_sale"+data.id+"' ></div></td>";
						trtmp= trtmp +  "<td> <a onclick=\'AjaxCancelQiquan_auto("+data.id+")\'>注销</a></td> ";
						trtmp= trtmp +  "</tr>";
						//alert(trtmp);
						
						$("table#table_qiquan").append(trtmp); 

                        qiquanRefer[data.id] =code;

					 }
				 
					if(data.status=='404')  alert('warn:' + data.err);
			 }
			 
		 });  //ajax end
			
		}//if end




}




function isQiquanExist(code){
   var flag =0;
  $.each(qiquanAllCodeInfo,function(id,val){
      if(val == code ) flag =1;
  });

  return flag;

}




function AjaxAddqiquan()
{
	var name=$('#input_qiquanname_tianjia').val();
	var code=$('#input_qiquancode_tianjia').val();
	var price=$('#input_qiquanprice_tianjia').val();
	var flag=$('select#qiquanflag').val();
	var flagname='';

	if(isQiquanExist(code) == 1 )  {alert('此期权已存在.'); return ;}
	
	if(flag==1) flagname='认购';
	if(flag==2) flagname='认沽';
	//alert(name);alert(code);alert(price);	alert(flag);
	
	if(name=='' || price=='' || code==''  )  alert('Warn:请检查输入期权数据,  数据不能为空!'); 
	else
		{

		 $.ajax({
			 url:'/AjaxAddqiquan',
			 data:{'name':name, 'price':price  , 'code':code , 'flag':flag  },
			 type:'Post',
			 datatype:'json',
			 
			 success: function(data) {
				 
				 //alert(data.des); alert(data.gp_id)
				 if(data.des==true) {
					 alert('添加成功');
					// $('#input_qiquanname_tianjia').val(null);
					 $('#input_qiquancode_tianjia').val(null);
					 $('#input_qiquanprice_tianjia').val(null);
					// alert(data.id);

					 
						var  trtmp= "<tr id='tr_qiquan"+data.id+"' class='success'> ";
						trtmp = trtmp +  "<td  ondblclick=\"showInput('td_input_name"+data.id+"','td_div_name"+data.id+"')\"> <div id='td_div_name"+data.id+"' >" + name + "</div>" +
								"<input id='td_input_name"+data.id+"'  type='text'  value='" + name + "' style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'name' ,  'qq_id' , "+data.id+" ,'td_input_name"+data.id+"','td_div_name"+data.id+"', 1)\"  /></td>" ;
						trtmp = trtmp +  "<td  ondblclick=\"showInput_V2('td_input_flag"+data.id+"','td_div_flag"+data.id+"')\"> <div id='td_div_flag"+data.id+"' >" + flagname + "</div>" +
								"<select id= 'td_input_flag"+data.id+"'   style='display: none;'  onblur=\"updateSQL(  'qiquan' , 'flag' ,  'qq_id' , "+data.id+" ,'td_input_flag"+data.id+"','td_div_flag"+data.id+"', 2)\"   >  <option  value='1'>认购&nbsp;&nbsp;&nbsp;&nbsp;</option>  <option  value='2'>认沽 &nbsp;&nbsp;&nbsp;&nbsp;</option>   </select>  </td>" ;
						trtmp = trtmp +  "<td  ondblclick=\"showInput('td_input_code"+data.id+"','td_div_code"+data.id+"')\">  <div id='td_div_code"+data.id+"' >" + code + "</div><input  id='td_input_code"+data.id+"'  type='text'  value='" + code + "'  style='display: none; width:100px;'   onblur=\"updateSQL(  'qiquan' , 'code' ,  'qq_id' , "+data.id+" ,'td_input_code"+data.id+"','td_div_code"+data.id+"', 1)\"   /></td>" ;
						trtmp = trtmp +	"<td  ondblclick=\"showInput('td_input_price"+data.id+"','td_div_price"+data.id+"')\"> <label id='jiantou"+data.id+"' style='float: left; color: red;'></label>  <div id='td_div_price"+data.id+"' >"+ price +"</div><input  id='td_input_price"+data.id+"'  type='text'  value='" + price + "'  style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'price' ,  'qq_id' , "+data.id+" ,'td_input_price"+data.id+"','td_div_price"+data.id+"', 1)\"   /></td>";
						trtmp= trtmp +  "<td> <a onclick=\'AjaxCancelQiquan("+data.id+")\'>注销</a></td> ";
						trtmp= trtmp +  "</tr>";
						//alert(trtmp);
						
						$("table#table_qiquan").append(trtmp); 

                        qiquanAllCodeInfo[data.id] =code;

					 }
				 
					else  alert('warn:' + data.des);
			 }
			 
		 });  //ajax end
			
		}//if end

}

function AjaxCancelQiquan_auto(id) {

		$.ajax({
			url:'/AjaxCancelQiquan_refer',
			data:{'id':id},
			type:'POST',
			datatype:'json',
			
		   success: function(data) {

			 if(data.status== '200') {var trtmp='tr#tr_qiquan' + id;  $(trtmp).remove();}
			 if(data.status== '404' ) alert('warn:' + data.err);
			 delete qiquanRefer[id];
		   }      
			
		})   //ajax  end

}









function AjaxCancelQiquan(id) { 
	con=confirm("确定要注销吗?");
	if(con==true) {
		$.ajax({
			url:'/AjaxCancelQiquan',
			data:{'id':id},
			type:'POST',
			datatype:'json',
			
		   success: function(data) {
			   //alert(gp_id);
			 //hide("slow");
			 if(data.des==true) {var trtmp='tr#tr_qiquan' + id; alert('注销成功');  $(trtmp).hide("slow");}
				else  alert('warn:' + data.des);

			 qiquanAllCodeInfo[id] = '';
		   }      
			
		})   //ajax  end
	
	}
	
}








//注销股票
function AjaxCancelGupiao(gp_id) { 
	con=confirm("确定要注销吗?");
	if(con==true) {
		$.ajax({
			url:'/AjaxCancelGupiao',
			data:{id:gp_id},
			type:'POST',
			datatype:'json',
			
		   success: function(data) {
			   //alert(gp_id);
			 //hide("slow");
			 if(data.des==true) {var trtmp='tr#tr_gupiao' + gp_id;  $(trtmp).hide("slow");}
				else  alert('warn:' + data.des);
		   }      
			
		})   //ajax  end
	
	}
	
}


function showInput(inputID,divID ){
	
      inputStr='input#' + inputID;

      //alert(inputStr);
	
	var divStr='div#'  + divID;
	
	var divValue=$(divStr).text();
	$(inputStr).val(divValue);	
	
	$(divStr).hide();
	$(inputStr).show().focus();
}

function showInput_V2(inputID,divID){
	
    inputStr='select#' + inputID;
    //alert(inputStr);
	var divStr='div#'  + divID;
	
	//var divValue=$(divStr).text();
	//$(inputStr).val(divValue);	 
	
	$(divStr).hide();
	$(inputStr).show().focus();
}




function updateKey(table , key, id , inputID ,  divID ){

	 var inputStr='input#' + inputID;
	 var divStr='div#'  + divID;
	 var inputVal=$(inputStr).val();
	 
	 var divValue=$(divStr).text(); 
	 var allcode=$("input#allcode").val();
	
	var sqlstr="UPDATE `"+table+"`  SET `"+key+"` = '"+inputVal+"'  WHERE  gp_id = " + id;
	//alert(sqlstr);
	
	$.ajax({
		url:'/AjaxupdateKey',
		data:{'sqlstr':sqlstr  },
		type:'POST',
		datatype:'json',
		
	   success: function(data) {
		   //alert('IN');
		 if(data.des==true) {	
			 $(divStr).text(inputVal); 
			 $(inputStr).hide();
			 $(divStr).show();
			 
			 if(key=='code') {
			  //alert(allcode);
			  allcode= allcode.replace(divValue, inputVal); 
			  //alert(allcode);
			  $("input#allcode").val(allcode);
				 
			 }
			 
			 
			 } 
		 else  alert('warn:' + data.des);		 
	   }      
		
	  })   //ajax  end
}

//flag: 1:input, 2:selecter
function updateSQL(table, key,  idkey , idvalue   , inputID ,  divID ,flag){
	//alert(flag);
	var inputStr='';
    if(flag==1)  inputStr='input#' + inputID;
    if(flag==2)  inputStr='select#' + inputID;
   // alert(inputStr);
	 var divStr='div#'  + divID;
	var inputVal=$(inputStr).val();
	
	var sqlstr="UPDATE  `"+table+"`  SET `"+key+"` = '"+inputVal+"'  WHERE  "+idkey+" = " + idvalue;
	//alert(sqlstr);
	
	$.ajax({
		url:'/AjaxupdateKey',
		data:{'sqlstr':sqlstr  },
		type:'POST',
		datatype:'json',
		
	   success: function(data) {
		   //alert('IN');
		 if(data.des==true) {	
			 if(flag==1 )    $(divStr).text(inputVal);
			 if(flag==2 && inputVal==1)    $(divStr).text('认购');
			 if(flag==2 &&  inputVal==2)    $(divStr).text('认沽');

			 $(inputStr).hide();
			 $(divStr).show();
			 } 
		 else  alert('warn:' + data.des);		 
	   }      
		
	  })   //ajax  end
}





function addGupiaoJiaoyi(id, str){
	var tmp='';

	tmp= tmp + " <tr  id='tr_SheetTmp"+id+"'  class='success'>  ";
	tmp= tmp + "   <td colspan='8' align='right'>  ";
	tmp= tmp + " <table id='tb_SheetTmp"+id+"' frame='below'  > ";
	tmp= tmp + " <tr><td colspan='8' align='right'> ";

	tmp= tmp + " <div> &nbsp;<br>  ";
	tmp= tmp + " <input id='nameTmp"+id+"' type='text'  style='width:100px;' placeholder='"+str+"' disabled   />&nbsp;&nbsp;&nbsp;";
	tmp= tmp + "&nbsp;&nbsp;";
	
	tmp= tmp + " <input id='priceTmp"+id+"' type='text'  style='width:100px;' placeholder='交易价格' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";	
	
	tmp= tmp + " <input id='countTmp"+id+"' type='text'  style='width:80px;' placeholder='数量' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";
	
	tmp= tmp + " <input id='dealMoneyTmp"+id+"' type='text'  style='width:100px;' placeholder='交割金额' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";
    
    //tmp= tmp + "<div class='input-append date form_date'  data-date='' data-date-format='yyyy-mm-dd'>";

    tmp= tmp + "<input id='dateTmp"+id+"' type='text'  style='width:100px;' placeholder='交易日期' required autofocus  >";
	tmp= tmp + "&nbsp;&nbsp;";
	
	tmp= tmp + " <input id='remarkTmp"+id+"' type='text'  style='width:100px;' placeholder='备注' required autofocus  />&nbsp;&nbsp;&nbsp; ";

	
   // tmp= tmp + "<span class='add-on'><i class='icon-th'></i></span>	";
    //tmp= tmp + "</div>";

	
	tmp= tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	
	
	tmp= tmp + "<a class='button button-primary button-rounded button-small' onclick='AjaxBuy("+id+",1)'>买入</a>";
	tmp= tmp + "&nbsp;&nbsp;&nbsp;";
	tmp= tmp + "<a class='button button-primary button-rounded button-small' onclick='AjaxBuy("+id+",2)'>卖出</a>";

	tmp= tmp + " <br></div></td></tr> ";


	tmp= tmp + "<tr><td></td><td></td><td></td><td></td><td></td> </tr>  ";
	tmp= tmp + " </table> ";
	tmp= tmp + "  </td>  ";
	tmp= tmp + " </tr>  ";

	var flag=$("input#jiaoyi"+id).val();
	var mingxiFlag=$("input#mingxi"+id).val();
	//alert(flag);
	if(mingxiFlag==1) alert('Warn:请先结束明细！');
	else
	{
		 if(flag==0) 
			{
			$("input#jiaoyi"+id).val(1);
			$("tr#tr_gupiaoSheet"+id).after(tmp); 
			$("a#jiaoyi"+id).text('返回'); 
			$("a#mingxi"+id).hide("slow"); 
			}
			if(flag==1) 
			{$("input#jiaoyi"+id).val(0); 
			$("tr#tr_SheetTmp"+id).remove();
			$("a#jiaoyi"+id).text('交易'); 
			$("a#mingxi"+id).show("slow"); 
			}
	}
		
}


function addmingxi(id)
{
	var tmp='';

	var flag=$("input#mingxi"+id).val();
	var jiaoyiFlag=$("input#jiaoyi"+id).val();
	// alert(jiaoyiFlag) ;

	if(jiaoyiFlag==1) alert('Warn:请先结束交易！');
	else
	  {
	   //alert('Warn:OK！') ;
	   if(flag==0)  //点击'明细'
	    {
	   
			$.ajax({
				url:'/AjaxMingxi',
				data:{'id':id , 'flag':1},    //flag 1:股票， 2：期权
				type:'POST',
				datatype:'json',
				
			   success: function(data) {
				   //alert(gp_id);
				 //hide("slow");
				 if(data.des==true) { 
						tmp= tmp + "<tr  id='tr_SheetTmp"+id+"'   class='success' >  ";
						tmp= tmp + "<td colspan='8' align='right'>  ";

						tmp= tmp + "<table id='tb_SheetTmp"+id+"'   frame='below'> ";
						tmp= tmp + "<thead><tr class='info'  > ";
						tmp= tmp + "<th style='width:110px;' >日期</th> ";
						tmp= tmp + "<th style='width:100px;' >买入/卖出</th> ";
						tmp= tmp + "<th style='width:100px;' >成交价</th> ";
						tmp= tmp + "<th style='width:100px;' >数量</th> ";
						tmp= tmp + "<th style='width:150px;' >成交额</th> ";
						tmp= tmp + "</tr></thead> ";

						tmp = tmp + data.res;
						
						tmp= tmp + " </table>";
					  
						tmp= tmp + "</td> ";
						tmp= tmp + "</tr> ";
					 
					   //alert(data.res);
					 
					   $("input#mingxi"+id).val(1);
					   $("tr#tr_gupiaoSheet"+id).after(tmp); 
					   $("a#mingxi"+id).text('返回');
					   $("a#jiaoyi"+id).hide('slow');
				 }
					else  alert('warn:' + data.des);
			   }      		
			})   //ajax  end
 
	    }
	   
	   if(flag==1)  //点击'返回'
	    {$("input#mingxi"+id).val(0); 
	    $("tr#tr_SheetTmp"+id).remove();
	    $("a#mingxi"+id).text('明细'); 
	    $("a#jiaoyi"+id).show('slow');
	    }
	   
	  }	


}







function addmingxi_qiquan(id)
{
	var tmp='';
	var flag=$("input#mingxi"+id).val();
	var jiaoyiFlag=$("input#jiaoyi"+id).val();
	// alert(jiaoyiFlag) ;

	if(jiaoyiFlag==1) alert('Warn:请先结束交易！');
	else
	  {
	   //alert('Warn:OK！') ;
	   if(flag==0)  //点击'明细'
	    {

		  // $("input#mingxi"+id).val(1);
		   // $("tr#tr_Sheet"+id).after(tmp); 
		   // $("a#mingxi"+id).text('返回');
		   // $("a#jiaoyi"+id).hide('slow');
		    
			$.ajax({
				url:'/AjaxMingxi',
				data:{'id':id , 'flag':2},    //flag 1:股票， 2：期权
				type:'POST',
				datatype:'json',
				
			   success: function(data) {
				   //alert(gp_id);
				 //hide("slow");
				 if(data.des==true) { 
						tmp= tmp + "<tr  id='tr_SheetTmp"+id+"'   class='success' >  ";


						tmp= tmp + "<td colspan='6' align='right'>  ";

						tmp= tmp + "<table id='tb_SheetTmp"+id+"'   frame='below'> ";
						tmp= tmp + "<thead><tr class='info'  > ";
						tmp= tmp + "<th style='width:110px;' ></th> ";		
						tmp= tmp + "<th style='width:110px;' ></th> ";					
						tmp= tmp + "<th style='width:110px;' >日期</th> ";
						tmp= tmp + "<th style='width:100px;' >买入/卖出</th> ";
						tmp= tmp + "<th style='width:100px;' >成交价</th> ";
						tmp= tmp + "<th style='width:100px;' >数量</th> ";
						tmp= tmp + "<th style='width:150px;' >成交额</th> ";
						tmp= tmp + "</tr></thead> ";

						tmp = tmp + data.res;
						
						tmp= tmp + " </table>";
					  
						tmp= tmp + "</td> ";
						tmp= tmp + "</tr> ";
					 
					 
					 
					   $("input#mingxi"+id).val(1);
					    $("tr#tr_Sheet"+id).after(tmp); 
					    $("a#mingxi"+id).text('返回');
					    $("a#jiaoyi"+id).hide('slow');
				 }
					else  alert('warn:' + data.des);
			   }      		
			})   //ajax  end
 
	    }
	   
	   if(flag==1)  //点击'返回'
	    {$("input#mingxi"+id).val(0); 
	    $("tr#tr_SheetTmp"+id).remove();
	    $("a#mingxi"+id).text('明细'); 
	    $("a#jiaoyi"+id).show('slow');
	    }
	   
	  }	


}





function addQiquanJiaoyi(id, str){
	var tmp='';

	tmp= tmp + " <tr  id='tr_SheetTmp"+id+"'  class='success'>  ";
	tmp= tmp + "   <td colspan='6' align='right'>  ";
	tmp= tmp + " <table id='tb_SheetTmp"+id+"' frame='below'  > ";
	tmp= tmp + " <tr><td colspan='6' align='right'> ";

	tmp= tmp + " <div> &nbsp;<br>  ";
	tmp= tmp + " <input id='nameTmp"+id+"' type='text'  style='width:185px;' placeholder='"+str+"' disabled   />&nbsp;&nbsp;&nbsp;";
	tmp= tmp + "&nbsp;&nbsp;";
	tmp= tmp + " <input id='priceTmp"+id+"' type='text'  style='width:100px;' placeholder='交易价格' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";
	tmp= tmp + " <input id='countTmp"+id+"' type='text'  style='width:80px;' placeholder='数量' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";
	
    //tmp= tmp + " <input id='dealMoneyTmp"+id+"' type='text'  style='width:100px;' placeholder='交割金额' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	//tmp= tmp + "&nbsp;&nbsp;";
	
	tmp= tmp + " <input id='dateTmp"+id+"' type='text'  style='width:100px;' placeholder='交易日期' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";

	
	tmp= tmp + " <input id='remarkTmp"+id+"' type='text'  style='width:100px;' placeholder='备注' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";

	tmp= tmp + "<a class='button button-primary button-rounded button-small' onclick='AjaxBuyQiquan("+id+",1)'>买入</a>";
	tmp= tmp + "&nbsp;&nbsp;";
	tmp= tmp + "<a class='button button-primary button-rounded button-small' onclick='AjaxBuyQiquan("+id+",2)'>卖出</a>";

	tmp= tmp + " <br></div></td></tr> ";


	tmp= tmp + "<tr><td></td><td></td><td></td><td></td><td></td> </tr>  ";
	tmp= tmp + " </table> ";
	tmp= tmp + "  </td>  ";
	tmp= tmp + " </tr>  ";

	var flag=$("input#jiaoyi"+id).val();
	var mingxiFlag=$("input#mingxi"+id).val();
	//alert(flag);
	if(mingxiFlag==1) alert('Warn:请先结束明细！');
	else
	{
		  if(flag==0)   //如果点击”交易“
		   {
		    $("input#jiaoyi"+id).val(1);
		    $("tr#tr_Sheet"+id).after(tmp); 
		    $("a#jiaoyi"+id).text('返回'); 
		    $("a#mingxi"+id).hide("slow"); 
		    }
		  if(flag==1)   //如果点击”返回“
		   {
			  $("input#jiaoyi"+id).val(0); 
		      $("tr#tr_SheetTmp"+id).remove();
		     $("a#jiaoyi"+id).text('交易'); 
		     $("a#mingxi"+id).show("slow"); 
	      }

	}
	
	
}




function AjaxBuy(id,flag) {
	var price=$("input#priceTmp"+id).val();
	var Count=$("input#countTmp"+id).val();
	var Date=$("input#dateTmp"+id).val();
	var deal_money=$("input#dealMoneyTmp"+id).val();	
	var remark=$("input#remarkTmp"+id).val(); 


 
	var datajson = {'id':id , 'flag':flag, 'price':price, 'Count':Count, 'Date':Date , 'deal_money' :deal_money ,'remark' :remark } ;
	
	if(price =='' || Count=='' || Date =='' || deal_money == '') {alert('warn:输入数据不能为空！')}
	else
	$.ajax({
		url:'/AjaxBuy',
		data:datajson,
		type:'POST',
		datatype:'json',
		
	   success: function(data) {
		   //alert(gp_id);
		 //hide("slow");
		 if(data.des==true) {alert('交易成功'); $("input#priceTmp"+id).val('');}
			else  alert('warn:' + data.des);
	   }      		
	})   //ajax  end

}



function AjaxBuyQiquan(id,flag) {
	var price=$("input#priceTmp"+id).val();
	var Count=$("input#countTmp"+id).val();
	var Date=$("input#dateTmp"+id).val();
	//var deal_money=$("input#dealMoneyTmp"+id).val();	
	var remark=$("input#remarkTmp"+id).val(); 

	var deal_money=0;
	var commission = 7;


	if(flag==1)   deal_money = parseFloat(price * Count * 10000)  + parseFloat(commission * Count);
	 else if(flag == 2)  deal_money = [parseFloat(price) * parseFloat(Count) * 10000]  - parseFloat(commission * Count);
     
	// console.log(deal_money);
	deal_money = deal_money.toFixed(1);
	
	var datajson = {'id':id , 'flag':flag, 'price':price, 'Count':Count , 'Date':Date , 'deal_money' :deal_money ,'remark' :remark} ;
    console.log('参数:', datajson );

	if(price =='' || Count=='' || Date =='' || deal_money == '' ) {alert('warn:输入数据不能为空！')}
	else
	$.ajax({
		url:'/AjaxBuyQiquan',
		data:datajson,
		type:'POST',
		datatype:'json',
		
	   success: function(data) {
		   //alert(gp_id);
		 //hide("slow");
		 if(data.des==true) {alert('交易成功'); $("input#priceTmp"+id).val('');}
			else  alert('warn:' + data.des);
	   }      		
	})   //ajax  end

}




function updateSQLstring(sql)
{
	$.ajax({
			url:'/AjaxUpdateSQLstring',
			data:{sql:sql},
			type:'POST',
			datatype:'json',	
			
			 success : function(){
				 
			 }
		})   //ajax  end
	
}










/*
function AjaxCancelGupiao(gp_id)
{
	con=confirm("确定要注销吗?");
	//alert('ID:' + userid)
	if(con==true) {
		
		$.ajax({
			url:'/AjaxCancelGupiao',
			data:{id:gp_id},
			type:'POST',
			datatype:'json',
			
		   success: function(data) {
			   alert(gp_id);
			 var trtmp='tr#tr_gupiao' + gp_id;
			
			 //hide("slow");
			 if(data.des==true) { alert('注销成功');     $(trtmp).hide("slow");}
				else  alert('warn:' + data.des);
		   }      
			
		})   //ajax  end
	}
}

*/



