//console.log("11");
var appconfig = require('../../../config/appconfig.json');

var mysql = require('mysql');

var mgENV=global.mgENV;
var db = global.db;

console.log(appconfig[mgENV]);

var connection = mysql.createConnection({
	  host     : appconfig[mgENV].mysql.host,
	  user     : appconfig[mgENV].mysql.user,
	  password : appconfig[mgENV].mysql.password,
	  database : appconfig[mgENV].mysql.db,
	  connectTimeout: 900000
});

connection.connect();

module.exports = connection;



	    

