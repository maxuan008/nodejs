var express = require('express');
var router = express.Router();
var assert=require('assert');
var moment = require('moment');
var user = require("../model/user");

router.get('/', function(req,res,next)  {

   console.log(req.session.userdatas);
   var uid = req.session.userdatas.info.uid;

   user.getAllPrjAndRoles(uid, function(err,docs){
       console.log(docs);
	   res.send(docs);
   });  //user.getAllPrjAndRoles end




   
	
});   //get  end!



module.exports = router;















