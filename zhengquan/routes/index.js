var express = require('express');
var router = express.Router();
var Module=require('./module');
var Gupiao=require('./gupiao');
var config = require('./config');


/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.session.users);
	//console.log(req.session.selproject);	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		
		 res.redirect('/gupiaozhengquan');  
	    
	    
	    
	} else {
		res.render('error', 'Session Out, Login again!');
	}
	

});

module.exports = router;
