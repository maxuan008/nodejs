
/**
 * Created by mx
 */
 
(function() {
    
   var config = {

   };

   //var flag,codes,code_ids , evalStr , evalstrArr  ,  uuID , key;

   var datas_global ={};
   var evalstrArr= {};

    var zhengquan5 = {
            setNewPricesInfo : setNewPricesInfo,     //设置证券的集合，并从网络获取证券的实时信息
            getNetInfo:getNetInfo,                   //获取一个证券的实时信息
            getevalstrArr: getevalstrArr             //获取所有证券的实时信息集合
        
        };
      
      //获取所有证券的实时信息集合
      function getevalstrArr(tag) {
          console.log('tag标志：'+tag ,  evalstrArr);
          console.log('tag标志 datas_global ：' , evalstrArr[tag] );
         return  evalstrArr[tag];
      }


    //设置证券的集合，并从网络获取证券的实时信息
    function setNewPricesInfo(data) {
       console.log('AAAAAAAA', data);
       var tag = data.tag;

       evalstrArr[tag] = {};
       datas_global[tag] = {};
       datas_global[tag].flag = data.type, datas_global[tag].codes = data.codes , datas_global[tag].code_ids = data.code_ids;
       datas_global[tag].uuID = data.uuID  , datas_global[tag].key = data.key ;

       console.log(datas_global);

       var flag  =datas_global[tag].flag  ,  codes  =datas_global[tag].codes  ,   code_ids  =datas_global[tag].code_ids  ;
       var uuID  =datas_global[tag].uuID  ,  key  =datas_global[tag].key   ; 
       
       if(codes.length <=0) return ;

       if(flag == 'gupiao') {  //如果为股票类型
                var listid = "list=fx_shkdcny"; //添加港币汇率
                datas_global[tag].evalStr = {fx_shkdcny:'hq_str_fx_shkdcny'}; //设置港币汇率
                for(var i=0; i<codes.length; i++) {

                    var  tmpcode = processCode(codes[i],tag);
                    listid= listid + "," +tmpcode;

                } //for end 
                
       } //if end


       if(flag == 'qiquan') {  //如果为股票类型
                var listid = "list=sh510050"; //添加港币汇率
                datas_global[tag].evalStr = { "510050" : "hq_str_sh510050" }; //设置510050
                for(var i=0; i<codes.length; i++) {
                    var  tmpcode = processCode(codes[i],tag);
                    listid= listid + "," +tmpcode;
                } //for end 
                                
       } //if end


       //从网络上获取证券股价的实时信息
       getNewPriceInfos(listid,tag);


    }




    //从网络上获取证券股价的实时信息
    function  getNewPriceInfos(listid,tag) {
      var flag  =datas_global[tag].flag  ,  codes  =datas_global[tag].codes  ,   code_ids  =datas_global[tag].code_ids  ;
      var uuID  =datas_global[tag].uuID  ,  key  =datas_global[tag].key   ; 
      var evalStr = datas_global[tag].evalStr  ; 

	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",
	
            success : function(){
                console.log('获取成功。');
                //evalstrArr={};
                if(flag == 'gupiao')  evalstrArr[tag]={fx_shkdcny : eval(evalStr['fx_shkdcny']).split(',')};
                if(flag == 'qiquan')  evalstrArr[tag]={"510050" : eval(evalStr["510050"]).split(',')};

                for(var i=0;i<codes.length; i++ ) {
                    var code = codes[i];
                     evalstrArr[tag][code] = eval(evalStr[code]).split(',');
                } //for end
                
                console.log('1111111111:',evalstrArr);
                //console.log('证券实时信息集合：',evalstrArr);
                //updateZhengquanPrice();   //开始更新证券价格     
                 
            } //success end

      })  //$.ajax end 

    } //function end








    //获取证券的实时信息
    function getNetInfo(code ,tag) {

        var result={};
 
      var flag  =datas_global[tag].flag  ,  codes  =datas_global[tag].codes  ,   code_ids  =datas_global[tag].code_ids  ;
      var uuID  =datas_global[tag].uuID  ,  key  =datas_global[tag].key   ; 
      var evalStr = datas_global[tag].evalStr , evalstrArr_tmp =  evalstrArr[tag] ; 

        
        //获取港币汇率
        if(code == 'fx_shkdcny')   {result.newPrice = evalstrArr_tmp[code][1]; result.newName=evalstrArr_tmp[code][0];   }
        else if(code == '510050')  {result.newPrice = evalstrArr_tmp[code][3]; result.newName=evalstrArr_tmp[code][0];   }  
        else {
            //股票类型
            if(flag == 'gupiao') {  
                if(code.length == 5) {  //香港证券
                    result.newPrice=evalstrArr_tmp[code][10];
                    result.newName=evalstrArr_tmp[code][1];
                    result.yesterPrice = evalstrArr_tmp[code][3];
                }
                if(code.length == 6) { //大陆证券
                    result.newPrice=evalstrArr_tmp[code][3] ;
                    result.newName=evalstrArr_tmp[code][0] ;
                    result.yesterPrice = evalstrArr_tmp[code][2] ;
                }

            } //if(flag == 'gupiao') end

            //期权类型
            if(flag == 'qiquan') {  //获取期权的价格，名称， 买1，买1数量， 卖1，卖1数量
                    result.newPrice=evalstrArr_tmp[code][2] * 1.00;
                    result.newName=evalstrArr_tmp[code][37];
                    result.yesterPrice = evalstrArr_tmp[code][9];

                    result.buy1=evalstrArr_tmp[code][1];
                    result.buy1_count=evalstrArr_tmp[code][0];

                    result.sale1=evalstrArr_tmp[code][3];
                    result.sale1_count=evalstrArr[code][4];                  

            }  // if(flag == 'qiquan')  end


            //******************//


        } //if end


        return result;
    }




   //加工证券请求的参数
   //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
   function processCode(code,tag) {
       var tmpcode='';
       var flag = datas_global[tag].flag;
       if(flag == 'gupiao') {  //如果为股票类型
           //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
           var sh_txt = "6,5,9," ;     //上海交易所证券代码的开头
           var sz_txt = "0,1,2,3,";    //深圳交易所证券代码的开头
           
            if(code.length == 6  && code != 'null')  {  //上海或深圳交易所
                if(sh_txt.indexOf(code[0]) != -1  )     {tmpcode= "sh" + code; datas_global[tag].evalStr[code] = "hq_str_sh" + code; } //上海
				else if(sz_txt.indexOf(code[0]) != -1 ) {tmpcode= "sz" + code; datas_global[tag].evalStr[code] = "hq_str_sz" + code; } //深圳			  
		    } //if end
		  
           if(code.length  == 5 && code != 'null' ) {tmpcode= "hk" + code; datas_global[tag].evalStr[code] = "hq_str_hk" + code;} //香港交易所的证券
       } //if end


    if(flag == 'qiquan') {  //如果为期权类型
         tmpcode= "CON_OP_" + code;
         datas_global[tag].evalStr[code] = "hq_str_CON_OP_" + code;
    } //if end

       return tmpcode;
   }







    global = this;

    if (typeof window.define === 'function' && window.define.amd) {
        window.define('zhengquan5', [], function () {
            //console.log('AAAAAAA');
            return zhengquan5;
        });
    } else  {global.zhengquan5 = zhengquan5;}
   




}).call(this);


