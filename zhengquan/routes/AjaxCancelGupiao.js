var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//var MySql = require('./MySql');
var Gupiao=require('./gupiao');

router.post('/', function(req,res,next)  {
	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//console.log(req.body['id']);
			Gupiao.CancelGupiao(parseInt(req.body['id']),function(err,doc){
				if(err) 	res.send({des: err});
				else   
					if(doc==null)  res.send({des: 'Null'});
					else    res.send({des: true});
			});
	    
	} else {
		res.send({des: 'Session Out, Login again!'});
	}

});


module.exports = router;

