var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");

router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	

    if(req.body.id == '' ||  req.body.id == undefined || req.body.fun_name == '' ||   req.body.fun_name == undefined  || req.body.fun_url == '' ||   req.body.fun_url == undefined) return res.send({code:204 , err:"数据错误"});

	var data = {};
	if(req.body.id)  data.pid  = req.body.id;
	if(req.body.fun_name)  data.fun_name  = req.body.fun_name;
	if(req.body.fun_url)  data.url  = req.body.fun_url;
	if(req.body.fun_docname)  data.docname  = req.body.fun_docname;
	if(req.body.isdomain)  data.ishavedomain  = req.body.isdomain;
    
	data.creater = req.session.designer.id;

    var table =  mgconfig[mgenv].mysql.header + "_fun";

  
	//判断项目名是否存在，端口是否存在，域名是否存在
	var namewhere = {fun_name :　req.body.fun_name , pid : req.body.id };
	var urlwhere ={url :　req.body.fun_url , pid : req.body.id};

	templater.isExist(table , namewhere ,function(err,nameflag){  //检测功能名是否存在
		if(err)	 return  res.send({code:204 , err:err});
		if(nameflag == true) return  res.send({code:204 , err:"功能名已经存在"});
		else { 
				
			templater.isExist(table , urlwhere ,function(err,urlflag){  //检测url是否存在
				if(err)	 return  res.send({code:204 , err:err});
				if(urlflag == true) return  res.send({code:204 , err:"url已存在"});
				else {  //检测端口是否存在
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

	}});



});


module.exports = router;










