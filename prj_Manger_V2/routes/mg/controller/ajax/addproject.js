var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../../../config/mgconfig.json");

router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;
	
	var data = {};
	if(req.body.name)  data.prj_name  = req.body.name;
	if(req.body.port)  data.port  = req.body.port;
	if(req.body.url)  data.domain_url  = req.body.url;

    
	data.creater = req.session.designer.id;

    var table =  mgconfig[mgenv].mysql.header + "_project";


	//判断项目名是否存在，端口是否存在，域名是否存在
	var namewhere = {prj_name :　req.body.name};
	var portwhere  = {port :　req.body.port};
	var urlwhere ={domain_url :　req.body.url};

	templater.isExist(table , namewhere ,function(err,nameflag){  //检测项目名是否存在
		if(err)	 return  res.send({code:204 , err:err});
		if(nameflag == true) return  res.send({code:204 , err:"项目名已经存在"});
		else { 

			templater.isExist(table , portwhere ,function(err,portflag){   //检测端口是否存在
				if(err)	 return  res.send({code:204 , err:err});
				if(portflag == true) return  res.send({code:204 , err:"端口已存在"});
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

	}});

});


module.exports = router;










