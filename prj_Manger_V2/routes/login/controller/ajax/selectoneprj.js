var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");
var user = require("../../model/user");

router.post('/', function(req,res,next)  {
  
	var pid = req.body.pid;
	var uid = req.session.userdatas.info.uid;
    
	if(pid=='' || pid == undefined ) return res.send({code:'204', err:'pid数据不正确'});

	var prjs = req.session.userdatas.prjs;  
	if(prjs == undefined)  return res.send({code:'204', err:'数据错误'});

	if(prjs.length <= 0)  return res.send({code:'204', err:'没有获取到此用户有权限使用的项目'});
	
	var flag = -1;
	for(var i=0; i< prjs.length; i++) {
		if(pid == prjs[i].pid) 	{flag = i;break;} 
	} //for end

	if(flag != -1) { 
		user.setSelectRoleAndFunUrls(pid,uid , function(err,datas){
			if(err) return res.send({code:204, err:err});
			req.session.userdatas.selectprj.pid = pid;
			req.session.userdatas.selectprj.rid = datas.rid;
			req.session.userdatas.selectprj.fids = datas.fids;
			//req.session.userdatas.selectprj.havfunUrls = datas.havfunUrls;
			//req.session.userdatas.selectprj.ishavedomain = datas.ishavedomain;
			// datas:{domain_url: prjs[flag].domain_url }
			return res.send({code:'201'});
		});  //user.setSelectRoleAndFunUrls end 
	}  else  return res.send({code:'204',err: '所属权限项目中未匹配到'});



	 

});


module.exports = router;











