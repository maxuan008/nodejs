var express = require('express');
var router = express.Router();
//var crypto = require('crypto');
//var templater = require("../../model/templater");

var fun = require("../../model/fun");
var mgconfig = require("../../config/mgconfig.json");
var rolefun = require("../../model/rolefun");

var EventProxy =   require('eventproxy');

router.post('/', function(req,res,next)  {
	var project = require("../../model/project");
	var ep =new EventProxy();
	var mgenv = global.mgENV;
	
	//console.log('aaaaa:',req.body.id);
	var fid = req.body.fid;
	var pid = req.body.pid;
    if(  fid == '' || fid== undefined || pid == '' || pid== undefined    ) return res.send({code:204 , err:"数据错误"});

	var data = {fid :　fid };   
	console.log('aaaaa:',data);

	ep.all('delRoleFun',function(){
		rolefun.delete(data, function(err,doc){
			//console.log('fun:',doc);
			if(err)	 return  res.send({code:204 , err:err});
			else {
				
				//获取此项目的模块功能信息
				project.getfuns_ID(pid , function(err,fundocs){
				if(err) console.log(err);
				var funs = fundocs;
					project.getRole_FunUsers(pid , function(err,roles){
						//console.log('DDDDDDDD');
						if(err)	 return  res.send({code:204 , err:err});
						else  return  res.send({ code:201 , datas:{funs:funs ,roles :roles  } });	
					
					});	 // project.getRole_FunUsers  end
				});
			     
			} //if end

		}); //rolefun.delete  end
	}); //ep.all end


	fun.delete( data, function(err,doc){
		if(err)	 return  res.send({code:204 , err:err});
		else return  ep.emit("delRoleFun");

	}); //templater.get  end					


});


module.exports = router;










