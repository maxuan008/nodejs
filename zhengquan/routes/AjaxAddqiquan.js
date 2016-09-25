//console.log('admlogin');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var MySql = require('./MySql');
var Zhengquan=require('./gupiao');


router.post('/', function(req,res,next)  {
	if(req.session.users !=null &&  req.session.selproject !=null)  {  	                //如果session存在
		console.log(req.body);
		Zhengquan.AddQiquan(req.body['name']  , req.body['code'], parseFloat(req.body['price']),  parseInt(req.body['flag']), req.session.users['userid']   ,function(err,doc){
			if(err) 	res.send({des: err});
			else   
				if(doc==null)  res.send({des: 'Null'});
				else    res.send({des: true , id:doc.insertId});
		});
	
	} else {
		res.render('error', 'Session Out, Login again!');
	}//--if  session end
});   //--Post end!



module.exports = router;

