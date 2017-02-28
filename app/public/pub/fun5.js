/**
 * Created by mx
 */
   var table5 = window.table5;
  // var table6 = window.table5;
   var table6 =  table5;

    //调用table5对象中实时股价的功能
    function showprice(){

        table5.showprice();
    }
    

(function() {
    
   var sessionInfo = {};      //session信息

   var config = {
       //是否股价实时显示， true:是， 时间：starttime:'', endtime:'', space:更新间隔时间秒
       actual:{flag:true, starttime:" 09:00:00" , endtime:" 23:50:00" , space:3000 , key:'price'  } ,
       gridID : 'grid'


   };


   //fun5：  子功能对象。 用于执行当前页面中左侧导航栏中的子功能；参数：tag,datas由app5传入

    var fun5 = {

            execute:execute                 //执行子功能
        };
      
      global = this;
    
    
      //执行子功能 ， tag为子功能的标签，存于数据库中
      function execute(tag,datas) {

         var contentID = config.gridID;
          
        $("#" + contentID).empty();
          

          //执行子功能：股票信息
          if(tag == 'gupiaoInfo') {
            var fid = datas.fid;
            console.log(tag);
            //获取用户股票信息
            $.get('/app/zhengquan/getgupiaos',{},function(datasBack){
                  var code = datasBack.code;
                  if(code == 205)  {console.log('检测到未登陆.');  }  
                  if(code == 204)  {console.log('错误:getSessionInfo -->',datasBack.err);  }  
                  if(code == 201) { //获取成功
                      var datas = datasBack.datas;
                      var columns = [{field: "code",title: "代码"}, {field:"name" ,title:"股票名" }, {field:"price" ,title:"价格" }  ];

                      //console.log(datas);

                      var dataSource = {
                          zhengquanName:"gupiao",                         //作为一种标志，显示当前的证券类型
                          //actual:{flag:false, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price'  },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:'', space:更新间隔时间秒
                          key:'price',     //要更新的字段
                          cancel:true,    //是否注销
                          chg:true,        //是否显示涨跌
                          type:2,
                          columns:columns,
                          data:datas,
                          pkID:'gp_id'    //主键的ID名

                      };
                    
                     //table的ID设为tag: gupiao1
                     var gridflag =  table5.grid(config.gridID, dataSource ,'gupiao1');
                     
                      priceUpdate();

                  }       

            });  //get end



            $.get('/app/zhengquan/getqiquans',{},function(datasBack){
                  var code = datasBack.code;
                  if(code == 205)  {console.log('检测到未登陆.');  }  
                  if(code == 204)  {console.log('错误:getqiquans -->',datasBack.err);  }  
                  if(code == 201) { //获取成功
                      var datas = datasBack.datas;
                      var columns = [{field: "code",title: "代码"}, {field:"name" ,title:"期权名" }, {field:"price" ,title:"价格" }   ];

                      console.log(datas);

                      var dataSource = {
                          zhengquanName:"qiquan",                         //作为一种标志，显示当前的证券类型
                          //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                          key:'price',     //要更新的字段
                          cancel:true,     //是否显示注销
                          chg:true,        //是否显示涨跌
                          type:2,
                          columns:columns,
                          data:datas,
                          pkID:'qq_id'    //主键的ID名
                      };

                      //table的ID设为tag: qiquan2
                      table5.grid(config.gridID,dataSource, 'qiquan2');

                      priceUpdate();

                  }       

            });  //get end













          } //if end






          //执行子功能：期权信息
          if(tag == 'qiquanInfo') {
            var fid = datas.fid;
            console.log(tag);
            //获取用户股票信息
            $.get('/app/zhengquan/getqiquans',{},function(datasBack){
                  var code = datasBack.code;
                  if(code == 205)  {console.log('检测到未登陆.');  }  
                  if(code == 204)  {console.log('错误:getqiquans -->',datasBack.err);  }  
                  if(code == 201) { //获取成功
                      var datas = datasBack.datas;
                      var columns = [{field: "code",title: "代码"}, {field:"name" ,title:"期权名" }, {field:"price" ,title:"价格" }   ];

                      console.log(datas);

                      var dataSource = {
                          zhengquanName:"qiquan",                         //作为一种标志，显示当前的证券类型
                          //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                          key:'price',     //要更新的字段
                          cancel:true,     //是否显示注销
                          chg:true,        //是否显示涨跌
                          type:2,
                          columns:columns,
                          data:datas,
                          pkID:'qq_id'    //主键的ID名
                      };

                      
                      table5.grid(config.gridID,dataSource);

                      priceUpdate();

                  }       

            });  //get end

          } //if end


      }




    //******实时价格变化功能 ,调用table5对象中实时股价的功能
    function priceUpdate(){
        //console.log('NNNNNNN');
         var  starttime = config.actual.starttime , endtime=config.actual.endtime , space = config.actual.space;
         

         if(config.actual.flag && starttime && endtime && space) {
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

               if(nowtimeStamp >= time1 && nowtimeStamp <= time2)  var int=self.setInterval("showprice()",space);	

         } //if end


    } //function 




    if (typeof window.define === 'function' && window.define.amd) {
        window.define('fun5', [], function () {
            console.log('AAAAAAA');
            return fun5;
        });
    } else  {global.fun5 = fun5;}
   




}).call(this);