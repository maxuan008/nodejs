var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//var MySql = require('./MySql');
var refer_qiquan=require('./class/refer_qiquan');

router.post('/', function(req,res,next)  {
	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//console.log(req.body['id']);

		if(req.body['id'] == '' || req.body['id'] == undefined) res.send({ status:'404', err:'code数据不正确'});
        else {
				refer_qiquan.isExist_ForID(req.body['id'],function(flag){
                    if(!flag) res.send({status:'404',err: '要注销的对象不存在'});
					else
						refer_qiquan.del(req.body['id']  ,function(err,doc){
							if(err) 	res.send({status:'404',err: err});
							else   
						       res.send({status:'200',des: true , id:doc.insertId});
						});

				}); //refer_qiquan.isExist_ForID  end

		} //if end

	    
	} else {
		res.send({ status:'404', err:'session已退出'});
	}

});


module.exports = router;

