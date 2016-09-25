var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//var MySql = require('./MySql');
var Gupiao=require('./gupiao');

router.post('/', function(req,res,next)  {
	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//console.log(req.body['id']);
		    Gupiao.IsExistDeal(parseInt(req.body['id']),  req.session.users['userid'] ,function(err,dealDoc){
				if(err) {console.log(err); res.send({des: err}); }
				else if(dealDoc.length > 0) res.send({des: '无法注销，此股票已存在交易.'});
				else if(dealDoc.length <= 0) //如果股票不存在交易，则可以删除
				
					Gupiao.CancelGupiao(parseInt(req.body['id']),function(err,doc){
						if(err) res.send({des: err});
						else   
							if(doc==null)  res.send({des: 'Null'});
							else    res.send({des: true});
					}); //Gupiao.CancelGupiao END 
				
			}); //Gupiao.IsExistDeal END

	    
	} else {
		res.send({des: 'Session Out, Login again!'});
	}

});


module.exports = router;

