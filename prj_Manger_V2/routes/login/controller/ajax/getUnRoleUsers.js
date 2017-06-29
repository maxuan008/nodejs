var express = require('express');
var router = express.Router();
//var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../../../config/mgconfig.json");

var roleuser = require("../../model/roleuser");



router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;

	var rid= req.body.id;

	if( rid == '' || rid == undefined )  return res.send({code:204 , err:"ID数据错误"});


	roleuser.getUnRoleUsers( rid , function(err,docs){
		if(err)	 return  res.send({code:204 , err:err});
        else return  res.send({ code:201 , datas:docs });
	}); //roleuser.getUnRoleUsers end

});


module.exports = router;











