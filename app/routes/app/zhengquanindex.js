var express = require('express');
var fs = require('fs');
var path = require('path');
var assert=require('assert');
var async = require('async');
var moment = require('moment');
var mysql = require('./mysql/mysql');
var templater = require("./module/templater");

var appconfig = require('../../config/appconfig.json');
var cloudfile = require("./zhengquan/module/cloudfile");
var zhengquan = require("./zhengquan/module/zhengquan");

var xl =require('xlsx');
var lineReader = require('line-reader');


var router = express.Router();

router.get('/',index);   //进入首页
router.get('/lagout',lagout);   //登出
router.get('/getgupiaos',getgupiaos);  //获取股票列表信息
router.post('/addzhengquan',addzhengquan);  //添加证券
router.post('/delzhengquan',delzhengquan);  //删除证券

router.get('/getqiquans',getqiquans);  //获取期权列表信息
router.post('/updatezhengquan',updatezhengquan);  //更新数据库证券信息

router.get('/getgupiaobalance',getgupiaobalance);  //获取用户的所有股票交易数据
router.get('/getqiquanbalance',getqiquanbalance);  //获取用户的所有期权交易数据

router.post('/deallistzhengquan',deallistzhengquan);  //获取用户的某个证券的交易数据

router.get('/getautoqiquans',getautoqiquans);  //获取期权智能决策的期权信息

router.get('/getreferqiquans',getreferqiquans);  //获取期权智能决策的期权信息

router.get('/getdealfiles',getdealfiles);  //获取交易文件的数据
router.post('/deldealfile',deldealfile);  //删除交易文件
router.post('/uploaddealfile',uploaddealfile);  //上传交易文件
router.post('/analyseimportfile',analyseimportfile);  //分析并导入交易文件






//分析并导入交易文件
function analyseimportfile(req ,res) {
    console.log(111);
    var df_id = req.body.id , userid = req.session.userdatas.info.uid  ;
    if(df_id =='' || df_id == undefined ) return  res.send({code:204,err:"id数据不正确" });

    //导入交易数据
    cloudfile.analyseimportfile(df_id, userid ,function(err,docs){ 
        if(err) return res.send({code:204,err:err});
        else return res.send({code:201});
    });


}




 //上传交易文件
function uploaddealfile(req ,res) {
    var type = req.query.typevalue , userid = req.session.userdatas.info.uid  ;
    if(type =='' || type == undefined ) return  res.send({code:204,err:"type数据不正确" });

    var rootpath = appconfig[global.mgENV].file.pathroot + "/" + req.session.userdatas.info.username + "_" + userid ;

    console.log(type , rootpath );
    //1.向将文件保存到指定目录   2.数据库中存入文件
    cloudfile.uploadfile(rootpath,req,function(err,data){
        if(err)  return  res.send({code:204 , err:err});
        console.log(data);
        var table = "deal_file" ,time = new Date();
        var datajson = {path:rootpath ,filetype:data.filetype, filename:data.filename, diskname:data.diskname, size:data.size,  userid: userid ,type: type , createtime:time  };
        templater.add(table,datajson,function(err,doc){
            if(err) return res.send({code:204,err:err});
            datajson.df_id =  doc.insertId;
            return res.send({code:201,datas:datajson });
        });

    });

}


function index(req,res) {
     var htmlpath = path.join(__dirname, '../../views/app/index.html');
     //console.log('HHHHHH',htmlpath);
     return  res.sendFile(htmlpath);

}



//登出
function lagout(req ,res) {

    delete req.session.userdatas;
    return res.send({code:201   });

}


 //获取股票列表信息
function  getgupiaos(req,res) {
    //global.db = req.session.userdatas.selectprj.dbname;
    var userid = req.session.userdatas.info.uid;


    templater.SQL("CALL s_zhengquan_getgupiaos(" + userid + ")", function(err,docs){
        if(err) return res.send({code:204,err:err});

        res.send({code:201,datas:docs[0]});

    });  //templater.SQL end 

}


