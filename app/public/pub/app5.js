/**
 * Created by mx
 */
var fun5 = window.fun5;

(function() {
    
   var sessionInfo = {};      //session信息

   var info = {};       //用户基本信息
   var prjs = {};       //用户所有能拥有的项目
   var selectprj = {};  //用户选择的项目

   var selectprjInfo = {};
   var selectroleInfo = {};
   var defaultFid = '';

   var config = {
       loginUrl: "http://localhost:1111/"
   };



   //app5:主要用于网页框架的基础信息构建，包含设置 用户基本信息，网页头部信息，  左侧功能导航信息； 
  //      函数：高亮自己; 
  //      函数：执行子功能， 调用子功能对象fun5.  将子功能数据： 开发标签， 基础信息传入fun5.
    var app5 = {
            
            //setHeader:  setHeader ,            //设置头部信息
            //setNav : setNav ,                  //设置导航信息
            //setPostion :  setPostion  ,        //设置位置信息  
            // showMyself : showMyself ,         //高亮子功能列表
           // init:                             //初始化HTML页面上的数据:用户信息，导航子功能列表， 位置数据 ， 高亮
           //insertFunNavHtml(fid)  ,           //功能导航上加入一条功能
           //getFunInfo(fid)         ,          //获取功能的基本信息

            htmlinit:  htmlinit ,             //后台获取session信息，并初始化网站页面的基础信息.
            doFun: doFun,                     //执行子功能
            doDefaultFun: doDefaultFun,      //执行默认的子功能：页面刷新和初次加载时自动调用
            lagout:   lagout                 //登出

        };
      
      global = this;
    
    

    //页面初始化
    function htmlinit() {   

        $.get("/session/getsessioninfo",{},function(datasBack){
            var code = datasBack.code;
            if(code == 205)  {console.log('检测到未登陆.');  }  

            if(code == 204)  {console.log('错误:getSessionInfo -->',datasBack.err);  }  

            if(code == 201) { //获取
              var datas = datasBack.datas;

               sessionInfo = datas;
               info = sessionInfo.info ;       //用户基本信息
               prjs = sessionInfo.prjs ;       //用户所有能拥有的项目
               selectprj = sessionInfo.selectprj ;  //用户选择的项目
             
               //完善选择项目信息
               var pid = selectprj.pid;
               var rid = selectprj.rid;

               for(var i=0; i < prjs.length; i++) {
                    if(pid == prjs[i].pid) {
                        selectprjInfo = prjs[i];
                        
                        for(var j=0; j<selectprjInfo.roles.length; j++) {
                            if(rid == selectprjInfo.roles[j].rid) { selectroleInfo = selectprjInfo.roles[j]; break;  }
                        }  //for end
                        break;
                    } //if end

               } //for end


            console.log("info",info); console.log("prjs",prjs);console.log("selectprj",selectprj);
            console.log("selectprjInfo",selectprjInfo);console.log("selectroleInfo",selectroleInfo);

              init();
                
            }

        });



    }

    //初始化HTML页面
    function init() {

        setHeader();
        setNav();
        setPostion();
        showMyself();
        doDefaultFun();
        

    }


    //执行默认子功能
    function doDefaultFun(){
        console.log('初始化FID：',defaultFid);
        doFun(defaultFid);

    }

    //执行子功能， 调用子功能对象fun5.  将子功能数据： 开发标签， 基础信息传入fun5.
    function doFun(fid) {
        var fun = getFunInfo(fid);
        var tag =  fun.tag; // console.log(fid, tag);
        //调用子功能对象
        
        if(tag != undefined  ) {
            var datas = {fid:fid,  info:info  ,   prjs : prjs   , selectprj : selectprj , selectprjInfo: selectroleInfo  };
            fun5.execute(tag, datas);
        }  
       

       //高亮导航子功能
       showMyself(fid);
    }




    //设置头部信息
    function setHeader(){
        $("#fullname").text(info.fullname);
        $("#rolename").text(selectroleInfo.role_name);
    }

     //设置导航信息
    function setNav(){
        var fids = selectprj.fids;

        var urlstr = location.href;
        var num = urlstr.indexOf('#');

        if(num >-1) defaultFid = urlstr.substr(num + 1);

        for(var i=0;i<fids.length ;i++) {
            if(num == -1 && i==0) defaultFid = fids[i];
            insertFunNavHtml(fids[i]);
        }

    }
    
    //功能导航上加入一条功能
    function insertFunNavHtml(fid) {
        var fun = getFunInfo(fid);

        var htmlstr = "" +
               " <ul class='nav' id='main-nav'> " +
               "      <li id='li_" + fid + "' fid='" + fid + "' class='' onclick='doFun(this)'><a href='#" + fid + "'><i class='fa fa-sitemap' aria-hidden='true'></i> " +   
               "              <span>" + fun.fun_name + "</span>" +
               "      </a> </li>" +
               "  </ul>" ;
        $("#funnav").append(htmlstr);

    }

    //获取功能的信息
    function getFunInfo(fid) {
        var res={};
        for(var i=0;i<selectprjInfo.funs.length;i++) {
            var fun = selectprjInfo.funs[i];
            if(fid == fun.fid) {res = fun;break;} 
        }

        return res;
    }

    //设置项目名
    function setPostion(){
        $("#prjname").text(selectprjInfo.prj_name);

    }

    //高亮子功能
    function showMyself(fid){
        var fids = selectprj.fids;
        for(var i=0;i<fids.length;i++) {
            if(fid != fids[i]  )  $("#li_" + fids[i] ).attr('class','');
            if(fid == fids[i]  )  $("#li_" + fids[i] ).attr('class','active-item');
        }
        var funinfo = getFunInfo(fid);
        
        $("#funname").text(funinfo.fun_name);
        
    }




    //登出
    function lagout(){

        $.get("/app/zhengquan/lagout",{},function(datasBack){
            var code = datasBack.code;
            if(code == 205)  {console.log('检测到未登陆.');  }  

            if(code == 204)  {console.log('错误:getSessionInfo -->',datasBack.err);  }  

            if(code == 201) { //返回登陆页面
                var newurl = config.loginUrl;
				window.location.href = newurl;
            }

        });
    }




    if (typeof window.define === 'function' && window.define.amd) {
        window.define('app5', [], function () {
            console.log('AAAAAAA');
            return app5;
        });
    } else  {global.app5 = app5;}
   






}).call(this);