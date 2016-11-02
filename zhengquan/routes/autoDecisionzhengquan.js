var express = require('express');
var router = express.Router();
var Module=require('./module');
var Gupiao=require('./gupiao');
var Idindex = require('./idindex');
var moment = require('moment');

var refer_qiquan=require('./class/refer_qiquan');

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.session.users);
	//console.log(req.session.selproject);	
	var result={};
	if(req.session.users !=null &&  req.session.selproject !=null) {
		//var date = new Date();
		//var day =  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		moment().format('LL');
	   var day = moment().format("MMM Do YY");
		
	    console.log(req.session.selproject['projid']);    console.log(req.session.users['userid']);
		
	    Module.GetUsermodlist_V2(req.session.selproject['projid']  ,req.session.users['userid'],function(err,modlistdoc){
			//console.log(modlistdoc);    ,
			Gupiao.GetQiquanSheetList_for_auto(req.session.users['userid'],function(err,list , total ,datas){     
				result.Balancellist = list;
				result.modelist = modlistdoc ;   
				result.Balance_total = total.toFixed(2) ;   
				result.prjname = req.session.selproject['name'] ;   
				result.date = day ;
				result.username = req.session.users['name'] ;  
				 
				if(datas) {
					     result.loadCodeInfo= datas.loadCodeInfo;
					     result.total_val = datas.shizhi_total ;
						 //result.total_quan_val =  parseInt(result.total_val) *
					     result.shiji_total_yingli = datas.shiji_yingli_total ; 
					 } 
				              

                refer_qiquan.getReferList(req.session.users['userid'],function (err,referList, referDatas){
                    if(err) res.send('err:',err);
					else {
					    result.referList = referList;
						result.loadCodeInfo_refer = referDatas.loadCodeInfo_refer;

						console.log(result);
						Idindex.idfindone(function(err,IDdoc){
						result.port = IDdoc.homeport;           
						res.render('autoDecisionzhengquan',  result);
						});

					} //if end

				});  //refer_qiquan.getReferList  end 


			});
						
		});
		
	    
	} else {
		res.render('error', {message:'Session Out, Login again!'});
	}
	

});

module.exports = router;
