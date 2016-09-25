var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//var MySql = require('./MySql');
var Zhengquan=require('./gupiao');

router.post('/', function(req,res,next)  {
	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//console.log(req.body['id']);
		Zhengquan.updateSQLstring(req.body['sql'], req.session.users['userid'] ,function(err,doc){
				if(err) 	console.log(err);  
				else   
					if(doc==null)  console.log('Update SQL:null');
					else   console.log('Update SQL OK');
				
				res.send({des:'Null'});	
					
		}); 
	    
	} else {
		console.log('Session Out, Login again!') ;
		res.send({des:'Session Out, Login again!'});
	}

});


module.exports = router;

