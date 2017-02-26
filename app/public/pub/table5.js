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
       
   };



   var uuID='';
   var dataSource_global = {};

   var  placeholder , columns , datas , actual , cancel ,zhengquanName, pkID, type, key , table_datas ;


    var table5 = {
            //addzhengquan:  addzhengquan,      //添加证券
            grid:grid          ,               //显示grid
            showprice:showprice                //更新证券价格
        };
      

    //type：1不带分页， 2，带分页.  id:为HTML元素的ID， datas为数据
    function grid(id,dataSource) {
        console.log("datasouce:",dataSource);
        dataSource_global = dataSource;

        placeholder = dataSource.placeholder;
        columns = dataSource.columns;
        datas = dataSource.data;
        actual = dataSource.actual;
        cancel = dataSource.cancel;
        zhengquanName = dataSource.zhengquanName;
        pkID = dataSource.pkID;
        type =dataSource.type;
        key= dataSource.key;     //要更新的字;

        table_datas = "table_datas";

        var htmlstr = '';
        
        if(type == 1 ) {

        }



       if(type == 2 ) {  
              

            // actual:{flag:true, starttime:'', endtime:''},  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
            // cancel:true,    //是否注销
              uuID = uuid(8,16);
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
                    "            <table id='" + table_datas + "' class='data-table table table-striped table-hover responsive nowrap' cellspacing='0' width='100%'>" ;

             //1.***生成table, thead. 和 <tbody> 框架.    2.***逐条生成tr

                //***********1. 生成  thead    
                htmlstr = htmlstr +   "<thead>  <tr> ";
                for(var i=0;i<columns.length; i++  ){ 
                    var title = '';
                    if(columns[i].title != undefined) title = columns[i].title ;
                    htmlstr = htmlstr +   "<th>" + title + "</th> ";
                } //fro end 
                if(cancel )  htmlstr = htmlstr +   "<th>操作</th> ";
                htmlstr = htmlstr +   "</tr></thead> <tbody id='tbody_" + uuID + "' ></tbody> </table>  </div> </div> </div>  ";

                $("#"+id).html(htmlstr);   


            
            //**********2.逐条生成tr
            var  trstr = '';
            for(var j=0; j<datas.length; j++) { 
                appendTr(datas[j] );

            } //for end 
  
                    
           //*******调用模板的JS
           $('.data-table').DataTable({});     
           
           //*******绑定add按钮事件
            addZhengQuanEvent();

           //******实时价格变化功能
           //priceUpdate();
           return 1;
     
        }   // if(type == 2 )  end    





        
    }




    function showprice()
    {
        //console.log('实时股价更新:' +  key + table_datas);
        var id= '#tbody_' + uuID;
       // var trs = document.getElementById(id).childNodes;
       var trs =$(id).children("tr");
       //console.log('Tr长度，',trs.length);
       var zhengquans = [] , codes=[] , code_ids={};
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
               }
           }

       }
     


      //获取table列表中证券的信息结合,以便获取任意的证券的实时股价信息。
      var data = {type:zhengquanName , codes : codes , code_ids: code_ids, uuID:uuID, key:key};
      zhengquan5.setNewPricesInfo(data);

    }



      //生成tr  
      function appendTr(data) {

                
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

                if(cancel ) { //加入注销操作，
                     trstr = trstr +   "<th><button id='del_" + zq_id + "_" + uuID + "' type='button' class='btn btn-warning btn-xs ' >注销</button></th> ";
                } 

                trstr = trstr +   "</tr>   ";

                $("#tbody_" + uuID ).prepend(trstr); 
     
                if(cancel ) { //绑定注销事件
                     delZhengQuanEvent(zq_id);
                } 


      } //function end



        //*******绑定add按钮事件
        function addZhengQuanEvent() {
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