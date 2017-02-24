var express = require('express');
var path = require('path');
var assert=require('assert');
var moment = require('moment');

var router = express.Router();



router.get('/',index);   //进入首页
router.get('/lagout',lagout);   //登出




function index(req,res) {
     var htmlpath = path.join(__dirname, '../../views/app/index.html');
     //console.log('HHHHHH',htmlpath);
     return  res.sendFile(htmlpath);

}






//登出
function lagout(req ,res) {

    delete req.session.userdatas;
    return res.send({code:201   });

}






module.exports = router;





