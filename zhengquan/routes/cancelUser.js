var express = require('express');
var router = express.Router();
var Users = require('./user');
var mongodb = require('./db.js');

router.get('/', function(req,res,next)  {
	//var sid=parseint(req.query.id);
	var sid=parseInt(req.query.id);
	var prjid=parseInt(req.query.prjid);
	//parseInt(sid);

	console.log('ID:' +  sid);
	console.log('prjid:' +  prjid);
	
	if(req.session.designer != null &&  sid != null)  {  	                //如果session存在
		mongodb.open(function(err,db){	
			if(err) return callback(err);
			Users.cancelUserProject(2, sid , prjid , function(err,doc){
				if(err != null)  res.send({des:err});
				else res.send({des:true});
			});

		})


	} else {
		
	res.send({des:'session out'});	
	}  //if session end

});


module.exports = router;











