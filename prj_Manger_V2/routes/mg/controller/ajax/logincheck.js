var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");

router.post('/', function(req,res,next)  {
	var md5 = crypto.createHash('md5');
	var mgenv = global.mgENV;

	var username=req.body.u;
	var password=md5.update(req.body.p).digest('base64');
	console.log(username ,password );

	if(username == '' || username == undefined || password == '' || password == undefined) 
	return res.send({code:204 , err: "用户名和密码数据错误"});

    var table =  mgconfig[mgenv].mysql.header + "_designer";
	var where = {username: username , isvalid : '1' };
    console.log(table, where);
	templater.get( table , where, null, function(err,doc){

		if(err)	 return  res.send({code:204 , err:err});
		 //console.log('return');
 		
		 if(doc.length <= 0)   return  res.send({ code:204 , err:"用户或密码错误" });
		 else  {

			 if(doc[0].password == password ) { 

				 req.session.designer = { id : doc[0].did , username : doc[0].username ,fullname:doc[0].fullname  };
				 res.send({code:201 , data:"验证通过" });

			} else res.send({ code:204 , err:"用户或密码错误" });
		 }


	}); //templater.get  end

			

});


module.exports = router;











