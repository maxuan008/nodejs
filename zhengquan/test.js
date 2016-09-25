
var express = require('express');
var router = express.Router();
var DBclose = require('./DBclose');
var Project = require('./project');
var Idindex =  require('./idindex');

var newproject = new Project({
	projid : '',
	name : '',
    desc :  '',
	desgid : '',
});


console.log(req.session.cancelprjID);
	
	
	