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
	if(req.session.users !=null  &&  req.session.selproject !=null  ) {
		//var date = new Date();
		//var day =  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
	   moment().format('LL');
	   var day = moment().format("MMM Do YY");
	   
	   // console.log(req.session.selproject['projid']);    console.log(req.session.users['userid']);
		Module.GetUsermodlist_V2(req.session.selproject['projid']  ,req.session.users['userid'],function(err,modlistdoc){
			//console.log(modlistdoc);   
			//console.log('A');  
			Gupiao.GetGupiaoList(req.session.users['userid'],function(err,gupiaolist, allcodedoc){
				//console.log('B');  
				Idindex.idfindone(function(err,IDdoc){
					//console.log('C');  
				  res.render('index', {allcode: allcodedoc , modelist:  modlistdoc  , gupiaolist:gupiaolist ,  prjname: req.session.selproject['name'] , date:day, username:req.session.users['name'], port: IDdoc.homeport });
				});
			});
						
		});


	    
	} else {
		
		res.render('error', {message:'Session Out, Login again!'});
	}
	

});

module.exports = router;
