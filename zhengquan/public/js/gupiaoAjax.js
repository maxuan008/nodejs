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


function AjaxAddqiquan()
{
	var name=$('#input_qiquanname_tianjia').val();
	var code=$('#input_qiquancode_tianjia').val();
	var price=$('#input_qiquanprice_tianjia').val();
	var flag=$('select#qiquanflag').val();
	var flagname='';
	
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
						trtmp = trtmp +	"<td  ondblclick=\"showInput('td_input_price"+data.id+"','td_div_price"+data.id+"')\">   <div id='td_div_price"+data.id+"' >"+ price +"</div><input  id='td_input_price"+data.id+"'  type='text'  value='" + price + "'  style='display: none; width:100px;'  onblur=\"updateSQL(  'qiquan' , 'price' ,  'qq_id' , "+data.id+" ,'td_input_price"+data.id+"','td_div_price"+data.id+"', 1)\"   /></td>";
						trtmp= trtmp +  "<td> <a onclick=\'AjaxCancelQiquan("+data.id+")\'>注销</a></td> ";
						trtmp= trtmp +  "</tr>";
						//alert(trtmp);
						
						$("table#table_qiquan").append(trtmp); 
					 }
				 
					else  alert('warn:' + data.des);
			 }
			 
		 });  //ajax end
			
		}//if end

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
						tmp= tmp + "<td colspan='5' align='right'>  ";

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
	tmp= tmp + "   <td colspan='5' align='right'>  ";
	tmp= tmp + " <table id='tb_SheetTmp"+id+"' frame='below'  > ";
	tmp= tmp + " <tr><td colspan='5' align='right'> ";

	tmp= tmp + " <div> &nbsp;<br>  ";
	tmp= tmp + " <input id='nameTmp"+id+"' type='text'  style='width:185px;' placeholder='"+str+"' disabled   />&nbsp;&nbsp;&nbsp;";
	tmp= tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	tmp= tmp + " <input id='priceTmp"+id+"' type='text'  style='width:100px;' placeholder='交易价格' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	tmp= tmp + " <input id='countTmp"+id+"' type='text'  style='width:80px;' placeholder='数量' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	
    tmp= tmp + " <input id='dealMoneyTmp"+id+"' type='text'  style='width:100px;' placeholder='交割金额' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;";
	
	tmp= tmp + " <input id='dateTmp"+id+"' type='text'  style='width:100px;' placeholder='交易日期' required autofocus  />&nbsp;&nbsp;&nbsp; ";
	tmp= tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	
	tmp= tmp + "<a class='button button-primary button-rounded button-small' onclick='AjaxBuyQiquan("+id+",1)'>买入</a>";
	tmp= tmp + "&nbsp;&nbsp;&nbsp;";
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
	var deal_money=$("input#dealMoneyTmp"+id).val();	
	
	var datajson = {'id':id , 'flag':flag, 'price':price, 'Count':Count , 'Date':Date , 'deal_money' :deal_money} ;
	
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
 
 if(nowtimeStamp >= time1 && nowtimeStamp <= time2)  var int=self.setInterval("showprice()",15000);	

}


