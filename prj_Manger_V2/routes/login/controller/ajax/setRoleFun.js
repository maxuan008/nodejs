var express = require('express');
var router = express.Router();
//var crypto = require('crypto');
//var templater = require("../../model/templater");

var rolefun = require("../../model/rolefun");
var mgconfig = require("../../config/mgconfig.json");

router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	
	//console.log('aaaaa:',req.body.id);

    if(req.body.id == '' ||  req.body.id == undefined || req.body.flag == '' ||  req.body.flag == undefined ) 
	  return res.send({code:204 , err:"数据错误"});

	  var rfid = req.body.id;
	  var data = {status : req.body.flag } ;

	rolefun.update_ID(rfid, data, function(err,doc){
		if(err)	 return  res.send({code:204 , err:err});
		else return  res.send({ code:201 });

	}); //templater.get  end					


});


module.exports = router;










