//console.log('admlogin');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var MySql = require('./MySql');
var refer_qiquan=require('./class/refer_qiquan');


router.post('/', function(req,res,next)  {
	if(req.session.users !=null &&  req.session.selproject !=null)  {  	                //如果session存在
		console.log(req.body);

		if(req.body['code'] == '' || req.body['code'] == undefined)  res.send({ status:'404', err:'code数据不正确'});
		else  {
			    var data = {};
				data.code =  req.body['code'] ;
				data.userid =  req.body['userid'] ;

                refer_qiquan.isExist_ForCode(req.body['code'],function(flag){
                    if(flag) res.send({status:'404',err: '已存在'});
					else

						refer_qiquan.insertData(data  ,function(err,doc){
							if(err) 	res.send({status:'404',err: err});
							else   
								if(doc==null)  res.send({status:'404',err: 'Null'});
								else    res.send({status:'200',des: true , id:doc.insertId});
						});
				});

		} //if end
	
	} else {
		res.send({ status:'404', err:'session已退出'});
	}//--if  session end
});   //--Post end!



module.exports = router;

