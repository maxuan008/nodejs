//console.log('admlogin');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var MySql = require('./MySql');
var Gupiao=require('./gupiao');
//var Project = require('./project');

//console.log(req.body);

//MySql.connect();

//MySql.query('INSERT INTO gupiao SET ?', {name:req.body['name']  , code: req.body['code'] }, function(err, result) {
 //  if (err) throw err;
 //  console.log(results);
  // console.log(fields);
   //console.log('The solution is: ', rows[0].solution);
 //});

router.post('/', function(req,res,next)  {
	if(req.session.users !=null &&  req.session.selproject !=null)  {  	                //如果session存在
		//console.log(req.body);
		Gupiao.AddGupiao(req.body['name']  , req.body['code'], parseFloat(req.body['price']) , req.session.users['userid'],function(err,doc){
			if(err) 	res.send({des: err});
			else   
				if(doc==null)  res.send({des: 'Null'});
				else    res.send({des: true , gp_id:doc.insertId});
		});
	
	} else {
		res.render('error', 'Session Out, Login again!');
	}//--if  session end
});   //--Post end!



module.exports = router;