function showprice()
{
  var allcode=$("input#allcode").val();
  //alert(allcode);
  var tmp=allcode.split("|");
  //alert(tmp[0]); alert(tmp[1]);
  var idvalue=tmp[0].split(",");
  var codevalue=tmp[1].split(",");
  //alert(idvalue.length); alert(codevalue.length);
  var listid='';
  var sh_txt = "6,5,9," ;
  var sz_txt = "0,1,2,3,";
  
  var sst='' ,codetype='';
   var tmpstr='' , typeflag ='';
  
  if(codevalue.length > 1) {
	  
	  for (i in codevalue) {
		  //if(i==0) listid='list=';
		  			
		   sst = codevalue[i];
	       codetype = sst[0]  ;
			
		  var tmpcode='';

		  
		  //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
		  if(codevalue[i].length == 6  && codevalue[i] != 'null')  {
				if(sh_txt.indexOf(codetype) != -1  ) tmpcode= "sh" + codevalue[i]; 
				else if(sz_txt.indexOf(codetype) != -1 )  tmpcode= "sz" + codevalue[i];				  
			      }
		  if(codevalue[i].length == 5 && codevalue[i] != 'null' ) tmpcode= "hk" + codevalue[i];
	  
		  if(i==1)  listid='list='+tmpcode;
		  if(i>1)  listid= listid + "," +tmpcode;		  
	  }
	  
	  //添加港币汇率
	   listid= listid + ",fx_shkdcny";	
	  //alert(listid);
	  
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
					
					var hk_hlstr = eval('hq_str_fx_shkdcny');
					var hk_hlarr = hk_hlstr.split(',');
					
					var hk_exchange =  hk_hlarr[1];
					//console.log('港币汇率:' ,  hk_exchange);
					var 
					
				    sst = codevalue[x];
				    codetype = sst[0]  ;
 
				   //console.log('首位:', sst[0]);
				   tmpstr='' , typeflag ='';
				  if(codevalue[x].length == 6  && codevalue[x] != 'null')  {
					  
					  //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
				      if(sh_txt.indexOf(codetype) != -1  ) {tmpstr= "hq_str_sh" + codevalue[x];   typeflag='sh'; }
					  else if(sz_txt.indexOf(codetype) != -1 ) {tmpstr= "hq_str_sz" + codevalue[x];   typeflag='sz'; }					  
			      }

		          if(codevalue[x].length == 5 && codevalue[x] != 'null' )  {tmpstr= "hq_str_hk" + codevalue[x];  typeflag='hk';} 
				  
				  //console.log(tmpstr,eval(tmpstr)); 
			   
				  if(x > 0 && eval(tmpstr)!='' ) {
					  
					var tmp=eval(tmpstr);  
					//console.log(codevalue[x], tmp); 
					var ele=tmp.split(",");
					
					var prictmp=0,nametmp='' , gupiao_value=0, new_shiji_yingli=0;
					var count =$('#td_div_count'+idvalue[x]).text();
					var jiaoge_yingli =  $('#jiaoge'+idvalue[x]).text()  ;
					
					
			//var hk_shizhi_total=0, rmb_shizhi_total=0;
			//   var zhangmian_yingli_total=0, shiji_yingli_total=0;
					if(typeflag=='sh') {
							 prictmp=ele[3];
							 nametmp=ele[0];
							 gupiao_value = prictmp * count ; //股票市值
							 rmb_shizhi_total =parseFloat( rmb_shizhi_total) + parseFloat(gupiao_value);

							 					
					}
					
				   if(typeflag=='sz') {
							 prictmp=ele[3];
							 nametmp=ele[0];	
							 gupiao_value = prictmp * count ;
							 rmb_shizhi_total = parseFloat( rmb_shizhi_total )+  parseFloat(gupiao_value);
			
					}
					
					if(typeflag=='hk') {
							 prictmp=ele[6]; 
							 nametmp="HK" + ele[1];		
							 gupiao_value = prictmp * count * hk_exchange;
							 hk_shizhi_total =  parseFloat( hk_shizhi_total) +  parseFloat( gupiao_value);
	 			
					}		
					
					new_shiji_yingli = parseFloat(jiaoge_yingli)  + parseFloat(gupiao_value)  ;
					shiji_yingli_total = shiji_yingli_total + new_shiji_yingli;
					new_shiji_yingli=new_shiji_yingli.toFixed(1) + "(元)";
					
					//console.log('市值：',gupiao_value);
					//console.log('交割：',jiaoge_yingli);				
					//console.log(codevalue[x],prictmp, count,'实际盈利：',new_shiji_yingli);			

					
					 //更新实际盈利
					 $('#shiji'+idvalue[x]).text(new_shiji_yingli);
					 //alert(ele[0]);
					var divValuetmp=$('div#td_div_price'+idvalue[x]).text();
					
					
					if(divValuetmp != prictmp )  //如果股价发生变化
					  {
					    
					     //$('div#td_div_price'+idvalue[x]).addClass("FireBrick"); 
					     $('input#td_input_price'+idvalue[x]).val(prictmp);
						 $('div#td_div_price'+idvalue[x]).text(prictmp);
						 $('div#td_div_name'+idvalue[x]).text(nametmp);
					     
						 //更新盈利
						 var yinglitmp=$('div#td_div_yingli'+idvalue[x]).text();
						 //alert(yinglitmp);
						 
						 if(yinglitmp != '')	// alert(yinglitmp);
						 {
						  var count=$('div#td_div_count'+idvalue[x]).text();
						  var yinglitmp = parseFloat(yinglitmp) + (parseFloat(prictmp)-parseFloat(divValuetmp) ) * parseFloat(count);
						  
						  var yinglitmp =yinglitmp.toFixed(1);
						  var zhangmianTmp = yinglitmp;
						  if(typeflag == 'hk') {  //如果为港股
							  yinglitmp = yinglitmp + '(港币)' ;
							  zhangmianTmp =zhangmianTmp * hk_exchange;

						  } else {
							  yinglitmp = yinglitmp + '(元)' ;							  
							  
						  }
						  
						  zhangmian_yingli_total = parseFloat(zhangmian_yingli_total) + parseFloat(zhangmianTmp);
						  
						  //var a=1.27662727;
						  //alert(a.toFixed(3));
						  
						  
						  //alert(count );alert(yinglitmp );
						  $('div#td_div_yingli'+idvalue[x]).text(yinglitmp);	 
						 }
					
						 //更新股票数据库
						 var sqlstring="UPDATE `gupiao` SET `name`='" + nametmp + "' , `price`= '"+ prictmp +"' WHERE `status` ='1' and `code` ='"+codevalue[x] + "'";
					     updateSQLstring(sqlstring);
						 	
					  }
						
				   }	
				   
			   }  //for end
			   shiji_yingli_total = shiji_yingli_total.toFixed(1);   zhangmian_yingli_total = zhangmian_yingli_total.toFixed(1);
			   console.log('港股市值:', hk_shizhi_total, 'A股市值：', rmb_shizhi_total);
			   console.log('账面盈亏总额:' , zhangmian_yingli_total , "实际盈亏总额：" , shiji_yingli_total );
			   
			   $('#rmb_total_value').text(rmb_shizhi_total);$('#hk_total_value').text(hk_shizhi_total);
			   $('#zhangmian_total_yingli').text(zhangmian_yingli_total);$('#shiji_total_yingli').text(shiji_yingli_total + "(元)");			   

            } //success end
   
       }); //ajax end
  
  }
	
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



