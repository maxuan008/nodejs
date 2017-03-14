/**
 * Created by mx
 */
　　 String.prototype.trim=function(){
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}




(function() {

   var config = {

        actual:{flag:true, starttime:" 00:00:00" , endtime:" 23:59:00" ,  key:'price'  } ,   //实时更新股价的时间段
        pageLength:25,     //table页显示长度

        morning_starttime_tmp:" 09:29:00" ,   morning_endtime_tmp:" 09:35:00",                   //更新证券信息数据库，早上时间段
        afternoon_starttime_tmp:" 14:55:00" , afternoon_endtime_tmp:" 15:25:00"                  //更新证券信息数据库，晚上时间段
   };


   var dataSource_global = {};


    var table5 = {
            //addzhengquan:  addzhengquan,      //添加证券
            grid:grid          ,               //显示grid
            showprice:showprice ,               //更新证券价格
            empty:empty                          //清空数据

        };
      
    //清空数据，用于子功能被点击时，初始化的工作。 
    function empty() {
        dataSource_global ={};

    }

    //判断当前是否属于股价实时更新的时间段
    function isTimeIn(){
         var result = false;
         var  starttime = config.actual.starttime , endtime=config.actual.endtime ;
         if(config.actual.flag && starttime && endtime ) {
             //console.log('ttttttttt');
              var oDate = new Date();
              var oMonth = oDate.getMonth() +1;
              var oDay = oDate.getFullYear() + "-" + oMonth + "-" + oDate.getDate();
              var headTime = oDay + starttime;
              var footTime = oDay + endtime;
            
              var time1 = Date.parse(headTime);
              var time2 = Date.parse(footTime);
              var nowtimeStamp = Date.parse(new Date());

             // console.log(time1, nowtimeStamp, time2 );

               if(nowtimeStamp >= time1 && nowtimeStamp <= time2)   result = true;
               

         } //if end

         return result;
    }





    //type：1不带分页， 2，带分页.  id:为HTML元素的ID， datas为数据  3.tag:为此table的标识
    function grid(id,dataSource, tag) {
        
        dataSource_global[tag]= dataSource;
        dataSource_global[tag].table_datas = "table_datas";
        if(!dataSource.blanceinfo) {
           dataSource_global[tag].blanceinfo = {blanceinfoFlag : false , blanceinfoKey : 'null'};;
        }

         if(!dataSource.dealList)   dataSource_global[tag].dealList = false;
         if(!dataSource.isdataTable)  dataSource_global[tag].isdataTable = false;
         if(!dataSource.needHeader)  dataSource_global[tag].needHeader = false;
         if(!dataSource.needshowpric)  dataSource_global[tag].needshowpric = false;
         if(!dataSource.keyArrow)  dataSource_global[tag].keyArrow = false;
         if(!dataSource.needupdateToDB)  dataSource_global[tag].needupdateToDB = false;
         
         //if(!dataSource.etfautofindleak)  dataSource_global[tag].etfautofindleak = false;
         //if(!dataSource.leakTag)  dataSource_global[tag].leakTag = false;
         

         
         
        //console.log("datasouce:",dataSource_global);



        var placeholder = dataSource_global[tag].placeholder;
        var columns = dataSource_global[tag].columns;
        var datas = dataSource_global[tag].data;
        var actual = dataSource_global[tag].actual;
        var cancel = dataSource_global[tag].cancel;
        var dealList = dataSource_global[tag].dealList;
        var zhengquanAdd = dataSource.zhengquanAdd;

        var blanceinfoFlag = dataSource_global[tag].blanceinfo.flag;
        var blanceinfoKey= dataSource_global[tag].blanceinfo.key;


        var chg = dataSource_global[tag].chg;
        var zhengquanName = dataSource_global[tag].zhengquanName;
        var pkID = dataSource_global[tag].pkID;
        var type =dataSource_global[tag].type;
        var key= dataSource_global[tag].key;     //要更新的字;
        var table_datas = dataSource_global[tag].table_datas;

        var isdataTable = dataSource_global[tag].isdataTable;
        var needHeader  = dataSource_global[tag].needHeader;
        var needshowpric = dataSource_global[tag].needshowpric;
        var keyArrow = dataSource_global[tag].keyArrow;
        var needupdateToDB = dataSource_global[tag].needupdateToDB;


        dataSource_global[tag].dealTdLength = columns.length + 1;

        
        var htmlstr = '';

        
        initTimeInfo();  //初始化证券在数据库里的更新时段



        if(type == 1 ) {

        }


       //带分页的table
       if(type == 2 ) {  
        var uuID = uuid(8,16);
        dataSource_global[tag].uuID = uuID;

            //****资产信息表  fa-hand-o-right
           if(blanceinfoFlag) {
                    htmlstr = htmlstr + 
                    " <div class='col-sm-12'> " +
                    "     <div class='panel'> " +
                    "         <div class='panel-content' > " +
                    "             <div id='blanceInfo_" + uuID + "' style='font-size:14px;' class='alert alert-warning m-none'> " +
                    "                 <i  class='fa fa-hand-o-right'></i> " +
                    "             </div> " +
                    "         </div> " +
                    "     </div> " +
                    " </div> " ;
           }



              htmlstr = htmlstr + 
                    "<div class='col-sm-12'>" +
                    "   <div class='panel'>" +
                    "       <div class='panel-content'>" ;
             
              //添加增加证券功能
              if(zhengquanAdd) 
              {
                  htmlstr = htmlstr +
                    "            <table id='table_add_" + uuID + "' class='table table-striped table-hover'>" +
                    "                <thead>" +
                    "                        <tr>" +    //onclick='addZhengQuan(this)'
                    "                            <th  style='width:130px;'><input   id='code_" + uuID + "'  type='text'  style='width:120px;'    placeholder='代码' required autofocus /></th>" +
                    "                            <th><button type='button' class='btn btn-success btn-xs' uuid='" + uuID + "' id='add_" + uuID + "' style='width:60px;'  > 添加 </button></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                        </tr>" +
                    "                    </thead>" +
                    "            </table>" ;
              }


              htmlstr = htmlstr + 
                    "            <table id='" + table_datas + "_" + uuID + "' class='data-table"+ "_" + uuID   + " table table-striped table-hover responsive nowrap'  cellspacing='0' width='100%'>" ;

             //1.***生成table, thead. 和 <tbody> 框架.    2.***逐条生成tr

                //***********1. 生成  thead  
                if(needHeader){
                    htmlstr = htmlstr +   "<thead>  <tr> ";
                    for(var i=0;i<columns.length; i++  ){ 
                        var title = '';
                        if(columns[i].title != undefined) title = columns[i].title ;
                        htmlstr = htmlstr +   "<th>" + title + "</th> ";
                    } //fro end 
                    if(chg)      htmlstr = htmlstr +   "<th>涨跌幅</th> ";
                    if(cancel || dealList )  htmlstr = htmlstr +   "<th>操作</th> ";

                   htmlstr = htmlstr + "</tr></thead>"; 
                }
                
                htmlstr = htmlstr +   " <tbody id='tbody_" + uuID + "' ></tbody> </table>  </div> </div> </div>  ";

                $("#"+id).append(htmlstr);   


            
            //**********2.逐条生成tr
            var  trstr = '';
            for(var j=0; j<datas.length; j++) { 
                appendTr(datas[j] , tag );

            } //for end 
  
                    
           //*******调用模板的JS
           var pageLength = dataSource_global[tag].pageLength;
           if(pageLength == undefined) pageLength = config.pageLength ;
           if(isdataTable)  $('.data-table_' + uuID).DataTable({pageLength:pageLength});     
           
           //*******绑定add按钮事件
            addZhengQuanEvent(tag);

           //return 1;
     
        }   // if(type == 2 )  end    
   

        
    }





      //生成tr  
      function appendTr(data,tag) {

        var uuID =   dataSource_global[tag].uuID;       
        var placeholder = dataSource_global[tag].placeholder;
        var columns = dataSource_global[tag].columns;
        var datas = dataSource_global[tag].data;
        var actual = dataSource_global[tag].actual;
        var cancel = dataSource_global[tag].cancel;
        var chg = dataSource_global[tag].chg;
        var zhengquanName = dataSource_global[tag].zhengquanName;
        var pkID = dataSource_global[tag].pkID;
        var type =dataSource_global[tag].type;
        var key= dataSource_global[tag].key;     //要更新的字;
        var table_datas = dataSource_global[tag].table_datas;

        var blanceinfoFlag = dataSource_global[tag].blanceinfo.flag;
        var blanceinfoKey= dataSource_global[tag].blanceinfo.key;

        var dealList =  dataSource_global[tag].dealList;

        var keyArrow = dataSource_global[tag].keyArrow;

              var zq_id = data[pkID];  //证券的主键ID
                //if(zhengquanName == 'gupiao') zq_id = data.gp_id;   
                // if(zhengquanName == 'qiquan') zq_id = data.qq_id;   


                 trstr =   "<tr id='tr_" + zq_id + "_" + uuID + "'>   ";
                 
                for(var k=0;k<columns.length; k++ ) {   //逐行加入td
                    
                    var field = columns[k].field;
                    var idstr = "td_"+ field + "_" + zq_id + "_" +  uuID ; 
                   
                    if(field == key && keyArrow )  {
                        trstr = trstr +   "<td  id=''>  " + 
                          "<div style = 'width:10px;float:left;' ><label hidden id='jiantou_price_down" + zq_id + "_" + uuID + "' style='margin:0;font-weight:bold;font-size:17px; float: left; color: green;'>↓</label></div>   "  +
                         "<div style = 'width:10px;float:left;' ><label hidden id='jiantou_price_up" + zq_id + "_" + uuID + "'   style='margin:0;font-weight:bold;font-size:17px; float: left; color: red;'>↑</label> </div>  "  +
                         "<div id='" + idstr + "' >  " ;   
                    } else trstr = trstr +   "<td id='" + idstr + "'>   ";

                    var value = '';
                    if(field != undefined)   value = data[field];
                    if(value == undefined ) value ='';

                    trstr = trstr +   value;

                    if(field == key )  trstr = trstr +  "</div>  ";
                    trstr = trstr +   "</td>   ";
                } //fro end 


                if(chg ) { //加入涨跌幅，
                     trstr = trstr +   "<th> " + 
                         "<div style = 'width:10px;float:left;' ><label hidden id='jiantou_down" + zq_id + "_" + uuID + "' style='margin:0;font-weight:bold;font-size:17px; float: left; color: green;'>↓</label></div>   "  +
                         "<div style = 'width:10px;float:left;' ><label hidden id='jiantou_up" + zq_id + "_" + uuID + "'   style='margin:0;font-weight:bold;font-size:17px; float: left; color: red;'>↑</label> </div>  "  +
                         "<div style='font-weight:bold; font-size:17px;float: left; ' id='chg_" + zq_id + "_" + uuID + "'>0.00%</div>  " +
                         "</th>   ";
                } 


                if(dealList ) { //加入明细操作.
                     trstr = trstr +   "<th><button id='dealList_" + zq_id + "_" + uuID + "' type='button' class='btn btn-success btn-xs ' >明细</button>" + 
                          "<button style='display:none;' id='dealList_return_" + zq_id + "_" + uuID + "' type='button' class='btn btn-primary btn-xs ' >返回</button></th> ";
                } 

                if(cancel ) { //加入注销操作.
                     trstr = trstr +   "<th><button id='del_" + zq_id + "_" + uuID + "' type='button' class='btn btn-warning btn-xs ' >注销</button></th> ";
                } 


                

                trstr = trstr +   "</tr>   ";

                $("#tbody_" + uuID ).prepend(trstr); 
     
                if(cancel ) { //绑定注销事件
                     delZhengQuanEvent(zq_id,tag);
                } 

                if(dealList ) { //绑定明细事件
                     dealListZhengQuanEvent(zq_id,tag);
                     dealReturnEvent(zq_id,tag);
                } 

      } //function end








        //*******绑定add按钮事件
        function addZhengQuanEvent(tag) {
                var uuID =   dataSource_global[tag].uuID;       
                var placeholder = dataSource_global[tag].placeholder;
                var columns = dataSource_global[tag].columns;
                var datas = dataSource_global[tag].data;
                var actual = dataSource_global[tag].actual;
                var cancel = dataSource_global[tag].cancel;
                var chg = dataSource_global[tag].chg;
                var zhengquanName = dataSource_global[tag].zhengquanName;
                var pkID = dataSource_global[tag].pkID;
                var type =dataSource_global[tag].type;
                var key= dataSource_global[tag].key;     //要更新的字;
                var table_datas = dataSource_global[tag].table_datas;

                $("#add_" +uuID).click(function(){
                    //zhengquanName
                    var codevalue =  $("#code_" + uuID ).val().trim();
                    if(codevalue == '' )  { $("#code_" + uuID , this.el).focus();  return;  }
                    //console.log('添加按钮被点击，uuid：',uuID);
                    var data = {zhengquanname:zhengquanName , codevalue: codevalue};

                    $.post('/app/zhengquan/addzhengquan', data,function(datasBack){ 
                        
                        var code = datasBack.code;
                        if(code == 205)  {alert('检测到未登陆.'); console.log('检测到未登陆.');  }  
                        if(code == 204)  {alert('错误:' + datasBack.err); console.log('错误:addzhengquan -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                            //console.log('addzhengquan',datasBack);
                            var insertID =datasBack.datas.id;

                            var doc = {code:codevalue}; doc[pkID] = insertID;
           
                            appendTr(doc ,tag)
                            $("#code_" + uuID ).val("");
                        }

                    }); //$.post end

                }); //$("#add_" +uuID).click end

        }






        //*******绑定明细按钮事件,  //证券的主键ID
        function dealListZhengQuanEvent( zq_id ,tag){

        var uuID =   dataSource_global[tag].uuID;       
        var placeholder = dataSource_global[tag].placeholder;
        var columns = dataSource_global[tag].columns;
        var datas = dataSource_global[tag].data;
        var actual = dataSource_global[tag].actual;
        var cancel = dataSource_global[tag].cancel;
        var chg = dataSource_global[tag].chg;
        var zhengquanName = dataSource_global[tag].zhengquanName;
        var pkID = dataSource_global[tag].pkID;
        var type =dataSource_global[tag].type;
        var key= dataSource_global[tag].key;     //要更新的字;
        var table_datas = dataSource_global[tag].table_datas;

                 
                $("#dealList_" + zq_id + "_" + uuID).click(function(){
                    //console.log('注销按钮被点击,uuid：',uuID);
                    var data = {zhengquanname:zhengquanName , id: zq_id};

                    $.post('/app/zhengquan/deallistzhengquan', data,function(datasBack){ 
                        
                        var code = datasBack.code;
                        if(code == 205)  {alert('检测到未登陆.'); console.log('检测到未登陆.');  }  
                        if(code == 204)  {alert('错误:' + datasBack.err); console.log('错误:deallistzhengquan -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                           //console.log('delzhengquan',datasBack)
                           //$("#tr_" +  zq_id + "_" + uuID).remove();
                           var results = datasBack.datas;

                           //1.获取当前Tr的ID，  2.生成交易列表table 3.并加载到后面。
                           
                            console.log(results);
                           //2.生成交易列表table
                           var reu ='';
                           for(var i=0;i<results.length;i++) {  
                             var value = results[i];
                             
                             if (value.dealdate == null)  var datetmp='null';
		    	             else  {var datetmp=  moment(value.dealdate).format('YYYY-MM-DD'); } // moment(value.dealdate).format('YYYY-MM-DD'); 

                             var edu = value.deal_money; 

                            if(value.flag==1)  var tmp1='买入';
                            else if(value.flag==2) var tmp1='卖出';
                            
                            reu = reu +"<tr  > "+
                                            "<td style='width:110px;' > " + datetmp + " </td> "+
                                            "<td style='width:100px;' > " + tmp1 + " </td> "+
                                             "<td style='width:100px;' > " + value.price + " </td> "+
                                            "<td style='width:100px;'> " +  value.count  + " </td> "+
                                            "<td style='width:150px;'>  " + edu  + " </td> "+
                                       "</tr>";

                           } //for end
                             
                            var dealTdLength =  dataSource_global[tag].dealTdLength;
                            var tmp = '';
                            tmp= tmp + "<tr  id='tr_deallist_"+zq_id + "_" + uuID +"'    >  " +
                                             "<td id='td_deallist_"+zq_id + "_" + uuID +"' colspan='" + dealTdLength + "' align='right'>  " +
                                             "<table id='tb_SheetTmp_" + zq_id + "_" + uuID +"' style='background-color:#D2B48C;'   > " +
                                             "<thead><tr  > " +
                                             "<th style='width:110px;' >日期</th> " +
                                             "<th style='width:100px;' >买入/卖出</th> " +
                                             "<th style='width:100px;' >成交价</th> " +
                                             "<th style='width:100px;' >数量</th> " +
                                             "<th style='width:150px;' >交易金额</th> " +
                                             "</tr></thead> ";
                            tmp = tmp +reu;  
                            tmp= tmp + " </table></td> </tr>";
 
                            //3.并加载到tr后面。 
                            var trID = "tr" + "_" + zq_id + "_" + uuID ;
                            //console.log(trID);
                            //console.log(tmp);

                            $("#tr_deallist_"+ zq_id + "_" + uuID ).remove();
                            $("#" + trID).after(tmp);
                            $("#dealList_"+ zq_id + "_" + uuID ).hide();
                            $("#dealList_return_"+ zq_id + "_" + uuID ).show();
                            

                        }

                    }); //$.post end

                }); //$(#del_" + zq_id + "_" + uuID).click end

        }    

        //***格式时间： 年-月-日


        //****绑定返回按钮事件  : 1.去除交易列表。   2.隐藏返回按钮 3. 显示明细按钮
        function  dealReturnEvent(zq_id ,tag) {
            var uuID =   dataSource_global[tag].uuID; 
           $("#dealList_return_" + zq_id + "_" + uuID).click(function(){
                
                $("#tr_deallist_"+ zq_id + "_" + uuID ).remove();
                
                $("#dealList_return_"+ zq_id + "_" + uuID ).hide();
                $("#dealList_"+ zq_id + "_" + uuID ).show();

           });
            

            
        }





        //*******绑定注销按钮事件,  //证券的主键ID
        function delZhengQuanEvent( zq_id ,tag){

        var uuID =   dataSource_global[tag].uuID;       
        var placeholder = dataSource_global[tag].placeholder;
        var columns = dataSource_global[tag].columns;
        var datas = dataSource_global[tag].data;
        var actual = dataSource_global[tag].actual;
        var cancel = dataSource_global[tag].cancel;
        var chg = dataSource_global[tag].chg;
        var zhengquanName = dataSource_global[tag].zhengquanName;
        var pkID = dataSource_global[tag].pkID;
        var type =dataSource_global[tag].type;
        var key= dataSource_global[tag].key;     //要更新的字;
        var table_datas = dataSource_global[tag].table_datas;

                 
                $("#del_" + zq_id + "_" + uuID).click(function(){
                    //console.log('注销按钮被点击,uuid：',uuID);
                    var data = {zhengquanname:zhengquanName , id: zq_id};

                    $.post('/app/zhengquan/delzhengquan', data,function(datasBack){ 
                        
                        var code = datasBack.code;
                        if(code == 205)  {alert('检测到未登陆.'); console.log('检测到未登陆.');  }  
                        if(code == 204)  {alert('错误:' + datasBack.err); console.log('错误:addzhengquan -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                           //console.log('delzhengquan',datasBack)
                           $("#tr_" +  zq_id + "_" + uuID).remove();

                        }

                    }); //$.post end

                }); //$(#del_" + zq_id + "_" + uuID).click end

        }      



        //初始化证券在数据库里的更新时段
        function  initTimeInfo(){
                config.morning_starttime= config.morning_starttime_tmp ,   config.morning_endtime=config.morning_endtime_tmp;
                config.afternoon_starttime=config.afternoon_starttime_tmp , config.afternoon_endtime=config.afternoon_endtime_tmp;

                var oDate = new Date();
                var oMonth = oDate.getMonth() +1;
                var oDay = oDate.getFullYear() + "-" + oMonth + "-" + oDate.getDate();
                
                config.morning_starttime = oDay + config.morning_starttime;
                config.morning_endtime = oDay + config.morning_endtime;
                config.afternoon_starttime = oDay + config.afternoon_starttime;
                config.afternoon_endtime = oDay + config.afternoon_endtime;

                config.morning_starttime = Date.parse(config.morning_starttime);
                config.morning_endtime = Date.parse(config.morning_endtime);
                config.afternoon_starttime = Date.parse(config.afternoon_starttime );
                config.afternoon_endtime = Date.parse(config.afternoon_endtime );          
        }


























   //开始遍历页面的所有table,并更更新股价信息    
    function showprice()
    {   
        if(isTimeIn()) {   //如果处于更新时间段， 则实时更新证券价格
            //***循环table */
            for(var tag in  dataSource_global ) {
                //console.log("++++++++++++++++开始执行table：",tag , dataSource_global[tag]);
              if( dataSource_global[tag].needshowpric)   doIt(tag);
            } //for end 

        }


    }  


    function  doIt(tag) {
            var uuID =   dataSource_global[tag].uuID;       
            var placeholder = dataSource_global[tag].placeholder;
            var columns = dataSource_global[tag].columns;
            var datas = dataSource_global[tag].data;
            var actual = dataSource_global[tag].actual;
            var cancel = dataSource_global[tag].cancel;
            var chg = dataSource_global[tag].chg;
            var zhengquanName = dataSource_global[tag].zhengquanName;
            var pkID = dataSource_global[tag].pkID;
            var type =dataSource_global[tag].type;
            var key= dataSource_global[tag].key;     //要更新的字;
            var table_datas = dataSource_global[tag].table_datas;



        //console.log('实时股价更新:' +  key + table_datas);
        var id= '#tbody_' + uuID;
       // var trs = document.getElementById(id).childNodes;
       var trs =$(id).children("tr");
       //console.log('Tr长度，',trs.length);
       
      var  zhengquans = [] , codes=[] , code_ids={};
       for(var i=0;i<trs.length; i++) {
           //
           //console.log(trs[i]);
           var ele_tr = trs[i];
           var trid = ele_tr.getAttribute('id');
           // console.log("==========idstr:",trid);

           if(trid == undefined || trid.indexOf('deallist') != -1) continue;  //如果tr为明细，则直接进入下一次循环


            var tds = $("#"+trid).children('td');

            //console.log(tds.length);
            for(var j=0; j< tds.length; j++ ) {
                var ele_td = tds[j];
                var idstr = ele_td.getAttribute('id');

                var arrtmp = idstr.split('_');
                if(arrtmp[1] == 'code') {  //如果td为Code
                    var codevalue = $("#"+idstr).text().trim();
                    codes[codes.length] =codevalue ;
                    zhengquans[zhengquans.length] = {code:codevalue, id:arrtmp[2]};
                    code_ids[codevalue] = arrtmp[2];
                    break;
                } //if end
            } //for end



       } //for end
     
      dataSource_global[tag].zhengquans = zhengquans , dataSource_global[tag].codes=codes , dataSource_global[tag].code_ids=code_ids;



      //获取table列表中证券的信息集合,以便获取任意的证券的实时股价信息。
      var data = {type:zhengquanName ,  uuID:uuID, key:key, tag:tag};
       
       var  zhengquanObj = new zhengquan5(data , codes , code_ids );

        //**1.制作存储evalst */
        
        var listid = zhengquanObj.setEvalStr();
        
    

	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",
	
            success : function(){
                //console.log('-----------网络股价信息获取成功。');
               
                var evalStr = zhengquanObj.getevalStr();
                var evalstrArr = {};
                if(zhengquanName == 'gupiao')  evalstrArr={fx_shkdcny : eval(evalStr['fx_shkdcny']).split(',')};
                if(zhengquanName == 'qiquan' || zhengquanName == 'refer_qiquan' )  evalstrArr={"510050" : eval(evalStr["510050"]).split(',')};

                for(var i=0;i<codes.length; i++ ) {
                    var code = codes[i];
                     evalstrArr[code] = eval(evalStr[code]).split(',');
                } //for end

                //console.log("********************" + zhengquanName + "信息集合:",evalstrArr);
                updateZhengquanPrice(zhengquanObj ,tag ,evalstrArr);   //开始更新证券价格
                
  
            } //success end

      })  //$.ajax end 



    }






    //开始更新页面指定table的证券价格
    function updateZhengquanPrice(zhengquanObj , tag , evalstrArr_tmp) {
            //console.log('开始更新网页');
            var blanceinfoFlag = dataSource_global[tag].blanceinfo.flag;
            var blanceinfoKey= dataSource_global[tag].blanceinfo.key;

            var uuID =   dataSource_global[tag].uuID; 
            var codes = dataSource_global[tag].codes ;
            
            //var evalstrArr = dataSource_global[tag].evalstrArr ;
            //if(evalstrArr) //当数据返回后，开始执行

            //*** *总市值和总盈利更新
            var shizhi_total = 0, yingli_total = 0 ;
            

            var targetTag = dataSource_global[tag].targetTag ;
            var leakTag = dataSource_global[tag].leakTag ;
            var etfautofindleak = dataSource_global[tag].etfautofindleak ;

            //***先清空漏洞列表 */
            if(etfautofindleak && leakTag) {
                var leakTagUUID= dataSource_global[leakTag].uuID;
                var tbodyid_leak =   "tbody_" + leakTagUUID;
                $("#"+tbodyid_leak).empty();
            }


            for(var i=0;i<codes.length; i++ ) {          
              var  infoTmp = changePrice_html(zhengquanObj ,codes[i],tag,evalstrArr_tmp)  ; //更新网页上的证券价格 
                   

              shizhi_total = shizhi_total + infoTmp.shizhi;
              yingli_total = yingli_total + infoTmp.shiji_yingli;   
            } //for end

        if(blanceinfoFlag ) {  //如果显示资产表:总市值 ， 总盈利，

            //****更新资产表:总市值 ， 总盈利    id='blanceInfo_" + uuID + "'
            shizhi_total = shizhi_total.toFixed(0) , yingli_total = yingli_total.toFixed(2) ; 
            var sheetstr = "总市值：" + shizhi_total +　" ， 总盈利： " + yingli_total + " ";
            
            var htmlstr = " <i  class='fa fa-hand-o-right'></i> " + sheetstr;
            $("#blanceInfo_" + uuID).html(htmlstr);        
            
        }  //if(blanceinfoFlag ) end


        //*******调用模板的JS
        var isdataTable =  dataSource_global[tag].isdataTable; 
        var pageLength = dataSource_global[tag].pageLength;
        if(pageLength == undefined) pageLength = config.pageLength ;
        if(isdataTable)  $('.data-table_' + uuID).DataTable({pageLength:pageLength});  




    }



    //智能分析50etf期权漏洞 
    function autoFindLeak_50etfqiquan(zhengquanObj ,referInfo,etfInfo,tag) {
        console.log("开始智能分析====");
        var targetTag = dataSource_global[tag].targetTag ;
        var leakTag = dataSource_global[tag].leakTag ;
        var etfautofindleak = dataSource_global[tag].etfautofindleak ;

        var uuID = dataSource_global[tag].uuID; 
        var codes = dataSource_global[tag].codes ;
        var code_ids = dataSource_global[tag].code_ids ;

        var  qiquan_fee = dataSource_global[tag].qiquan_fee ;

        if(!qiquan_fee) qiquan_fee = 0;
         

        if(!targetTag || !leakTag || !etfautofindleak)   return ; 
        //console.log(targetTag , leakTag ,etfautofindleak,'参数正确');


        //***获取对比物的新价格和名称 */
        var newPrice = referInfo.newPrice ;
        var newName = referInfo.newName ;
        
        //分析对比物的漏洞价值
        var referqiquan_analys = etfAnalys(newName , newPrice , etfInfo);
        //更新对比物的漏洞价值
        var leakvalueFiled = dataSource_global[tag].leakvalueFiled;
        var leakID ="td_" + leakvalueFiled + "_" + code_ids[referInfo.code]  + "_" + uuID ;
        if(leakvalueFiled)  $("#" + leakID ).text( referqiquan_analys.leakVaue );

        if(referqiquan_analys.leakVaue  >= 0) $("#" + leakID ).css({"font-weight":"bold","font-size":"14px","color":"red"});
        if(referqiquan_analys.leakVaue  < 0)  $("#" + leakID ).css({"font-weight":"bold","font-size":"14px","color":"green"});


        //循环与已持有etf期权进行比对，是否存在漏洞
        var leakTagUUID= dataSource_global[leakTag].uuID;
        var tbodyid_leak =   "tbody_" + leakTagUUID;

        var myqiquans = dataSource_global[targetTag].data; 
        for(var i=0; i<myqiquans.length; i++ ){
            var code = myqiquans[i].code;
            var myQiquanInfo = getTd_zhengquanInfo(code,targetTag) 
            var myqiquan_analys = etfAnalys(myQiquanInfo.oldName , myQiquanInfo.oldPrice , etfInfo);
            var leakdrop =  referqiquan_analys.leakVaue -   myqiquan_analys.leakVaue - qiquan_fee ;

            console.log(i + "：=====开始分析期权：我的期权：" +  myQiquanInfo.oldName +  " ,对比期权：" + newName);
            console.log("50etf：" , etfInfo );
            console.log("我的期权漏洞价值：" , myqiquan_analys );
            console.log("对比物期权漏洞价值：" ,  referqiquan_analys );
            console.log("漏洞价值查：" ,leakdrop);
            var myqiquan_month = changeMonthToNum(myqiquan_analys.month);
            var referqiquan_month = changeMonthToNum(referqiquan_analys.month);

            var monthdrop = myqiquan_month - referqiquan_month;

            //显示到漏洞
            var background = -1;  //// #DCDCDC 灰色   #D19275 红色    #FFFFFF
            //1.同一月份的， 漏洞查10-20,为白色，>20 为红色

            if(monthdrop == 1) {  //同一月份的
                if(leakdrop>10 && leakdrop<20) background = '#FFFFFF';  //显示白色     
                if(leakdrop>=20 ) background = '#D19275';  //显示红色
            }

            //2.持仓期权月份大于对比物的：大于1个月的， 漏洞差>100元时显示红色，50--100元以内时显示白色，0--50之间灰色；
            //                          大于1个月以上的上的，漏洞差>200元时显示红色.100--200元以内的显示白色，0--100灰色；
            
            if(monthdrop == 1) {  //大于1个月的
                if(leakdrop>=100 ) background = '#D19275';   //显示红色
                if(leakdrop>=50 && leakdrop<100 )  background = '#FFFFFF';  //显示白色
                if(leakdrop>0 && leakdrop<50 )  background = '#DCDCDC';  //灰色
            }

             if(monthdrop > 1) { //大于1个月以上的上的
                if(leakdrop>=200 )  background = '#D19275';  //显示红色
                if(leakdrop>=100 && leakdrop<200 )  background = '#FFFFFF';   //显示白色
                if(leakdrop>0 && leakdrop<100 )  background = '#DCDCDC';  //灰色
            }           

            //3.持仓期权月份小于等于对比物的：小于1个月的，-30<漏洞差<=-15元显示灰色，-15----5以内的显示白色,-5<漏洞差显示红色；
            //                         大于1个月以上的，-40<漏洞差<=-20元显示灰色，-20---10以内的显示白色, -10<漏洞差显示红色；

            if(monthdrop == -1) {  //大于1个月的
                if(leakdrop>=-5 )  background = '#D19275';  //显示红色
                if(leakdrop>=-15 && leakdrop<-5 ) background = '#FFFFFF';   //显示白色
                if(leakdrop>=-30 && leakdrop<-15 ) background = '#DCDCDC';     //灰色
            }


             if(monthdrop <  -1) { //大于1个月以上的上的
                if(leakdrop>=-10 ) background = '#D19275';    //显示红色
                if(leakdrop>=-20 && leakdrop<-10 ) background = '#FFFFFF';    //显示白色
                if(leakdrop>=-40 && leakdrop<-20 ) background = '#DCDCDC';   //灰色
            }   


           if(background != -1) {
                //#DCDCDC灰色   #D19275红色   //"font-weight":"bold","font-size":"12px","color":"red"
                var html_tr="<tr style='background:" + background + ";' id=''>" +   
                            "    <td> <div style='float:left;'>" + myQiquanInfo.oldName + "[" + myqiquan_analys.leakVaue + "]</div> <br> <div ></div></td>" +
                            "    <td>===></td>" +
                            "    <td>" + newName + "[" + referqiquan_analys.leakVaue +"]</td>" +
                            "    <td><div style='float:left;font-weight:bold; font-size:16px; color:red; ' >" + leakdrop + "</div></td>" +
                            "</tr>";
                
                $("#"+tbodyid_leak).append(html_tr);
           } 


        }


    }

  //将月份转化当前年份的月，例如果为小于当月，表示为明年的月份，分月+12  
  function  changeMonthToNum(month){
    var result = month;
    var d = new Date();
    var now_month = d.getMonth() - 0 + 1;
    if(month < now_month) result = month + 12;

    return result;
  }


  //分析etf期权的漏洞价值{
  function etfAnalys(name , price , etfInfo){
        var qiquaninfo = {}; 
        var etfprice = etfInfo.newPrice;


        qiquaninfo =  getQiquanInfo_name(name);
        //console.log("etfprice:", etfprice , qiquaninfo);   
        qiquaninfo.name = name  ,  qiquaninfo.price = price;
        var leakVaue = 0;
        
        if(qiquaninfo.type == '购') { //如果为认购期权
            var pt =  qiquaninfo.pt;
            leakVaue = (etfprice*10000 - 0 -  10*pt  ) - price*10000 ;
        }
        
        if(qiquaninfo.type == '沽') { //如果认沽期权
            var pt =  qiquaninfo.pt;
            leakVaue = ( 10*pt - etfprice*10000  - 0    ) - price*10000 ;
        }
        leakVaue = leakVaue.toFixed(0);

        //console.log("****TTTT**:证券名称：" + name +  ",点位：" + pt + ",价格：" + price + " ，etf价格" + etfprice + " ，漏洞价值" + leakVaue );
        qiquaninfo.leakVaue = leakVaue;
        //console.log(name, qiquaninfo);

        return qiquaninfo;

  }
  
  //通过名称获取期权的相关信息
  function getQiquanInfo_name(qiquanname){
        var name =  qiquanname;
        //去除50etf分后出现的A
        //console.log('NNNNN:',qiquanname);
        if(name.indexOf('A') != -1)  name =name.substring(0,name.indexOf('A'));
        //console.log('NNNNN:',name);
        var pt , month ,type ;
        var result = {pt:0,month:0 ,type:''};  //pt:合约点数 ,month:合约月份
        if(name.length == 13  ) { pt= name.substring(9);  month =  name[6] + name[7]; } 
        if(name.length == 12  ) { pt= name.substring(8); month =  name[6]; }

        if(name.indexOf('购')!=-1)  {  type='购';  }
        if(name.indexOf('沽')!=-1)  {  type='沽'; }  

        result.pt = pt,  result.month = month,  result.type = type;
        return result;
  }



   //更新网页上的证券价格
   function  changePrice_html(zhengquanObj ,code ,tag ,evalstrArr_tmp) {
            
            var uuID = dataSource_global[tag].uuID; 
            var codes = dataSource_global[tag].codes ;
            var code_ids = dataSource_global[tag].code_ids ;
            //var evalstrArr = dataSource_global[tag].evalstrArr ;
            var key= dataSource_global[tag].key;     //要更新的字;
            var zhengquanName = dataSource_global[tag].zhengquanName;
            var blanceinfoFlag = dataSource_global[tag].blanceinfo.flag;
            var blanceinfoKey= dataSource_global[tag].blanceinfo.key;
            var chg = dataSource_global[tag].chg;
 

        var netInfo = zhengquanObj.getNetInfo(code,evalstrArr_tmp);
        var newPrice = netInfo.newPrice ;
        var newName = netInfo.newName ;
        var yesterPrice = netInfo.yesterPrice;

        //如果为期权对比物， 新价格为：最新的卖一价格
        if(zhengquanName == 'refer_qiquan' ) newPrice = netInfo.sale1;


        var zhengquanInfo = getTd_zhengquanInfo(code,tag);
        var oldPrice = zhengquanInfo.oldPrice;
        var oldName = zhengquanInfo.oldName;

        
          //console.log('股票价格：' + newName + "原价：" + oldPrice + ",新价：" + newPrice + "  昨天收盘价："  + yesterPrice);

        var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
        var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值

         var multiple = 1;
         if(zhengquanName == 'qiquan') multiple = 10000;
        //console.log("+++++++:",blanceinfoFlag , blanceinfoKey);


         //**如果为50etf期权智能决策 */
         //****检测此对比物的漏洞  //开始智能分析漏洞 
         var etfautofindleak = dataSource_global[tag].etfautofindleak ;
         if(etfautofindleak) {
             var etfInfo = zhengquanObj.getNetInfo('510050',evalstrArr_tmp);
              autoFindLeak_50etfqiquan(zhengquanObj , netInfo, etfInfo, tag);
         } 


            //****显示涨跌百分比*/  //console.log('显示涨跌百分比:  新股  昨天收盘价：', newPrice , yesterPrice);
           if(chg) {
                var chg_num = (newPrice - yesterPrice) * 100 / yesterPrice;
                chg_num = chg_num.toFixed(2);
                if(newPrice == yesterPrice)  chg_num='0.00';
                $("#chg_" + code_ids[code]  + "_" + uuID).text(chg_num + '%');
           }



          /****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
          if(oldPrice != newPrice)  changePrice(code , yesterPrice ,oldPrice , newPrice,tag  );  //股价变化，则更新  
          if(oldName != newName) $(td_nameID).text(newName);      //证券名变化，则更新



        //更新数据库股价信息;条件： 1.名字不一样  2.在早晚规定时间段
        var datatmp = {id:code_ids[code],  name:newName , price : newPrice , flag:zhengquanName  };
         if(oldName != newName) {  //证券名变化，则更新
             $(td_nameID).text(newName);    
             updataZhengquanDB(datatmp,tag);  //更新数据库证券信息
         }  
         //数据更新时段；
        var nowtimeStamp = Date.parse(new Date());
        //console.log(config);
        if(nowtimeStamp >= config.morning_starttime && nowtimeStamp <= config.morning_endtime) updataZhengquanDB(datatmp,tag);  //更新数据库证券信息	
        if(nowtimeStamp >= config.afternoon_starttime && nowtimeStamp <= config.afternoon_endtime) updataZhengquanDB(datatmp,tag);  //更新数据库证券信息	



         //*****返回数据：市值和总盈利

        //如果显示资产表， 更改实际盈利。。。
        if(blanceinfoFlag ) {  //如果显示资产表: 更改td实际盈利。。。
            //if(field == blanceinfoKey)
            //1.获取持仓数， 最新价 , 交割盈利 
            var coutTmp = $("#td_count_" + code_ids[code]  + "_" + uuID).text().trim();
            var jiaoge_yingli = $("#td_jiaoge_yingli_" + code_ids[code]  + "_" + uuID).text().trim(); 

            //console.log("--仓数， 最新价 , 交割盈利---",coutTmp,newPrice, jiaoge_yingli );
            if( code.length <= 5) { //如果为港股
                //获取港币汇率
                var hk = zhengquanObj.getNetInfo('fx_shkdcny',evalstrArr_tmp); 
                var hk_exchange = hk.newPrice; 
                //console.log("--港币汇率---",hk_exchange );
                //计算实际盈利
                var shiji_yingli =  jiaoge_yingli  - 0 + coutTmp * multiple * newPrice * hk_exchange;

            } else {    //非港股
                //计算实际盈利
                var shiji_yingli =  jiaoge_yingli - 0 + coutTmp * multiple * newPrice ;

            } //if end

            //****更新实际盈利
             //console.log("--++++++++++=--更新实际盈利-",shiji_yingli );
                shiji_yingli = shiji_yingli.toFixed(2);
               
                $("#td_" + blanceinfoKey + "_" + code_ids[code]  + "_" + uuID).text(shiji_yingli);
                if(shiji_yingli >= 0) $("#td_" + blanceinfoKey + "_" + code_ids[code]  + "_" + uuID).css({"font-weight":"bold","font-size":"12px","color":"red"});
                if(shiji_yingli < 0) $("#td_" + blanceinfoKey + "_" + code_ids[code]  + "_" + uuID).css({"font-weight":"bold","font-size":"12px","color":"green"});


        }  //if(blanceinfoFlag ) end


        var result = {shizhi:0, shiji_yingli:0};
            if( code.length <= 5) { //如果为港股
                //获取港币汇率
                var hk = zhengquanObj.getNetInfo('fx_shkdcny',evalstrArr_tmp); 
                var hk_exchange = hk.newPrice; 
                //console.log("--港币汇率---",hk_exchange );
                //计算实际盈利
                var shiji_yingli_re =  jiaoge_yingli  - 0 + coutTmp * multiple * newPrice * hk_exchange;
                var shizhi_re = coutTmp * multiple  * newPrice * hk_exchange;

            } else {    //非港股
                //计算实际盈利
                var shiji_yingli_re =  jiaoge_yingli - 0 + coutTmp * multiple  * newPrice ;
                var shizhi_re = coutTmp * multiple * newPrice ;

        } //if end

        result.shizhi = shizhi_re  ,  result.shiji_yingli = shiji_yingli_re ;
        return result;




   }


   //更新数据库证券信息
   function updataZhengquanDB(datatmp,tag){

       var needupdateToDB = dataSource_global[tag].needupdateToDB;
       if(!needupdateToDB)  return  ;

        $.post('/app/zhengquan/updatezhengquan',datatmp, function(datasBack){
            var code = datasBack.code;
            if(code == 205)  {console.log('检测到未登陆.');  }  

            if(code == 204)  {console.log('错误:updatezhengquan -->',datasBack.err);  }  

            if(code == 201) { //返回登陆页面
            }

        });


   }










  //股价变化更新 
  function changePrice(code, yesterPrice ,oldPrice , newPrice , tag){

            var uuID =   dataSource_global[tag].uuID; 
            var codes = dataSource_global[tag].codes ;
            var code_ids = dataSource_global[tag].code_ids ;
            var evalstrArr = dataSource_global[tag].evalstrArr ;
            var key= dataSource_global[tag].key;     //要更新的字;
            var zhengquanName = dataSource_global[tag].zhengquanName;
            var chg = dataSource_global[tag].chg;
            var keyArrow = dataSource_global[tag].keyArrow;

           var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
           var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值
           

           $(td_priceID).text( newPrice);



           //如果新股价大于昨天价格，更新价格和涨幅为红色
           if(newPrice > yesterPrice) {
               $(td_priceID).css({"color" : "red"});
               if(chg) $("#chg_" + code_ids[code]  + "_" + uuID).css({"color" : "red"});  
            }
          
           //如果新股价小于昨天价格，更新价格和涨幅为绿色
           if(newPrice < yesterPrice) {
               $(td_priceID).css({"color" : "green"});
               if(chg)  $("#chg_" + code_ids[code]  + "_" + uuID).css({"color" : "green"});  
            }

           //调节股价的字体。股价的涨跌，通过字体的大写来动态表达。  涨： 15px,  跌：19px
           //jiantou_down  jiantou_up

           if(chg) {  //变化涨跌幅的箭头

                
                if(newPrice > oldPrice)  {  //如果股价涨了  
                    $("#jiantou_down" + code_ids[code]  + "_" + uuID ).hide();
                    $("#jiantou_up" + code_ids[code]  + "_" + uuID ).hide();
                    /****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
                    $("#jiantou_up" + code_ids[code]  + "_" + uuID ).show(500); 
                }

                if(newPrice < oldPrice)  {  //如果股价跌了
                    $("#jiantou_down" + code_ids[code]  + "_" + uuID ).hide();
                    $("#jiantou_up" + code_ids[code]  + "_" + uuID ).hide();
                    //****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
                    $("#jiantou_down" + code_ids[code]  + "_" + uuID ).show(500); 
                }

           }


           if(keyArrow) {  //变化价格的箭头

                $("#jiantou_price_down" + code_ids[code]  + "_" + uuID ).hide();
                $("#jiantou_price_up" + code_ids[code]  + "_" + uuID ).hide();
                
                if(newPrice > oldPrice)  {  //如果股价涨了  
                    /****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
                    $(td_priceID).css({"font-weight":"bold","font-size":"15px"});
                    $("#jiantou_price_up" + code_ids[code]  + "_" + uuID ).show(500); 
                }

                if(newPrice < oldPrice)  {  //如果股价跌了
                    //****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
                    $(td_priceID).css({"font-weight":"bold","font-size":"19px"});
                    $("#jiantou_price_down" + code_ids[code]  + "_" + uuID ).show(500); 
                }

          }
 


  }


   //从页面上获取价格和名称信息
   function getTd_zhengquanInfo(code,tag) {
        var result = {};

        var uuID =   dataSource_global[tag].uuID; 
        var codes = dataSource_global[tag].codes ;
        var evalstrArr = dataSource_global[tag].evalstrArr ;
        var code_ids= dataSource_global[tag].code_ids;     //要更新的字;
        var key = dataSource_global[tag].key;

        var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
        var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值
        var oldPrice = $(td_priceID).text().trim();
        var oldName = $(td_nameID).text().trim();

        result.oldPrice = oldPrice;
        result.oldName = oldName;

        return result;
   }








      global = this;
    

    if (typeof window.define === 'function' && window.define.amd) {
        window.define('table5', [], function () {
           // console.log('AAAAAAA');
            return table5;
        });
    } else  {global.table5 = table5;}
   



}).call(this);