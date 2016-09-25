var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//var MySql = require('./MySql');
var Gupiao=require('./gupiao');

router.post('/', function(req,res,next)  {
	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//console.log(req.body);
		//var sqlstr={'userid':parseInt(req.session.users['userid']),'gp_id':parseInt(req.body['id']) , 'flag': parseInt(req.body['flag']), 'price': parseInt(req.body['price']) , 'count': parseInt(req.body['Count']) };
		//console.log(sqlstr);
		
		Gupiao.mingxi(req.session.users['userid'],req.body,function(err,doc){
			 // console.log(err);
			  if(err) res.send({des: err});
			  else res.send({des: true, res:doc});
			  
				//if(err) {  
				//	console.log('AA'); 
				//	console.log(err); 	
					
				//	} else   {   
				//	console.log('BB'); 
				//	console.log(doc);	
				//	}
			  
				
			});
	    
	} else {
		res.send({des: 'Session Out, Login again!'});
	}

});


module.exports = router;

