var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");
var EventProxy =   require('eventproxy');
var async = require("async");

var project = require("../../model/project");

router.post('/', function(req,res,next)  {
	var ep =new EventProxy();
	var mgenv = global.mgENV;
	
	//****数据结构如下*************************
    //**  	projectDatas=[
	//**		           {
	//**					prjinfo:{pid: '',prjname:'', port:'',domain_url:''    },
	//**					funs:[
	//**						{fid:'',fun_name:'' ,docname:'' , url:'' },
	//**						{fid:'',fun_name:'' ,docname:'' , url:'' }
	//**						],
	//**					roles:[
	//**				 		   {
 	//**							 role:{rid:'', role_name:''},
	//**							 funs: [{rfid:'',fid:'' , status :''},  {rfid:'',fid:'', status :''}   ],
	//**							 users: [{ruid:'', uid:'',username:'',fullname:''}, {ruid:'', uid:'',username:'',fullname:''}  ]
	//**						    },
	//**				 		   {
 	//**							 role:{rid:'', role_name:''},
	//**							 funs: [{rfid:'',fid:'' , status :''},  {rfid:'',fid:'', status :''}   ],
	//**							 users: [{ruid:'', uid:'',username:'',fullname:''}, {ruid:'', uid:'',username:'',fullname:''}  ]
	//**						    }
	//**					      ]  
	//**				    },
    //**
	//**		           {
	//**					prjinfo:{pid: '',prjname:'', port:'',domain_url:''    },
	//**					funs:[
	//**						{fid:'',fun_name:'' ,docname:'' , url:'' },
	//**						{fid:'',fun_name:'' ,docname:'' , url:'' }
	//**						],
	//**					roles:[
	//**				 		   {
 	//**							 role:{rid:'', role_name:''},
	//**							 funs: [{rfid:'',fid:'' , status :''},  {rfid:'',fid:'', status :''}   ],
	//**							 users: [{ruid:'', uid:'',username:'',fullname:''}, {ruid:'', uid:'',username:'',fullname:''}  ]
	//**						    },
	//**				 		   {
 	//**							 role:{rid:'', role_name:''},
	//**							 funs: [{rfid:'',fid:'' , status :''},  {rfid:'',fid:'', status :''}   ],
	//**							 users: [{ruid:'', uid:'',username:'',fullname:''}, {ruid:'', uid:'',username:'',fullname:''}  ]
	//**						    }
	//**					      ]  
	//**				    }
	//**	              ];
    //*****************************************
	var projectDatas = [];

	//*****遍历所有项目，并生成相应的数据结构
	ep.all('projectAllDatas',function(docs){

		async.eachSeries(docs, function(doc, callback) {   // 循环遍历项目
			var prjinfo={pid:doc.pid , prjname:doc.prj_name  , port: doc.port  ,  domain_url: doc.domain_url     };
			//获取此项目下的说有功能模块
			project.getfuns_ID(doc.pid , function(err,fundocs){
				var funs = fundocs;

				project.getRole_FunUsers(doc.pid , function(err,roles){
					var roles = roles;
					projectDatas[projectDatas.length] = {prjinfo: prjinfo, funs: funs, roles: roles };

					callback();
				});	 // project.getRole_FunUsers  end
			});  // project.getfuns_ID  end        

        }, function(err){
			if(err) console.log(err);
            return  res.send({ code:201 , datas:projectDatas });
        }); //async.eachSeries end 

		
	});








    //*****获取所有的项目信息
    var table =  mgconfig[mgenv].mysql.header + "_project";
	var where = {isvalid : '1'};
    var selectstr = " `pid`, `prj_name` , `port` , `domain_url` ";
    var result = {};
	templater.get( table , where, selectstr, function(err,docs){

		if(docs.length<=0)  return  res.send({ code:201 , datas:projectDatas });
		else ep.emit('projectAllDatas', docs);

	}); //templater.get  end


});







module.exports = router;











