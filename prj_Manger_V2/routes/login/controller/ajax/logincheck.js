var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var user = require("../../model/user");
var mgconfig = require("../../config/mgconfig.json");

router.post('/', function(req,res,next)  {    
	var md5 = crypto.createHash('md5');
	var mgenv = global.mgENV;

	var username=req.body.u;
	var password=md5.update(req.body.p).digest('base64');
	console.log(username ,password );

	if(username == '' || username == undefined || password == '' || password == undefined) 
	return res.send({code:204 , err: "用户名和密码数据错误"});

    var table =  mgconfig[mgenv].mysql.header + "_user";
	var where = {username: username , isvalid : '1' };
    console.log(table, where);
	templater.get( table , where, null, function(err,doc){

		if(err)	 return  res.send({code:204 , err:err});
		 //console.log('return');
 		
		 if(doc.length <= 0)   return  res.send({ code:204 , err:"用户不存在" });
		 else  {
			 
			 if(doc[0].password == password ) { 

				 //req.session.designer = { id : doc[0].did , username : doc[0].username ,fullname:doc[0].fullname  };
				 var uid = doc[0].uid;
				 var fullname =doc[0].fullname;
				 //获取用户所有的角色
				  user.getAllRoles(uid,function(err,prjRoles){
					if(err)	 return  res.send({code:204 , err:err});

					//console.log(prjRoles);

					 if(prjRoles.length <= 0)   return  res.send({ code:204 , err:"此账号当前没有所属项目" });
					 else  {
						 req.session.userdatas={
							    info:{
									fullname : fullname ,
									username:username,
									uid:uid
								}
							 };

					     res.send({code:201 , data:"验证通过" });	 
					 }
					
					

				  });

				  

			} else res.send({ code:204 , err:"用户或密码错误" });
		 }

	}); //templater.get  end

			

});


module.exports = router;











