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


    var table_file = {
            //addzhengquan:  addzhengquan,      //添加证券
            grid:grid          ,               //显示grid
            empty:empty                          //清空数据

        };
      
    //清空数据，用于子功能被点击时，初始化的工作。 
    function empty() {
        dataSource_global ={};

    }




    //type：1不带分页， 2，带分页.  id:为HTML元素的ID， datas为数据  3.tag:为此table的标识
    function grid(id,dataSource, tag) {
        
        dataSource_global[tag]= dataSource;
        dataSource_global[tag].table_datas = "table_datas";

        if(!dataSource.needHeader)  dataSource_global[tag].needHeader = false;
        if(!dataSource.cancel)  dataSource_global[tag].cancel = false;
        if(!dataSource.isanalyse)  dataSource_global[tag].isanalyse = false;
        if(!dataSource.isdataTable)  dataSource_global[tag].isdataTable = false;
        if(!dataSource.addfile)  dataSource_global[tag].addfile = false;
        
        var needHeader = dataSource_global[tag].needHeader;
        var cancel = dataSource_global[tag].cancel;
        var isanalyse = dataSource_global[tag].isanalyse;
        var isdataTable = dataSource_global[tag].isdataTable;
        var addfile = dataSource_global[tag].addfile;

        var columns = dataSource_global[tag].columns;
        var datas = dataSource_global[tag].data;
        var pkID = dataSource_global[tag].pkID;
        var type =dataSource_global[tag].type;
        var table_datas = dataSource_global[tag].table_datas ;

        dataSource_global[tag].dealTdLength = columns.length + 1;

        var htmlstr = '';


        if(type == 1 ) {

        }


       //带分页的table
       if(type == 2 ) {  
              var uuID = uuid(8,16);
              dataSource_global[tag].uuID = uuID;

              htmlstr = htmlstr + 
                    "<div class='col-sm-12'>" +
                    "   <div class='panel'>" +
                    "       <div class='panel-content'>" ;
             

              //添加增加证券功能
              if(addfile) 
              {
                  htmlstr = htmlstr +
                    "            <table id='table_add_" + uuID + "' class='table table-striped table-hover'>" +
                    "                <thead>" +
                    "                        <tr>" +    //onclick='addZhengQuan(this)'
                    "                            <th  style='width:130px;'> <select id='type_" + uuID + "'   style='width:120px;'  ><option value='1'>50etf期权</option><option value='2'>股票</option></select> </th>" +                 
                    "                            <th> <span class='j-upload-btn'> 导入文件 " +
                    "                           <form id='file-form' enctype='multipart/form-data'><input title='点击选择文件' id='myfile_" + uuID + "' type='file' name='myfile'> </form></span>   " + 
                    "</th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                            <th></th>" +
                    "                        </tr>" +
                    "                    </thead>" +
                    "            </table>" ;
              };





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
                    if(cancel || isanalyse )  htmlstr = htmlstr +   "<th>操作</th> ";

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
           //console.log(uuID , {pageLength:25});
           if(isdataTable)  $('.data-table_' + uuID).DataTable({pageLength:pageLength});     
           
           //*******绑定add按钮事件
            addFileEvent(tag);

        }   // if(type == 2 )  end    
   
        
    }


    function  addFileEvent(tag){
        var uuID =   dataSource_global[tag].uuID;
        var typevalue = $("#type_" + uuID).val();
        $("#myfile_" + uuID ).on('change',function(){
            console.log(111,typevalue);
            var me = this;

            var completeHandler = function(data){
                $(me).val('');
            };

             var progressHandler = function(e){
                console.log(e);
            };

            var beforeSendHandler = function(){
                console.log(1);
            };
            var errorHandler = function(){
                $(me).val('');
            };
            console.log(222);
            var formData = new FormData($(this).parents('form')[0]);
            console.log(333);
            $.ajax({
                url: "/app/zhengquan/uploaddealfile?typevalue=" + typevalue,
                type: 'POST',
                xhr: function() {  // custom xhr
                    myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // check if upload property exists
                        myXhr.upload.addEventListener('progress',progressHandler, false); // for handling the progress of the upload
                    }
                    return myXhr;
                },
                //Ajax事件
                beforeSend: beforeSendHandler,
                success: completeHandler,
                error: errorHandler,
                // Form数据
                data: formData,
                //Options to tell JQuery not to process data or worry about content-type
                cache: false,
                contentType: false,
                processData: false
            });

        })

    } 


      //生成tr  
      function appendTr(data,tag) {
            var uuID =   dataSource_global[tag].uuID;       
            var needHeader = dataSource_global[tag].needHeader;
            var cancel = dataSource_global[tag].cancel;
            var isanalyse = dataSource_global[tag].isanalyse;
            var isdataTable = dataSource_global[tag].isdataTable;
            var addfile = dataSource_global[tag].addfile;

            var columns = dataSource_global[tag].columns;
            var datas = dataSource_global[tag].data;
            var pkID = dataSource_global[tag].pkID;
            var type =dataSource_global[tag].type;

            var main_id = data[pkID];  //主键ID

            //开始组装HTML
            trstr =   "<tr id='tr_" + main_id + "_" + uuID + "'>   ";
            for(var k=0;k<columns.length; k++ ) {   //逐行加入td
                var field = columns[k].field;
                var idstr = "td_"+ field + "_" + main_id + "_" +  uuID ; 
                trstr = trstr +   "<td id='" + idstr + "'>   ";

                var value = '';
                if(field != undefined)  value = data[field];     if(value == undefined ) value ='';
                
                trstr = trstr + value +   "</td>   ";
            } //for end 


            if(cancel || isanalyse ) { //加入注销和导入操作.
                trstr = trstr +   "<th>";
                if(isanalyse)  trstr = trstr  + "<button id='analyse_" + main_id + "_" + uuID + "' type='button' class='btn btn-success btn-xs ' >分析并导入</button> ";
                if(cancel)     trstr = trstr +   "<button id='delFile_" + main_id + "_" + uuID + "' type='button' class='btn btn-warning btn-xs ' >注销</button> ";
                trstr = trstr +   "</th>";
            } 

            trstr = trstr +   "</tr>   ";

            $("#tbody_" + uuID ).prepend(trstr); 

            if(cancel )  deldelFileEvent(main_id,tag);  //绑定注销事件
            if(isanalyse )  analyse_import_inEvent(main_id,tag);  //绑定注销事件 isanalyse
               

      } //function end


      //*******绑定"分析导入"按钮事件
      function analyse_import_inEvent(main_id,tag) {
            var uuID =   dataSource_global[tag].uuID; 
            var needHeader = dataSource_global[tag].needHeader;
            var cancel = dataSource_global[tag].cancel;
            var isanalyse = dataSource_global[tag].isanalyse;
            var isdataTable = dataSource_global[tag].isdataTable;
            var addfile = dataSource_global[tag].addfile;

            var columns = dataSource_global[tag].columns;
            var datas = dataSource_global[tag].data;
            var pkID = dataSource_global[tag].pkID;
            var type = dataSource_global[tag].type;
            var tableName =dataSource_global[tag].tableName;

                $("#analyse_" + main_id + "_" + uuID).click(function(){
  
                    var data = { id: main_id};

                    $.post('/app/zhengquan/analyseimportfile', data,function(datasBack){ 
                        
                        var code = datasBack.code;
                        if(code == 205)  {alert('检测到未登陆.'); console.log('检测到未登陆.');  }  
                        if(code == 204)  {alert('错误:' + datasBack.err); console.log('错误:addzhengquan -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                            
                           alert("导入成功");
                          
                        }

                    }); //$.post end

                }); //$(#del_" + zq_id + "_" + uuID).click end



      }





        //*******绑定注销按钮事件,  //删除此交易文件
        function deldelFileEvent( main_id ,tag){

            var uuID =   dataSource_global[tag].uuID;       
            var needHeader = dataSource_global[tag].needHeader;
            var cancel = dataSource_global[tag].cancel;
            var isanalyse = dataSource_global[tag].isanalyse;
            var isdataTable = dataSource_global[tag].isdataTable;
            var addfile = dataSource_global[tag].addfile;

            var columns = dataSource_global[tag].columns;
            var datas = dataSource_global[tag].data;
            var pkID = dataSource_global[tag].pkID;
            var type = dataSource_global[tag].type;
            var tableName =dataSource_global[tag].tableName;

            //var main_id = data[pkID];  //主键ID

                 
                $("#delFile_" + main_id + "_" + uuID).click(function(){
  
                    var data = { id: main_id};

                    $.post('/app/zhengquan/deldealfile', data,function(datasBack){ 
                        
                        var code = datasBack.code;
                        if(code == 205)  {alert('检测到未登陆.'); console.log('检测到未登陆.');  }  
                        if(code == 204)  {alert('错误:' + datasBack.err); console.log('错误:addzhengquan -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                           //console.log('delzhengquan',datasBack)
                           $("#tr_" +  main_id + "_" + uuID).remove();
                        }

                    }); //$.post end

                }); //$(#del_" + zq_id + "_" + uuID).click end

        }      






























  //将月份转化当前年份的月，例如果为小于当月，表示为明年的月份，分月+12  
  function  changeMonthToNum(month){
    var result = month;
    var d = new Date();
    var now_month = d.getMonth() - 0 + 1;
    if(month < now_month) result = month + 12;

    return result;
  }










      global = this;
    

    if (typeof window.define === 'function' && window.define.amd) {
        window.define('table_file', [], function () {
           // console.log('AAAAAAA');
            return table_file;
        });
    } else  {global.table_file = table_file;}
   



}).call(this);