//添加证券
function addzhengquan(req,res) {
    var userid = req.session.userdatas.info.uid;

    var zhengquanname = req.body.zhengquanname , codevalue = req.body.codevalue;

    if(zhengquanname =='' || zhengquanname == undefined  || codevalue == '' ||  codevalue == undefined  )  return res.send({code:204,err:'传递参数不正确'});


    //templater.isExist = function (table, wherejson, 

    var sqlstr='' , table ='';
    if(zhengquanname == 'gupiao') {  //添加股票
        table ='gupiao';
    } else if(zhengquanname == 'qiquan') {  //添加期权
        table ='qiquan';
    } else if(zhengquanname == 'refer_qiquan') {
        table ='refer_qiquan';
    }
    
    else  return res.send({code:204,err:'传递证券名无法匹配'});


    sqlstr = "CALL s_isUserZhengquanExist('" + table + "' , '" + codevalue + "'   ,   " + userid + ")";

    templater.SQL(sqlstr, function(err,docs){
        console.log(docs);
        if(err) return res.send({code:204,err:err});

        var zhengquancount = docs[0][0].zhengquancount;
        if(zhengquancount > 0 ) return res.send({code:204,err:'用户的此证券已存在'});
        else if(zhengquancount <= 0) { //不存在则开始插入，此证券。
            var time = new Date();
            var data = {code:codevalue  ,  userid: userid  , createtime:time  };
            templater.add(table,data,function(err,doc){
                if(err) return res.send({code:204,err:err});
                return res.send({code:201,datas:{id:doc.insertId}});
            });
        }

    });  //templater.SQL end 

}



//删除证券
function delzhengquan(req , res) {
    var zhengquanname = req.body.zhengquanname , ID =req.body.id;

    if(zhengquanname =='' || zhengquanname == undefined  || ID == '' ||  ID == undefined  )  return res.send({code:204,err:'传递参数不正确'});

    var sqlstr='' , table ='' , wherestr = '';
    if(zhengquanname == 'gupiao') {  //添加股票
        table ='gupiao';  wherestr = " `gp_id` = " + ID  ;
    } else if(zhengquanname == 'qiquan') {  //添加期权
        table ='qiquan';  wherestr = " `qq_id` = " + ID;
    } else if(zhengquanname == 'refer_qiquan') {
        table ='refer_qiquan'; wherestr = " `rq_id` = " + ID;
    }
    else  return res.send({code:204,err:'传递证券名无法匹配'});

    sqlstr = "update `" + table + "` set `status` = 0  where  " + wherestr;

    templater.SQL(sqlstr, function(err,docs){
        if(err) return res.send({code:204,err:err});

        res.send({code:201});

    });  //templater.SQL end 


}



//删除交易文件
function deldealfile(req , res) {
    var  ID =req.body.id , userid = req.session.userdatas.info.uid;

    //console.log(req.session.userdatas);

    if( ID == '' ||  ID == undefined  )  return res.send({code:204,err:'传递参数不正确'});

    var table ='deal_file' ,  wherestr = " userid = '" + userid + "'  and   `df_id` = " + ID 
    var sqlstr = "update `" + table + "` set `status` = 0  where  " + wherestr;

    templater.SQL(sqlstr, function(err,docs){
        if(err) return res.send({code:204,err:err});

        res.send({code:201});

    });  //templater.SQL end 


}





//获取期权列表信息
function getqiquans(req,res) {
    //global.db = req.session.userdatas.selectprj.dbname;
    var userid = req.session.userdatas.info.uid;


    templater.SQL("CALL s_zhengquan_getqiquans(" + userid + ")", function(err,docs){
        if(err) return res.send({code:204,err:err});

        res.send({code:201,datas:docs[0]});

    });  //templater.SQL end 

}


//
function updatezhengquan(req,res) {
    var id = req.body.id ,  flag = req.body.flag,  name =  req.body.name  , price = req.body.price;
    if(flag =='' || flag == undefined  || name == '' ||  name == undefined   || price == '' ||  price == undefined   ) return res.send({code:204,err:'传递参数不正确'});
    

    if(flag == "qiquan")   {  //更新股票
        var data ={name:name ,  price:price };
        var table = 'qiquan' ,  wherejson = {qq_id:id };

    } else if(flag == "gupiao") {  //更新期权
        var data ={name:name ,  price:price };        
        var table = 'gupiao' ,  wherejson =  {gp_id:id  } ;

    } else if(flag == "refer_qiquan") { //更新期权参造物
        var data ={name:name ,  sale1:price };        
        var table = 'refer_qiquan' ,  wherejson =  {rq_id:id  } ;
        
    } else {

        var data ={name:name ,  price:price };        
        var table = 'gupiao' ,  wherejson =  {gp_id:id  } ;
    }
    

    //更新数据库
    templater.update( table, wherejson,  data , function(err,docs) {
         if(err) return res.send({code:204,err:err});
         else return res.send({code:201});
    });


}



