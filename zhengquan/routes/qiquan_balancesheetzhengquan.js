var express = require('express');
var router = express.Router();
var Module=require('./module');
var Gupiao=require('./gupiao');
var Idindex = require('./idindex');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.session.users);
	//console.log(req.session.selproject);	
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//var date = new Date();
		//var day =  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		moment().format('LL');
	   var day = moment().format("MMM Do YY");
		
	    console.log(req.session.selproject['projid']);    console.log(req.session.users['userid']);
		
	    Module.GetUsermodlist_V2(req.session.selproject['projid']  ,req.session.users['userid'],function(err,modlistdoc){
			//console.log(modlistdoc);    ,
			Gupiao.GetQiquanSheetList(req.session.users['userid'],function(err,list , total){     //  
				Idindex.idfindone(function(err,IDdoc){
				res.render('qiquan_balancesheetzhengquan', {Balancellist:list ,modelist:  modlistdoc  , Balance_total: total,   prjname: req.session.selproject['name'] , date:day, username:req.session.users['name'], port: IDdoc.homeport});
				});
			});
						
		});
		
	    
	} else {
		res.render('error', {message:'Session Out, Login again!'});
	}
	

});

module.exports = router;
