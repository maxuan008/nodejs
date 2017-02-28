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

   var zhengquan5 = window.zhengquan5;
  
   var config = {
       pageLength:25,
        morning_starttime:" 09:29:00" ,   morning_endtime:" 09:35:00",
        afternoon_starttime:" 14:55:00" , afternoon_endtime:" 15:05:00"
   };



   
   var dataSource_global = {};

   //var uuID='';
   //var  placeholder , columns , datas , actual , cancel ,chg ,zhengquanName, pkID, type, key , table_datas ;
   //var zhengquans = [] , codes=[] , code_ids={};
   //var evalstrArr;

    var table5 = {
            //addzhengquan:  addzhengquan,      //添加证券
            grid:grid          ,               //显示grid
            showprice:showprice                //更新证券价格
        };
      

    //type：1不带分页， 2，带分页.  id:为HTML元素的ID， datas为数据  3.tag:为此table的标识
    function grid(id,dataSource, tag) {
        console.log("datasouce:",dataSource);
        dataSource_global[tag]= dataSource;
        dataSource_global[tag].table_datas = "table_datas";

        placeholder = dataSource.placeholder;
        columns = dataSource.columns;
        datas = dataSource.data;
        actual = dataSource.actual;
        cancel = dataSource.cancel;
        chg = dataSource.chg;
        zhengquanName = dataSource.zhengquanName;
        pkID = dataSource.pkID;
        type =dataSource.type;
        key= dataSource.key;     //要更新的字;
        table_datas = "table_datas";


        
        
        var htmlstr = '';



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



        if(type == 1 ) {

        }


       //带分页的table
       if(type == 2 ) {  
              var uuID = uuid(8,16);
        dataSource_global[tag].uuID = uuID;

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

              
              //console.log('uuid',uuID);

              htmlstr = htmlstr + 
                    "<div class='col-sm-12'>" +
                    "   <div class='panel'>" +
                    "       <div class='panel-content'>" +
                    "            <table id='table_add_" + uuID + "' class='table table-striped table-hover'>" +
                    "                <thead>" +
                    "                        <tr>" +    //onclick='addZhengQuan(this)'
                    "                            <th  style='width:130px;'><input   id='code_" + uuID + "'  type='text'  style='width:120px;'    placeholder='股票代码' required autofocus /></th>" +
                    "                            <th><button type='button' class='btn btn-success btn-xs' uuid='" + uuID + "' id='add_" + uuID + "' style='width:60px;'  > 添加 </button></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                        </tr>" +
                    "                    </thead>" +
                    "            </table>" +
                    "            <table id='" + table_datas + "_" + uuID + "' class='data-table table table-striped table-hover responsive nowrap' cellspacing='0' width='100%'>" ;

             //1.***生成table, thead. 和 <tbody> 框架.    2.***逐条生成tr

                //***********1. 生成  thead    
                htmlstr = htmlstr +   "<thead>  <tr> ";
                for(var i=0;i<columns.length; i++  ){ 
                    var title = '';
                    if(columns[i].title != undefined) title = columns[i].title ;
                    htmlstr = htmlstr +   "<th>" + title + "</th> ";
                } //fro end 
                if(chg)      htmlstr = htmlstr +   "<th>涨跌幅</th> ";
                if(cancel )  htmlstr = htmlstr +   "<th>操作</th> ";
                htmlstr = htmlstr +   "</tr></thead> <tbody id='tbody_" + uuID + "' ></tbody> </table>  </div> </div> </div>  ";

                $("#"+id).append(htmlstr);   


            
            //**********2.逐条生成tr
            var  trstr = '';
            for(var j=0; j<datas.length; j++) { 
                appendTr(datas[j] , tag );

            } //for end 
  
                    
           //*******调用模板的JS
           $('.data-table').DataTable({pageLength:config.pageLength});     
           
           //*******绑定add按钮事件
            addZhengQuanEvent(tag);

           //******实时价格变化功能
           //priceUpdate();
           return 1;
     
        }   // if(type == 2 )  end    
   

        
    }




    function showprice()
    {   
        //***循环table */
        for(var tag in  dataSource_global ) {
            doIt(tag);
        } //for end 

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
       
       zhengquans = [] , codes=[] , code_ids={};
       for(var i=0;i<trs.length; i++) {
           //
           //console.log(trs[i]);
           var ele_tr = trs[i];
           var trid = ele_tr.getAttribute('id');

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
      var data = {type:zhengquanName , codes : codes , code_ids: code_ids, uuID:uuID, key:key};
        zhengquan5.setNewPricesInfo(data);   //获取证券的实时股价集合信息
        dataSource_global[tag].evalstrArr = zhengquan5.getevalstrArr();
        console.log('证券实时信息集合：',evalstrArr);
       
       updateZhengquanPrice(tag);   //开始更新证券价格

    }








    //开始更新页面指定table的证券价格
    function updateZhengquanPrice(tag) {
            console.log('开始更新网页');

            var uuID =   dataSource_global[tag].uuID; 
            var codes = dataSource_global[tag].codes ;
            var evalstrArr = dataSource_global[tag].evalstrArr ;

            if(evalstrArr) //当数据返回后，开始执行
            for(var i=0;i<codes.length; i++ ) {          
                changePrice_html(codes[i])  ; //更新网页上的证券价格       
            } //for end
    }

   //更新网页上的证券价格
   function  changePrice_html(code ,tag) {
        
            var uuID =   dataSource_global[tag].uuID; 
            var codes = dataSource_global[tag].codes ;
            var code_ids = dataSource_global[tag].code_ids ;
            var evalstrArr = dataSource_global[tag].evalstrArr ;
            var key= dataSource_global[tag].key;     //要更新的字;
            var zhengquanName = dataSource_global[tag].zhengquanName;


        var netInfo = zhengquan5.getNetInfo(code);
        var newPrice = netInfo.newPrice ;
        var newName = netInfo.newName ;
        console.log('开始更新股票：' + newName);

        var zhengquanInfo = getTd_zhengquanInfo(code,tag);
        var oldPrice = zhengquanInfo.oldPrice;
        var oldName = zhengquanInfo.oldName;

        var yesterPrice = netInfo.yesterPrice;

          console.log('股票价格：' + newName + "原价：" + oldPrice + ",新价：" + newPrice );

        var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
        var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值


          /****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
        if(oldPrice != newPrice)  changePrice(code , yesterPrice ,oldPrice , newPrice,tag  );  //股价变化，则更新  

        if(oldName != newName) $(td_nameID).text(newName);      //证券名变化，则更新

         
        //更新数据库股价信息;条件： 1.名字不一样  2.在早晚规定时间段
        var datatmp = {id:code_ids[code],  name:newName , price : newPrice , flag:zhengquanName  };
         if(oldName != newName) {  //证券名变化，则更新
             $(td_nameID).text(newName);    
             updataZhengquanDB(datatmp);  //更新数据库证券信息
         }  

         //数据更新时段；
        var nowtimeStamp = Date.parse(new Date());
        if(nowtimeStamp >= config.morning_starttime && nowtimeStamp <= config.morning_endtime) updataZhengquanDB(datatmp);  //更新数据库证券信息	
        if(nowtimeStamp >= config.afternoon_starttime && nowtimeStamp <= config.afternoon_endtime) updataZhengquanDB(datatmp);  //更新数据库证券信息	



   }


   //更新数据库证券信息
   function updataZhengquanDB(datatmp){

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

           var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
           var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值

           $(td_priceID).text( newPrice);

           if(newPrice > yesterPrice) {$(td_priceID).css({"color" : "red"}); $("#chg_" + code_ids[code]  + "_" + uuID).css({"color" : "red"});  }
           if(newPrice < yesterPrice) {$(td_priceID).css({"color" : "green"});$("#chg_" + code_ids[code]  + "_" + uuID).css({"color" : "green"});  }

           //调节股价的字体。股价的涨跌，通过字体的大写来动态表达。  涨： 15px,  跌：19px
           //jiantou_down  jiantou_up
              $("#jiantou_down" + code_ids[code]  + "_" + uuID ).hide();
              $("#jiantou_up" + code_ids[code]  + "_" + uuID ).hide();
           if(newPrice > oldPrice)  {  //如果股价涨了
                $(td_priceID).css({"font-weight":"bold","font-size":"15px"});
                /****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
               $("#jiantou_up" + code_ids[code]  + "_" + uuID ).show(500); 
            }
           if(newPrice < oldPrice)  {  //如果股价跌了
               $(td_priceID).css({"font-weight":"bold","font-size":"19px"});
               //****控制涨跌箭头：，控制涨跌箭头：隐藏跌箭头，缓慢显示涨箭头*/
               $("#jiantou_down" + code_ids[code]  + "_" + uuID ).show(500); 
           }
 
            //****显示涨跌百分比*/
            var chg_num = (newPrice - yesterPrice) * 100 / yesterPrice;
            chg_num = chg_num.toFixed(2);
            $("#chg_" + code_ids[code]  + "_" + uuID).text(chg_num + '%');

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




              var zq_id = data[pkID];  //证券的主键ID
                //if(zhengquanName == 'gupiao') zq_id = data.gp_id;   
                // if(zhengquanName == 'qiquan') zq_id = data.qq_id;   


                 trstr =   "<tr id='tr_" + zq_id + "_" + uuID + "'>   ";
                 
                for(var k=0;k<columns.length; k++ ) {   //逐行加入td
                    
                    var field = columns[k].field;
                    var idstr = "td_"+ field + "_" + zq_id + "_" +  uuID ; 
                    trstr = trstr +   "<td id='" + idstr + "'>   ";

                    var value = '';
                    if(field != undefined)   value = data[field];
                    
                    trstr = trstr +   value;
                    trstr = trstr +   "</td>   ";
                } //fro end 


                if(chg ) { //加入涨跌幅，
                     trstr = trstr +   "<th> " + 
                         "<div style = 'width:10px;float:left;' ><label hidden id='jiantou_down" + zq_id + "_" + uuID + "' style='margin:0;font-weight:bold;font-size:17px; float: left; color: green;'>↓</label></div>   "  +
                         "<div style = 'width:10px;float:left;' ><label hidden id='jiantou_up" + zq_id + "_" + uuID + "'   style='margin:0;font-weight:bold;font-size:17px; float: left; color: red;'>↑</label> </div>  "  +
                         "<div style='font-weight:bold; font-size:17px;float: left; ' id='chg_" + zq_id + "_" + uuID + "'>0.00%</div>  " +
                         "</th>   ";
                } 


                if(cancel ) { //加入注销操作，
                     trstr = trstr +   "<th><button id='del_" + zq_id + "_" + uuID + "' type='button' class='btn btn-warning btn-xs ' >注销</button></th> ";
                } 

                trstr = trstr +   "</tr>   ";

                $("#tbody_" + uuID ).prepend(trstr); 
     
                if(cancel ) { //绑定注销事件
                     delZhengQuanEvent(zq_id,tag);
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
                            console.log('addzhengquan',datasBack);
                            var insertID =datasBack.datas.id;

                            var doc = {code:codevalue}; doc[pkID] = insertID;
           
                            appendTr(doc)

                        }

                    }); //$.post end

                }); //$("#add_" +uuID).click end

        }


        //*******绑定注销按钮事件,  //证券的主键ID
        function delZhengQuanEvent( zq_id){

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
                    console.log('注销按钮被点击,uuid：',uuID);
                    var data = {zhengquanname:zhengquanName , id: zq_id};

                    $.post('/app/zhengquan/delzhengquan', data,function(datasBack){ 
                        
                        var code = datasBack.code;
                        if(code == 205)  {alert('检测到未登陆.'); console.log('检测到未登陆.');  }  
                        if(code == 204)  {alert('错误:' + datasBack.err); console.log('错误:addzhengquan -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                           // console.log('delzhengquan',datasBack)
                           $("#tr_" +  zq_id + "_" + uuID).remove();

                        }

                    }); //$.post end

                }); //$(#del_" + zq_id + "_" + uuID).click end

        }      



      global = this;
    

    if (typeof window.define === 'function' && window.define.amd) {
        window.define('table5', [], function () {
           // console.log('AAAAAAA');
            return table5;
        });
    } else  {global.table5 = table5;}
   



}).call(this);