var express = require('express');
var router = express.Router();
//var crypto = require('crypto');
//var templater = require("../../model/templater");

var roleuser = require("../../model/roleuser");
var mgconfig = require("../../config/mgconfig.json");

router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	
	//console.log('aaaaa:',req.body.id);
	  var ruid = req.body.id;
      if(ruid == '' ||  ruid == undefined  ) 
	  return res.send({code:204 , err:"数据错误"});

	  var wherejson = {roleuserid : ruid } ;

	  roleuser.delete(wherejson , function(err,doc){
		 if(err)	 return  res.send({code:204 , err:err});
		 else return  res.send({ code:201 });

	 }); //templater.get  end					


});


module.exports = router;