//获取股票交易数据
function getgupiaobalance(req,res) {
        var userid = req.session.userdatas.info.uid;
        templater.SQL("CALL s_zhengquan_getgupiaobalance(" + userid + ")", function(err,docs){
        if(err) return res.send({code:204,err:err});
         var results =docs[0];
         
         var t = -1;
         async.eachSeries(results,function(doc,callback){
            var gp_id = doc.gp_id;
            t++;
            templater.SQL("CALL s_zhengquan_getgupiaodeal( " + userid + "," + gp_id + ")", function(err,docs){
                if(err) console.log(err);
                var dealDocs = docs[0];
                //console.log(dealDocs);
                if(docs.length <= 0) { return  callback(); }  
                else { 
                    
                    var totalBuy = 0 ,count = 0 , jiaoge_yingli = 0 , shiji_yingli=0  ,days=0;
                    var  buyStamp = 0, sellStamp = 0;
                    for(var i=0;i< dealDocs.length;i++) { //遍历此股票的交易记录
                        if(dealDocs[i].flag == 1) {  //买入股票记录
                            totalBuy = totalBuy + 0 +  dealDocs[i].count;
                            count = count + 0 +  dealDocs[i].count;
                            jiaoge_yingli  = jiaoge_yingli - 0.00 - dealDocs[i].deal_money;

                            buyStamp = buyStamp + dealDocs[i].count * Date.parse( dealDocs[i].dealdate  );  //累加买入时长
                        }  //if end

                        if(dealDocs[i].flag == 2) {  //卖出股票记录
                             count =count + 0 -  dealDocs[i].count;
                             jiaoge_yingli  = jiaoge_yingli - 0.00 + dealDocs[i].deal_money;
                             sellStamp = sellStamp + dealDocs[i].count * Date.parse( dealDocs[i].dealdate  );//累加卖出时长

                        }//if end


                    }//for  end
                    
                    days = [ count * Date.parse(new Date()) + sellStamp -  buyStamp ] / (totalBuy * 86400000) ;
                    days = days.toFixed(0);
                    shiji_yingli = jiaoge_yingli + 0 + count*doc.price;
                    jiaoge_yingli = jiaoge_yingli.toFixed(2);
                    shiji_yingli = shiji_yingli.toFixed(2);
                    
                    results[t].jiaoge_yingli = jiaoge_yingli ;
                    results[t].shiji_yingli = shiji_yingli ;
                    results[t].count = count ;
                    results[t].days = days ;
                    
                   return callback();

                } // if end
            });


         },function(err){
             if(err) return res.send({code:204,err:err});
             res.send({code:201,datas:results});

         });


       

    });  //templater.SQL end 


}








//获取股期权交易数据
function getqiquanbalance(req,res) {
        var userid = req.session.userdatas.info.uid;
        templater.SQL("CALL s_zhengquan_getqiquanbalance(" + userid + ")", function(err,docs){
        if(err) return res.send({code:204,err:err});
         var results =docs[0];
         
         var t = -1;
         async.eachSeries(results,function(doc,callback){
            var qq_id = doc.qq_id;
            t++;
            templater.SQL("CALL s_zhengquan_getqiquandeal( " + userid + "," + qq_id + ")", function(err,docs){
                if(err) console.log(err);
                var dealDocs = docs[0];
                //console.log(dealDocs);
                if(docs.length <= 0) { return  callback(); }  
                else { 
                    
                    var  totalBuy = 0 ,count = 0 , jiaoge_yingli = 0 , shiji_yingli=0  ,days=0;
                    var  buyStamp = 0, sellStamp = 0;
                    for(var i=0;i< dealDocs.length;i++) { //遍历此证券的交易记录
                        if(dealDocs[i].flag == 1) {  //买入证券记录
                            totalBuy = totalBuy + 0 +  dealDocs[i].count;
                            count = count + 0 +  dealDocs[i].count;
                            jiaoge_yingli  = jiaoge_yingli - 0.00 - dealDocs[i].deal_money;

                            buyStamp = buyStamp + dealDocs[i].count * Date.parse( dealDocs[i].dealdate  );  //累加买入时长
                        }  //if end

                        if(dealDocs[i].flag == 2) {  //卖出股票记录
                             count =count + 0 -  dealDocs[i].count;
                             jiaoge_yingli  = jiaoge_yingli - 0.00 + dealDocs[i].deal_money;
                             sellStamp = sellStamp + dealDocs[i].count * Date.parse( dealDocs[i].dealdate  );//累加卖出时长

                        }//if end


                    }//for  end
                    
                    count = count ;
                    days = [ count * Date.parse(new Date()) + sellStamp -  buyStamp ] / (totalBuy * 86400000) ;
                    days = days.toFixed(0);
                    shiji_yingli = jiaoge_yingli + 0 + count*10000*doc.price;
                    jiaoge_yingli = jiaoge_yingli.toFixed(2);
                    shiji_yingli = shiji_yingli.toFixed(2);
                    
                    results[t].jiaoge_yingli = jiaoge_yingli ;
                    results[t].shiji_yingli = shiji_yingli ;
                    results[t].count = count ;
                    results[t].days = days ;
                    
                   return callback();

                } // if end
            });


         },function(err){
             if(err) return res.send({code:204,err:err});
             res.send({code:201,datas:results});

         });


       

    });  //templater.SQL end 


}



