/**
 * Created by mx
 */

  // var table6 = window.table5;
   var intervalID;

    //调用table5对象中实时股价的功能
    function showprice(){
        //console.log('showprice intervalID:', intervalID  );
        table5.showprice();
    }
    

(function() {
    
   var sessionInfo = {};      //session信息

   var config = {
       //是否股价实时显示， true:是， 时间：starttime:'', endtime:'', space:更新间隔时间秒
       
       gridID : 'grid',   //要显示grid的ID值
       space:3000        //space:更新间隔时间秒

   };


   //fun5：  子功能对象。 用于执行当前页面中左侧导航栏中的子功能；参数：tag,datas由app5传入

    var fun5 = {

            execute:execute                 //执行子功能
        };
      
      global = this;
    
    
      //执行子功能 ， tag为子功能的标签，存于数据库中
      function execute(tag,datas) {
          
          table5.empty();
          //console.log('intervalID:',intervalID);
         if(intervalID != undefined) { window.clearInterval(intervalID); console.log('interval Stop'); }  //var clearInt =  window.clearInterval(intervalID);



         var contentID = config.gridID;
          
         $("#" + contentID).empty();
          

       //执行子功能：股票信息
        if(tag == 'gupiaoInfo') {
                        var fid = datas.fid;
                        //console.log(tag);
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
                                    cancel:true,     //是否注销
                                    chg:true,        //是否显示涨跌
                                    needHeader: true,       //是否需要头部信息
                                    needshowpric: true,   //是否需要实时更新股价
                                    isdataTable:true,  //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                                    zhengquanAdd:true,       //是否需要添加证券的功能
                                    type:2,           //显示table的类型， 1不带分页， 2，带分页
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

                                //console.log(datas);

                                var dataSource = {
                                    zhengquanName:"qiquan",                         //作为一种标志，显示当前的证券类型
                                    //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                                    key:'price',               //要更新的字段
                                    cancel:true,               //是否显示注销
                                    chg:true,                 //是否显示涨跌
                                    needHeader: true,       //是否需要头部信息
                                    needshowpric: true,   //是否需要实时更新股价
                                    isdataTable:true,            //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                                    zhengquanAdd:true,       //是否需要添加证券的功能
                                    blanceinfo: false ,       //是否需要证券盈利信息
                                    type:2,                  //显示table的类型， 1不带分页， 2，带分页
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
                    //console.log(tag);
                    //获取用户股票信息
                    $.get('/app/zhengquan/getqiquans',{},function(datasBack){
                        var code = datasBack.code;
                        if(code == 205)  {console.log('检测到未登陆.');  }  
                        if(code == 204)  {console.log('错误:getqiquans -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                            var datas = datasBack.datas;
                            var columns = [{field: "code",title: "代码"}, {field:"name" ,title:"期权名" }, {field:"price" ,title:"价格" }   ];

                            //console.log(datas);

                            var dataSource = {
                                zhengquanName:"qiquan",                         //作为一种标志，显示当前的证券类型
                                //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                                key:'price',           //要更新的字段
                                cancel:true,           //是否显示注销
                                chg:true,              //是否显示涨跌
                                needHeader: true,       //是否需要头部信息
                                needshowpric: true,   //是否需要实时更新股价
                                isdataTable:true,        //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                                zhengquanAdd:true,      //是否需要添加证券的功能
                                blanceinfo: false ,       //是否需要证券盈利信息 
                                type:2,                   //显示table的类型， 1不带分页， 2，带分页
                                columns:columns,
                                data:datas,
                                pkID:'qq_id'    //主键的ID名
                            };

                            
                            table5.grid(config.gridID,dataSource ,'qiquan');

                            priceUpdate();

                        }       

                    });  //get end

          } //if end




          //执行子功能：股票资产表
          if(tag == "gupiao_balancesheet") {
            var fid = datas.fid;
            //console.log(tag);
            //获取用户股票信息
            $.get('/app/zhengquan/getgupiaobalance',{},function(datasBack){
                  var code = datasBack.code;
                  if(code == 205)  {console.log('检测到未登陆.');  }  
                  if(code == 204)  {console.log('错误:getgupiaobalance -->',datasBack.err);  }  
                  if(code == 201) { //获取成功
                      var datas = datasBack.datas;
                      var columns = [
                                    {field: "code",  title: "代码"}, 
                                    {field: "name" , title:"名称" },
                                    {field: "price" ,title:"价格" }, 
                                    {field: "count",  title: "持仓数"}, 
                                    {field: "days",  title: "持股时长<br>(平均每股)"},
                                    {field: "jiaoge_yingli" ,title:"交割盈利" } ,
                                    {field: "shiji_yingli" ,title:"实际盈利" }                                  
                                    ];

                      var dataSource = {
                          zhengquanName:"gupiao",  //作为一种标志，显示当前的证券类型
                          key:'price',             //要更新的字段
                          cancel:false,            //是否显示注销
                          chg:false,               //是否显示涨跌
                          needHeader: true,       //是否需要头部信息
                          needshowpric: true,   //是否需要实时更新股价
                          isdataTable:true,            //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                          dealList :true,          //是否需要列出交易明细
                          zhengquanAdd:false,      //是否需要添加证券的功能

                          blanceinfo: {flag:true, key:'shiji_yingli'} ,       //是否需要证券盈利信息   

                          type:2,                  //显示table的类型， 1不带分页， 2，带分页
                          columns:columns,
                          data:datas,
                          pkID:'gp_id'            //主键的ID名
                      };

                      
                      table5.grid(config.gridID,dataSource , 'gupiao');

                      priceUpdate();

                  }       

            });  //get end

          } //if end





          //执行子功能：期权资产表
          if(tag == "qiquan_balancesheet") {
            var fid = datas.fid;
            //console.log(tag);
            //获取用户股票信息
            $.get('/app/zhengquan/getqiquanbalance',{},function(datasBack){
                  var code = datasBack.code;
                  if(code == 205)  {console.log('检测到未登陆.');  }  
                  if(code == 204)  {console.log('错误:getgupiaobalance -->',datasBack.err);  }  
                  if(code == 201) { //获取成功
                      var datas = datasBack.datas;
                      var columns = [
                                    {field: "code",  title: "代码"}, 
                                    {field: "name" , title:"名称" },
                                    {field: "price" ,title:"价格" }, 
                                    {field: "count",  title: "持仓数"}, 
                                    {field: "days",  title: "持股时长<br>(平均每股)"},
                                    {field: "jiaoge_yingli" ,title:"交割盈利" } ,
                                    {field: "shiji_yingli" ,title:"实际盈利" }                                  
                                    ];

                      //console.log(datas);

                      var dataSource = {
                          zhengquanName:"qiquan",  //作为一种标志，显示当前的证券类型
                          key:'price',             //要更新的字段
                          cancel:false,            //是否显示注销
                          chg:false,               //是否显示涨跌
                          needHeader: true,       //是否需要头部信息
                          needshowpric: true,   //是否需要实时更新股价
                          isdataTable:true,            //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                          dealList :true,          //是否需要列出交易明细
                          zhengquanAdd:false,      //是否需要添加证券的功能

                          blanceinfo: {flag:true, key:'shiji_yingli'} ,       //是否需要证券盈利信息   

                          type:2,                  //显示table的类型， 1不带分页， 2，带分页
                          columns:columns,
                          data:datas,
                          pkID:'qq_id'            //主键的ID名
                      };

                      table5.grid(config.gridID,dataSource, 'qiquan');

                      priceUpdate();

                  }       

            });  //get end
 

          } //if end



          //执行子功能：期权智能决策
          if(tag == "qiquan_autoDecision") {
            var fid = datas.fid;
 
                    $.get('/app/zhengquan/getautoqiquans',{},function(datasBack){
                        var code = datasBack.code;
                        if(code == 205)  {console.log('检测到未登陆.');  }  
                        if(code == 204)  {console.log('错误:getautoqiquans -->',datasBack.err);  }  
                        if(code == 201) { //获取成功
                            var datas = datasBack.datas;
                            var columns = [{field:"name" ,title:"持仓期权" }, {field: "code",title: "代码"}, {field:"price" ,title:"价格" }   ];

                            //console.log(datas);

                            var myself_dataSource = {
                                zhengquanName:"qiquan",                         //作为一种标志，显示当前的证券类型
                                //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                                key:'price',           //要更新的字段
                                cancel:false,           //是否显示注销
                                chg:true,              //是否显示涨跌
                                needHeader: true,       //是否需要头部信息
                                needshowpric: true,     //是否需要实时更新股价
                                isdataTable:false,      //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                                zhengquanAdd:false,      //是否需要添加证券的功能
                                blanceinfo: false ,       //是否需要证券盈利信息 
                                type:2,                   //显示table的类型， 1不带分页， 2，带分页
                                columns:columns,
                                data:datas,
                                pkID:'qq_id'    //主键的ID名
                            };
                            table5.grid(config.gridID,myself_dataSource, 'qiquan1');


                            //显示50ETF
                           var etf_columns = [{field:"name" ,title:"期权对象:50ETF" }, {field: "code",title: "代码"},  {field:"price" ,title:"价格" }   ];
                           var etf_datas = [{code:510050, name:'50ETF' , price:'0' }];
                           var etf_dataSource = {
                                zhengquanName:"gupiao",                         //作为一种标志，显示当前的证券类型
                                //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                                key:'price',             //要更新的字段
                                cancel:false,            //是否显示注销
                                chg:true,                //是否显示涨跌
                                needHeader: false,       //是否需要头部信息
                                needshowpric: true,      //是否需要实时更新股价
                                isdataTable:false,       //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                                zhengquanAdd:false,      //是否需要添加证券的功能
                                blanceinfo: false ,       //是否需要证券盈利信息 
                                type:2,                   //显示table的类型， 1不带分页， 2，带分页
                                columns:etf_columns,
                                data:etf_datas,
                                pkID:'qq_id'    //主键的ID名
                            };
                            table5.grid(config.gridID,etf_dataSource, 'etf50');
                            priceUpdate();


                            //显示漏洞信息
                           var leak_columns = [ {field:"myselfqiquan" ,title:"持仓期权" },{field:"referenceqiquan" ,title:"参照物期权" },{field: "to",title: "转化"},  {field:"gains" ,title:"漏洞金额" }   ];
                           var leak_datas = [];
                           var leak_dataSource = {
                                zhengquanName:"leak",                         //作为一种标志，显示当前的证券类型
                                //actual:{flag:true, starttime:config.starttime , endtime:config.endtime , space:config.space , key:'price' },  //是否股价实时显示， true:是， 时间：starttime:'', endtime:''
                                key:'price',             //要更新的字段
                                cancel:false,            //是否显示注销
                                chg:false,                //是否显示涨跌
                                needHeader: true,       //是否需要头部信息
                                needshowpric: false,   //是否需要实时更新股价
                                isdataTable:false,       //是否需要isdataTable模板的jS效果：1.搜索内容，2.分页，3.自适应“+”
                                zhengquanAdd:false,      //是否需要添加证券的功能
                                blanceinfo: false ,       //是否需要证券盈利信息 
                                type:2,                   //显示table的类型， 1不带分页， 2，带分页
                                columns:leak_columns,
                                data:leak_datas,
                                pkID:'qq_id'    //主键的ID名
                            };
                            table5.grid(config.gridID,leak_dataSource, 'leak');
                            priceUpdate();

                            //显示标的对比物





                        }       

                    });  //get end









          } //if end





    }  




    //******实时价格变化功能 ,调用table5对象中实时股价的功能
    function priceUpdate(){
        
        intervalID=window.setInterval("showprice()",config.space);	

    } //function 




    if (typeof window.define === 'function' && window.define.amd) {
        window.define('fun5', [], function () {
            //console.log('AAAAAAA');
            return fun5;
        });
    } else  {global.fun5 = fun5;}
   




}).call(this);