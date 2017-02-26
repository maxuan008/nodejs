var express = require('express');
var path = require('path');
var assert=require('assert');
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





module.exports = router;





