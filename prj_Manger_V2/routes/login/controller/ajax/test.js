var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");

var project = require("../../model/project");

router.get('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	//id=req.query.id;
	templater.SQL('CALL stored_del_project(8);',function(err,flag){
		if(err) console.log(err);
		//console.log('flag:' , flag);
		res.send({flag:flag});
	});

});


module.exports = router;










