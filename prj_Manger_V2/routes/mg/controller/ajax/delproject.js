var express = require('express');
var router = express.Router();

var mgconfig = require("../../config/mgconfig.json");
var templater = require("../../model/templater");


router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	var pid = req.body.pid;
	
	if( pid=='' || pid == undefined  ) return res.send({code:204 , err:"ID数据错误"});
	//id=req.query.id;
	console.log("CALL stored_del_project(" + pid + ");");
	templater.SQL("CALL stored_del_project(" + pid + ");",function(err,flag){
		if(err) console.log(err);
		console.log('flag:' , flag);
		if(flag[0][0].result == 1) return res.send({code:201 , datas:flag});
		else return res.send({code:204 , datas:flag});
		
	});
});


module.exports = router;










