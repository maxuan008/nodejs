var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var templater = require("../../model/templater");
var mgconfig = require("../../config/mgconfig.json");

router.get('/', function(req,res,next)  {
	req.session.designer = null;
	console.log('登出，session已清空');
	res.redirect('/mg/login');

});


module.exports = router;











