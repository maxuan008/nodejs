var express = require('express');
var path = require('path');
var assert=require('assert');
var async = require('async');
var moment = require('moment');
var mysql = require('./mysql/mysql');
var templater = require("./module/templater");


var router = express.Router();

router.get('/',index);   //进入首页
router.get('/lagout',lagout);   //登出
router.get('/getgupiaos',getgupiaos);  //获取股票列表信息
router.post('/addzhengquan',addzhengquan);  //添加证券
router.post('/delzhengquan',delzhengquan);  //删除证券

router.get('/getqiquans',getqiquans);  //获取期权列表信息
router.post('/updatezhengquan',updatezhengquan);  //更新数据库证券信息

router.get('/getgupiaobalance',getgupiaobalance);  //获取股票交易数据
router.get('/getqiquanbalance',getqiquanbalance);  //获取股票交易数据




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
    } 
    else  return res.send({code:204,err:'传递证券名无法匹配'});

    sqlstr = "update `" + table + "` set `status` = 0 where  " + wherestr;

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
    
    var data ={name:name ,  price:price };
    if(flag == "qiquan")   {
        var table = 'qiquan' ,  wherejson = {qq_id:id };
    } else if(flag == "gupiao") {
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
                    
                    count = count *10000;
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






















module.exports = router;





