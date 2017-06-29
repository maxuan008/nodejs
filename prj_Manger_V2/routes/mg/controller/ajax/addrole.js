var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../../../config/mgconfig.json");

router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	

    if(req.body.name == '' ||  req.body.name == undefined || req.body.prjid == '' ||   req.body.prjid== undefined ) return res.send({code:204 , err:"数据错误"});

	var data = {};
    data.pid  = req.body.prjid;
	data.role_name  = req.body.name;

	data.creater = req.session.designer.id;

    var table =  mgconfig[mgenv].mysql.header + "_role";

  
	//判断项目名是否存在，端口是否存在，域名是否存在
	var namewhere = {role_name :　data.role_name  , pid : data.pid , isvalid: 1 };

	templater.isExist(table , namewhere ,function(err,nameflag){  //检测角色名是否存在
		if(err)	 return  res.send({code:204 , err:err});
		if(nameflag == true) return  res.send({code:204 , err:"角色名已经存在"});
		else { 

			templater.add( table , data, function(err,doc){
				if(err)	 return  res.send({code:204 , err:err});
				else {
					//console.log(docs);
					data.id = doc.insertId;
					delete  data.creater;
					return  res.send({ code:201 , datas:data });
				} 

			}); //templater.get  end					


	}});



});


module.exports = router;










