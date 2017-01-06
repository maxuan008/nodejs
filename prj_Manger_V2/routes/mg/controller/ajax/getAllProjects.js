var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");

router.post('/', function(req,res,next)  {

	var mgenv = global.mgENV;

    var table =  mgconfig[mgenv].mysql.header + "_project";
	var where = {isvalid : '1'};
    var selectstr = " `pid`, `prj_name` , `port` , `domain_url` ";
    var result = {};
	templater.get( table , where, selectstr, function(err,docs){
		if(err)	 return  res.send({code:204 , err:err});
        else return  res.send({ code:201 , datas:docs });

	}); //templater.get  end


});


module.exports = router;











