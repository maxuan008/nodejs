var express = require('express');
var router = express.Router();
//var crypto = require('crypto');
//var templater = require("../../model/templater");

var fun = require("../../model/fun");
var mgconfig = require("../../config/mgconfig.json");
var rolefun = require("../../model/rolefun");

var EventProxy =   require('eventproxy');

router.post('/', function(req,res,next)  {
	var ep =new EventProxy();
	var mgenv = global.mgENV;
	
	//console.log('aaaaa:',req.body.id);

    if(req.body.id == '' ||  req.body.id == undefined ) return res.send({code:204 , err:"数据错误"});

	var data = {fid :　req.body.id};   
	console.log('aaaaa:',data);

	ep.all('delRoleFun',function(){
		rolefun.delete(data, function(err,doc){
			if(err)	 return  res.send({code:204 , err:err});
			else return  res.send({ code:201 , datas:data });

		}); //rolefun.delete  end
	});


	fun.delete( data, function(err,doc){
		if(err)	 return  res.send({code:204 , err:err});
		else return  ep.emit("delRoleFun");

	}); //templater.get  end					


});


module.exports = router;










