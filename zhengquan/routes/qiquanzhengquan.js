   var express = require('express');
var router = express.Router();
var Module=require('./module');
var Gupiao=require('./gupiao');
var Idindex = require('./idindex');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.session.users);
	//console.log(req.session.users);	

	var result={};
	if(req.session.users !=null  &&  req.session.selproject !=null ) {
		//var date = new Date();
		//var day =  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
	   moment().format('LL');
	   var day = moment().format("MMM Do YY");
	   
	   // console.log(req.session.selproject['projid']);    console.log(req.session.users['userid']);
		Module.GetUsermodlist_V2(req.session.selproject['projid']  ,req.session.users['userid'],function(err,modlistdoc){
			//console.log(modlistdoc);   
			//console.log('A');  
		
			Gupiao.GetQiquanList(req.session.users['userid'],function(err,list,datas){  
				console.log('B',datas); 

				result.modelist = modlistdoc; 
				result.list = list;
				result.prjname = req.session.selproject['name'];
				result.date=day ;
				result.username=req.session.users['name'] ;
				if(datas) result.loadCodeInfo= datas.loadCodeInfo;
				


				Idindex.idfindone(function(err,IDdoc){
					result.port=IDdoc.homeport ;
					console.log('IDdoc:',IDdoc);


					//console.log('C');    
				  res.render('qiquanzhengquan', result);
				});
			});
						
		});

	    
	} else {
		res.render('error',{message:'Session Out, Login again!'});
	}
	

});

module.exports = router;
