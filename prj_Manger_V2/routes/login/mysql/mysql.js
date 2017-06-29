//console.log("11");
var mgconfig = require('../../../config/mgconfig.json');

var mysql = require('mysql');

var mgENV=global.mgENV;

//console.log(mgconfig[mgENV]);

var connection = mysql.createConnection({
	  host     : mgconfig[mgENV].mysql.host,
	  user     : mgconfig[mgENV].mysql.user,
	  password : mgconfig[mgENV].mysql.password,
	  database : mgconfig[mgENV].mysql.db
});

connection.connect();

module.exports = connection;


/*

 var mysql = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'nodejs',
   password : '123456',
   database : 'zhengquan'
 });

 connection.connect();

 connection.query('SELECT * FROM `gupiao`  where 1', function(err, results, fields) {
   if (err) throw err;
   console.log(results);
   console.log(fields);
   //console.log('The solution is: ', rows[0].solution);
 });
 
 */


/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'maxuan',
  password : '123456',
  database : 'zhengquan'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();


*/


 //connection.end();
	    

