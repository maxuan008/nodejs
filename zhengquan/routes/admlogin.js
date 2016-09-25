//console.log('admlogin');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var DBclose = require('./DBclose');

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };


router.post('/', function(req,res,next)  {
	var dbmx = require('./designer.js');
	var md5 = crypto.createHash('md5');
	
	nam=req.body['admuser'];
	passw=md5.update(req.body['passw']).digest('base64');
	//console.log('用户名,密码:' + nam  + ',' + passw);	

    dbmx.desfindone(nam, function(err,doc){
        //	console.log('1111');  console.log(doc);
    	switch(true)
    	{
    	case err !=null :
    	    console.log(err);
    	    DBclose.dbclosed();
    		res.render('admlogin' , {result: err});
		    break;
    	
    	case doc ==null :
	        console.log(err);
	        DBclose.dbclosed();
	    	res.render('admlogin' , {result: '用户不存在!'});
	        break;
    		
    	case doc.passw != passw :  		
        	DBclose.dbclosed();
    	    res.render('admlogin' , {result:'密码错误！'});
    	    break;
    	
    	case err==null && doc!=null &&  doc.passw==passw :
    		//登入成功，创建session
    		req.session.designer=doc;
    		req.session.designer.passw='';
    		sleep(50);
    		res.redirect('/adm');
    		
    		break;
    	}
    	//console.log(req.session);
    	console.log('Admlogin--Post: Success');
    	
    });  //--dbmx.designerfind end!
});   //--Post end!


router.get('/', function(req,res,next)  {
	console.log('Admlogin--Get:Success');
	//console.log(req.session.designer);
	res.render('admlogin',{result: ''});
});


module.exports = router;




//----test
/*
var dbmx = require('./designer.js');
var md5 = crypto.createHash('md5');

nam='admuser';
passw=md5.update('passw').digest('base64');
console.log('用户名,密码:' + nam  + ',' + passw);	

dbmx.desfindone(nam, function(err,desg){
	
	switch(true)
	{
	case !desg :
		console.log('result:用户不存在！');
		break;
		
	case desg.passw != passw :
		console.log('admlogin','result:密码错误！');
	    break;
	
	case true:
		console.log('suncceed!');
		break;
	}

	
});  //--dbmx.designerfind end!
*/
//---test