//获取用户的某个证券的交易数据
function deallistzhengquan(req,res){
    var userid = req.session.userdatas.info.uid;

    var flag = req.body.zhengquanname, id = req.body.id;

    if(flag =='' || flag == undefined  || id == '' ||  id == undefined   ) return res.send({code:204,err:'传递参数不正确'});
    
    console.log(flag ,id );
    var sql = "CALL  s_zhengquan_getzhengquandeal( '" + flag + "', " + id + ")";
    templater.SQL(sql, function(err,docs){
         if(err) return res.send({code:204,err:err});
         var results =docs[0];
         
         return res.send({code:201,datas:results});
   });

}  

//获取期权智能决策的信息
function getautoqiquans(req,res) {
    var userid = req.session.userdatas.info.uid;
    var results = [];
    var qiquans = {};
    var sqlstr  = "select a.qq_id, a.flag, a.count, a.deal_money, b.code ,b.price ,b.name  from `qiquan_deal` as a, `qiquan` as b where a.qq_id = b.qq_id and a.`status` =1  and a.userid = " + userid ;
    templater.SQL(sqlstr, function(err,docs){
         if(err) return res.send({code:204,err:err});

         if(docs.length <= 0) return res.send({code:201,datas:results});
         else {
             //初始化期权信息
            for(var i=0;i<docs.length; i++) {var doc =docs[i]; qiquans[doc.code] = {name:doc.name ,qq_id:doc.qq_id,price:doc.price,count:0,jiaoge_yingli:0  } };

            //计算期权信息
            for(var j=0;j<docs.length; j++) {
                var doc = docs[j];
                var flag = doc.flag, deal_money = doc.deal_money , count =doc.count ,  code = doc.code ;
    
                if(flag == 1) {qiquans[code].count = qiquans[code].count - 0  + count; qiquans[code].jiaoge_yingli = qiquans[code].jiaoge_yingli - 0  - deal_money;    }
                if(flag == 2) {qiquans[code].count = qiquans[code].count - 0  - count; qiquans[code].jiaoge_yingli = qiquans[code].jiaoge_yingli - 0  + deal_money;    }
            }


            //遍历期权， 挑选持仓的期权
            for(var code in qiquans ) {
                if(qiquans[code].count > 0) 
                    results[results.length] = {qq_id:qiquans[code].qq_id ,name:qiquans[code].name ,code: code, count: qiquans[code].count , price:qiquans[code].price , jiaoge_yingli:qiquans[code].jiaoge_yingli };
            }


          return res.send({code:201,datas:results});
         }

         
   });
}





//获取期权对比物列表信息
function getreferqiquans(req,res) {
    //global.db = req.session.userdatas.selectprj.dbname;
    var userid = req.session.userdatas.info.uid;

    templater.SQL("CALL s_zhengquan_getreferqiquans(" + userid + ")", function(err,docs){
        if(err) return res.send({code:204,err:err});

        res.send({code:201,datas:docs[0]});

    });  //templater.SQL end 

}




//获取交易文件的数据
function getdealfiles(req,res){
    var userid = req.session.userdatas.info.uid;
    var sqlstr  = "select df_id, filename , type , createtime , isanalyse  from `deal_file`  where `status` = 1  and userid = '" + userid +"'  order by createtime    "  ;
    console.log(sqlstr);
    templater.SQL(sqlstr, function(err,docs){
         if(err) return res.send({code:204,err:err});
        
         res.send({code:201,datas:docs});
    });    
}











module.exports = router;





