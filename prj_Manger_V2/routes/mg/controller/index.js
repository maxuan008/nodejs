var express = require('express');
var router = express.Router();
var assert=require('assert');
var moment = require('moment');

router.get('/', function(req,res,next)  {
    var result = {};
	result.fullname = req.session.designer.fullname;
    console.log('abc');

	res.render('mg/mgindex' );

	
});   //get  end!



module.exports = router;















