console.log("11");
var settings = require('./config');
console.log("22");

var mongodb = require('mongodb');
//console.log(mongodb);


var Db = require('mongodb').Db;


var Connection = require('mongodb').Connection;

//console.log(Connection.DEFAULTPORT);

var Server = require('mongodb').Server(settings.host,27017,{});;



module.exports = new Db(settings.db, Server);