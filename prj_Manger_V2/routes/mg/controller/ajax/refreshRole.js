var express = require('express');
var router = express.Router();
var crypto = require('crypto');
//var templater = require("../../model/templater");
var mgconfig = require("../../../../config/mgconfig.json");

var project = require("../../model/project");

router.post('/', function(req,res,next)  {
	var rolefun = require("../../model/rolefun");
    var roleuser = require("../../model/roleuser"); 

	var mgenv = global.mgENV;
	var pid = req.body.pid ;
	var rid = req.body.rid ;

	var data={};

    if(pid == '' || pid == undefined || rid== '' ||   rid == undefined  ) return res.send({code:204 , err:"ID数据错误"});

	project.getfuns_ID(pid , function(err,funs){
		if(err) { console.log(err);   return res.send({code:204 , err:err});    }
		data.funs = funs;
		
		rolefun.getrolefuns(rid, function(err,rolefuns){
			if(err) { console.log(err);   return res.send({code:204 , err:err}); }
			data.rolefuns = rolefuns;

			roleuser.getroleusers( rid , function(err,roleusers){
				data.roleusers = roleusers;
				if(err) { console.log(err);   return res.send({code:204 , err:err}); }
				else return res.send({code:201 , datas:data}); 

			}); //roleuser.getroleusers end

		});  //rolefun.getrolefuns end

	}); //project.getfuns_ID end
	
});  //router.post  end


module.exports = router;










