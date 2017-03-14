
/**
 * Created by mx
 */
 

 //使用混合的构造函数/原型
 function zhengquan5(data,codes , code_ids) {
    //this.data = data;
    this.tag=data.tag;

    this.flag=data.type;
    this.uuID=data.uuID;
    this.key=data.key;
    
    this.codes = codes;
    this.code_ids = code_ids;
   
    this.evalStr ={};              //存储证券获取实时价格的各个cript的变量的名
    this.evalstrArr={};            //存储所有证券的实时价格信息
    this.listid = "";              //获取网络请求的参数

    this.backFlag = 0;   //证券信息是否已经返回标识

 }






//*****函数1：设置证券获取实时价格的各个cript的变量的名
zhengquan5.prototype.setEvalStr = function setEvalStr(){
       var flag  = this.flag  ,  codes  = this.codes  ,   code_ids = this.code_ids  ;
       var uuID  = this.uuID  ,  key  = this.key   ; 

       //console.log('gupiao codes:',flag ,codes);
       var  listid = '';
       
       if(codes.length <=0) return ;

       if(flag == 'gupiao') {  //如果为股票类型
                var listid = "list=fx_shkdcny"; //添加港币汇率
                this.evalStr = {fx_shkdcny:'hq_str_fx_shkdcny'}; //设置港币汇率
                
       } //if end


       if(flag == 'qiquan' || flag == 'refer_qiquan' ) {  //如果为50etf期权类型
                var listid = "list=sh510050"; //添加港币汇率
                this.evalStr = { "510050" : "hq_str_sh510050" }; //设置510050                                
       } //if end

        for(var i=0; i<codes.length; i++) {
            var  tmpcode = this.processCode_EvalStr(codes[i]);
            listid= listid + "," +tmpcode;
        } //for end 

       this.listid = listid;

       //console.log('listid:',listid);
       //console.log("evalStr:", this.evalStr);

       return listid;
       
};



//******处理code,成规定格式的list参数

   //加工证券请求的参数
   //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
  zhengquan5.prototype.processCode_EvalStr =  function (code) {
       var tmpcode='';
       var flag = this.flag;
       if(flag == 'gupiao') {  //如果为股票类型
           //判断股票属于哪个交易所，如：上海交易所，深圳交易所，香港交易所...
           var sh_txt = "6,5,9," ;     //上海交易所证券代码的开头
           var sz_txt = "0,1,2,3,";    //深圳交易所证券代码的开头
           
            if(code.length == 6  && code != 'null')  {  //上海或深圳交易所
                if(sh_txt.indexOf(code[0]) != -1  )     {tmpcode= "sh" + code; this.evalStr[code] = "hq_str_sh" + code; } //上海
				else if(sz_txt.indexOf(code[0]) != -1 ) {tmpcode= "sz" + code; this.evalStr[code] = "hq_str_sz" + code; } //深圳			  
		    } //if end
		  
           if(code.length  == 5 && code != 'null' ) {tmpcode= "hk" + code; this.evalStr[code] = "hq_str_hk" + code;} //香港交易所的证券
       } //if end


    if(flag == 'qiquan' || flag == 'refer_qiquan' ) {  //如果为期权类型
         tmpcode= "CON_OP_" + code;
         this.evalStr[code] = "hq_str_CON_OP_" + code;
    } //if end

       return tmpcode;
   }










    //从网络上获取证券股价的实时信息
    zhengquan5.prototype.setEvalstrArr =  function  () {
     // var flag  =datas_global[tag].flag  ,  codes  =datas_global[tag].codes  ,   code_ids  =datas_global[tag].code_ids  ;
     // var uuID  =datas_global[tag].uuID  ,  key  =datas_global[tag].key   ; 
     // var evalStr = datas_global[tag].evalStr  ; 

      var flag = this.flag;
      var codes = this.codes;

      var listid = this.listid;
      var evalStr = this.evalStr;

      this.backFlag = 0;

	  $.ajax({
	        cache : true,
	        url:"http://hq.sinajs.cn/"+listid,
	        type : "GET",
	        dataType : "script",
	
            success : function(){
                console.log('获取成功。');
                
                var evalstrArr = {};
                if(flag == 'gupiao')  evalstrArr={fx_shkdcny : eval(evalStr['fx_shkdcny']).split(',')};
                if(flag == 'qiquan')  evalstrArr={"510050" : eval(evalStr["510050"]).split(',')};

                for(var i=0;i<codes.length; i++ ) {
                    var code = codes[i];
                     evalstrArr[code] = eval(evalStr[code]).split(',');
                } //for end

                
                this.evalstrArr = evalstrArr;
                this.backFlag = 1;
                //console.log('evalstrArrQQQQQQQQQQQQQQQQQQQQQQQQQ:',this.evalstrArr);
                //console.log('证券实时信息集合：',evalstrArr);
                //updateZhengquanPrice();   //开始更新证券价格     
                 
            } //success end

      })  //$.ajax end 

    } //function end





    //获取证券的实时信息
    zhengquan5.prototype.getNetInfo = function (code,evalstrArr_tmp ) {

        var result={code:code};
 
      //var flag  =datas_global[tag].flag  ,  codes  =datas_global[tag].codes  ,   code_ids  =datas_global[tag].code_ids  ;
      //var uuID  =datas_global[tag].uuID  ,  key  =datas_global[tag].key   ; 

      var flag = this.flag;
      var codes = this.codes;
      var evalStr = this.evalStr ;
      //var  evalstrArr_tmp =  evalstrArr ; 

        
        //获取港币汇率
        //console.log(code ,evalstrArr_tmp );
        if(code == 'fx_shkdcny')   {result.newPrice = evalstrArr_tmp[code][1]; result.newName=evalstrArr_tmp[code][0];   }
        else if(code == '510050')  {result.newPrice = evalstrArr_tmp[code][3]; result.newName=evalstrArr_tmp[code][0]; result.yesterPrice = evalstrArr_tmp[code][2] ;  }  
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
            if(flag == 'qiquan' || flag == 'refer_qiquan' ) {  //获取期权的价格，名称， 买1，买1数量， 卖1，卖1数量
                    result.newPrice=evalstrArr_tmp[code][2] ;
                    result.newName=evalstrArr_tmp[code][37];
                    result.yesterPrice = evalstrArr_tmp[code][9];

                    result.buy1=evalstrArr_tmp[code][1];
                    result.buy1_count=evalstrArr_tmp[code][0];

                    result.sale1=evalstrArr_tmp[code][3];
                    result.sale1_count=evalstrArr_tmp[code][4];                  

            }  // if(flag == 'qiquan')  end


            //******************//


        } //if end


        return result;
    }




    //证券信息是否已经返回
    zhengquan5.prototype.getBackStatus = function () {

        return this.backFlag;
    }

    //
    zhengquan5.prototype.getevalStr = function () {

        return this.evalStr;
    }





