var express = require('express');
var router = express.Router();

var mgconfig = require("../../../../config/mgconfig.json");
var templater = require("../../model/templater");


router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	var rid = req.body.id;
	
	if( rid=='' || rid == undefined  ) return res.send({code:204 , err:"ID数据错误"});
	//id=req.query.id;
	console.log("CALL stored_del_Role(" + rid + ");");
	templater.SQL("CALL stored_del_Role(" + rid + ");",function(err,flag){
		if(err) console.log(err);
		console.log('flag:' , flag);
		if(flag[0][0].result == 1) return res.send({code:201 , datas:flag});
		else return res.send({code:204 , datas:flag});
		
	});
});


module.exports = router;










