var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../../../config/mgconfig.json");

var roleuser = require("../../model/roleuser");
var EventProxy =   require('eventproxy');

router.post('/', function(req,res,next)  {
	


	var md5 = crypto.createHash('md5');	
	var rid = req.body.rid;
	var pid= req.body.pid;
	var mgenv = global.mgENV;
	

    if(rid == '' || rid == undefined  ) return res.send({code:204 , err:"ID数据错误"});

	var data = {};
	data.username  = req.body.name ;
	data.password  = md5.update(req.body.password).digest('base64') ;
    
	data.creater = req.session.designer.id;

	var uerlist = JSON.parse(req.body.uidlist);

    var table =  mgconfig[mgenv].mysql.header + "_user";
  
	//判断用户名是否存在，端口是否存在，域名是否存在
	var namewhere = {username :　data.username  };

	var ep =new EventProxy();

	//console.log(uerlist , data );

	var flag = 0;

	//添加单个用户
    ep.all('AddUser' , function(){
		//console.log('BBBBB');
		templater.isExist(table , namewhere ,function(err,nameflag){  //检测用户名是否存在
			if(err)	 return  res.send({code:204 , err:err});
			if(nameflag == true) return  res.send({code:204 , err:"用户名已经存在"});
			else { 
					
				templater.add( table , data, function(err,doc){
					if(err)	 return  res.send({code:204 , err:err});
					else {
						//console.log(docs);
						//data.id = doc.insertId;
						flag = 1;
						delete  data.creater;

						uerlist[uerlist.length] = {pid:pid ,rid: rid , uid:doc.insertId  };
						//获取新建用户的pid,加入用户组, 将用户组添加到角色中
						
						ep.emit('AddUserList');
						//return  res.send({ code:201 , datas:data });
					} 
				}); //templater.add  end					

		}});  //templater.isExist  end

   });


  //添加用户列表
   ep.all('AddUserList',function(){ 
		roleuser.add_Arry(uerlist,function(err){
			if(err)	 return  res.send({code:204 , err:err});
			else {
			   if(flag == 1)  uerlist[uerlist.length-1].username = req.body.name;
			   return res.send({code:201 ,datas: uerlist });
			 }

		});

   });


    console.log('ep触发前......');

    //ep的第一次触发代码尽量放着后面，解决异步问题
	if(data.username =='' || data.username ==undefined) {console.log('AAAAAAA'); ep.emit('AddUserList');} 
	else  ep.emit('AddUser');



});


module.exports = router;










