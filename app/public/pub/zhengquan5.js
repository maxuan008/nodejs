
/**
 * Created by mx
 */
 
(function() {
    
   var config = {

   };

   var flag,codes,code_ids , evalStr , evalstrArr  ,  uuID , key;

    var zhengquan5 = {
            setNewPricesInfo : setNewPricesInfo     //设置证券的集合，并从网络获取证券的实时信息
        
        };
      

    //设置证券的集合，并从网络获取证券的实时信息
    function setNewPricesInfo(data) {
       //console.log('AAAAAAAA', data);
       flag = data.type, codes = data.codes , code_ids = data.code_ids;
       uuID = data.uuID  , key = data.key ;
       
       if(codes.length <=0) return ;

       if(flag == 'gupiao') {  //如果为股票类型
                var listid = "list=fx_shkdcny"; //添加港币汇率
                evalStr = {fx_shkdcny:'hq_str_fx_shkdcny'}; //设置港币汇率
                for(var i=0; i<codes.length; i++) {

                    var  tmpcode = processCode(codes[i]);
                    listid= listid + "," +tmpcode;

                } //for end 
                
       } //if end


       if(flag == 'qiquan') {  //如果为股票类型
                var listid = "list=sh510050"; //添加港币汇率
                evalStr = { "510050" : "hq_str_sh510050" }; //设置510050
                for(var i=0; i<codes.length; i++) {
                    var  tmpcode = processCode(codes[i]);
                    listid= listid + "," +tmpcode;
                } //for end 
                
                //从网络上获取证券股价的实时信息
                

       } //if end

       //从网络上获取证券股价的实时信息
       getNewPriceInfos(listid);


    }




    //从网络上获取证券股价的实时信息
    function  getNewPriceInfos(listid) {
	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",
	
            success : function(){
                console.log('获取成功。');
                evalstrArr={};
                if(flag == 'gupiao') evalstrArr={fx_shkdcny : eval(evalStr['fx_shkdcny']).split(',')};
                if(flag == 'qiquan') evalstrArr={"510050" : eval(evalStr["510050"]).split(',')};

                for(var i=0;i<codes.length; i++ ) {
                    var code = codes[i];
                    evalstrArr[code] = eval(evalStr[code]).split(',');
                } //for end
                
                console.log(evalstrArr );

                updateZhengquanPrice();   //开始更新证券价格
                 
            } //success end

      })  //$.ajax end 

    } //function end


    //开始更新页面所有的证券价格
    function updateZhengquanPrice() {
   
            for(var i=0;i<codes.length; i++ ) {          
                changePrice_html(codes[i] )  ; //更新网页上的证券价格       
            } //for end

    }


   //更新网页上的证券价格
   function  changePrice_html(code ) {
        var netInfo = getNetInfo(code);
        var newPrice = netInfo.newPrice ;
        var newName = netInfo.newName ;

        var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
        var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值

        var zhengquanInfo = getTd_zhengquanInfo(code);
        var oldPrice = zhengquanInfo.oldPrice;
        var oldName = zhengquanInfo.oldName;

        if(oldPrice != newPrice) $(td_priceID).text(newPrice);  //股价变化，则更新
        if(oldName != newName) $(td_nameID).text(newName);      //证券名变化，则更新

   }


   //从页面上获取价格和名称信息
   function getTd_zhengquanInfo(code) {
        var result = {};

        var td_priceID = "#td_" + key + "_" + code_ids[code]  + "_" + uuID;  //获取价格的td的id值
        var td_nameID = "#td_name_" + code_ids[code]  + "_" + uuID;  //获取名称的td的id值
        var oldPrice = $(td_priceID).text().trim();
        var oldName = $(td_nameID).text().trim();

        result.oldPrice = oldPrice;
        result.oldName = oldName;

        return result;
   }




    //获取证券的实时信息
    function getNetInfo(code) {

        var result={};
        
        //获取港币汇率
        if(code == 'fx_shkdcny')   {result.newPrice = evalstrArr[code][1]; result.newName=evalstrArr[code][0];   }
        else if(code == '510050')  {result.newPrice = evalstrArr[code][3]; result.newName=evalstrArr[code][0];   }  
        else {
            //股票类型
            if(flag == 'gupiao') {  
                if(code.length == 5) {  //香港证券
                    result.newPrice=evalstrArr[code][6];
                    result.newName=evalstrArr[code][1];
                }
                if(code.length == 6) { //大陆证券
                    result.newPrice=evalstrArr[code][3];
                    result.newName=evalstrArr[code][0];
                }

            } //if(flag == 'gupiao') end

            //期权类型
            if(flag == 'qiquan') {  //获取期权的价格，名称， 买1，买1数量， 卖1，卖1数量
                    result.newPrice=evalstrArr[code][2];
                    result.newName=evalstrArr[code][37];

                    result.buy1=evalstrArr[code][1];
                    result.buy1_count=evalstrArr[code][0];

                    result.sale1=evalstrArr[code][3];
                    result.sale1_count=evalstrArr[code][4];                  

            }  // if(flag == 'qiquan')  end


            //******************//


        } //if end


        return result;
    }




   //加工证券请求的参数
   //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
   function processCode(code) {
       var tmpcode='';
       if(flag == 'gupiao') {  //如果为股票类型
           //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
           var sh_txt = "6,5,9," ;     //上海交易所证券代码的开头
           var sz_txt = "0,1,2,3,";    //深圳交易所证券代码的开头
           
            if(code.length == 6  && code != 'null')  {  //上海或深圳交易所
                if(sh_txt.indexOf(code[0]) != -1  )     {tmpcode= "sh" + code; evalStr[code] = "hq_str_sh" + code; } //上海
				else if(sz_txt.indexOf(code[0]) != -1 ) {tmpcode= "sz" + code; evalStr[code] = "hq_str_sz" + code; } //深圳			  
		    } //if end
		  
           if(code.length  == 5 && code != 'null' ) {tmpcode= "hk" + code; evalStr[code] = "hq_str_hk" + code;} //香港交易所的证券
       } //if end


    if(flag == 'qiquan') {  //如果为期权类型
         tmpcode= "CON_OP_" + code;
         evalStr[code] = "hq_str_CON_OP_" + code;
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


