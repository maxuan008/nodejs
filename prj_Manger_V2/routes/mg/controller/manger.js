var express = require('express');
var router = express.Router();
var assert=require('assert');
var moment = require('moment');

router.get('/', function(req,res,next)  {
    var result = {position:'项目管理'};
	result.fullname = req.session.designer.fullname;
    console.log('SEESION designer:', req.session.designer);

	res.render('mg/manger' ,  result);

	
});   //get  end!



module.exports = router;















