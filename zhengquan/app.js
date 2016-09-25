var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//var tes= require('./routes/test');
//var boots= require('./routes/boots');

var config = require('./routes/config');
var routes = require('./routes/index');
var users = require('./routes/users');
var login= require('./routes/login');

var gupiaozhengquan= require('./routes/gupiaozhengquan');
var gupiao_balancesheetzhengquan = require('./routes/gupiao_balancesheetzhengquan');
var qiquanzhengquan = require('./routes/qiquanzhengquan');
var qiquan_balancesheetzhengquan = require('./routes/qiquan_balancesheetzhengquan');

//var cancelprj = require('./routes/cancelprj');
//var addaccountAdm=require('./routes/addaccountAdm');
//var addaccountUser=require('./routes/addaccountUser');
//var addmod=require('./routes/addmod');

//var cancelAdm=require('./routes/cancelAdm');
//var cancelMod=require('./routes/cancelMod');
//var cancelUser=require('./routes/cancelUser');
var AjaxCancelGupiao=require('./routes/AjaxCancelGupiao');

var AjaxAddGupiao=require('./routes/AjaxAddGupiao');
var AjaxupdateKey=require('./routes/AjaxupdateKey');
var AjaxAddqiquan=require('./routes/AjaxAddqiquan');
var AjaxCancelQiquan=require('./routes/AjaxCancelQiquan');
var AjaxBuy=require('./routes/AjaxBuy');
var AjaxBuyQiquan=require('./routes/AjaxBuyQiquan');

var AjaxMingxi=require('./routes/AjaxMingxi');
var AjaxUpdateSQLstring=require('./routes/AjaxUpdateSQLstring');



var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view options', { pretty: true });
//console.log('333;');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//console.log("3333");
var dbpath = 'mongodb://' + config.host +':'+config.port + '/' + config.db;
//console.log(dbpath);

var newstroe = new MongoStore({
	   url:dbpath,
	   ttl: 3000,
	   });
//autoRemove: 'interval',
//autoRemoveInterval: 1 //     ttl: 14 * 24 * 60 * 60 // = 14 days. Default
//console.log('555');

//console.log(newstroe);

app.use(cookieParser());

app.use(session({
    secret:config.cookiesecret,
    resave: false,
    saveUninitialized: false,
    store: newstroe,
}));


//console.log(express.session);

app.use(express.static(path.join(__dirname, 'public')));

//console.log('3333;');

//app.use('/test', tes);
//app.use('/boots', boots);

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

app.use('/gupiaozhengquan',gupiaozhengquan);
app.use('/gupiao_balancesheetzhengquan',gupiao_balancesheetzhengquan);
app.use('/qiquanzhengquan',qiquanzhengquan);
app.use('/qiquan_balancesheetzhengquan',qiquan_balancesheetzhengquan);

//app.use('/cancelprj', cancelprj);
//app.use('/addaccountAdm',  addaccountAdm);
//app.use('/addaccountUser', addaccountUser );
//app.use('/addmod', addmod);
//app.use('/cancelAdm',cancelAdm);
//app.use('/cancelMod', cancelMod );

//app.use('/cancelUser', cancelUser );

app.use('/AjaxCancelGupiao', AjaxCancelGupiao);

app.use('/AjaxAddGupiao', AjaxAddGupiao);

app.use('/AjaxupdateKey', AjaxupdateKey);
app.use('/AjaxAddqiquan', AjaxAddqiquan);
app.use('/AjaxCancelQiquan', AjaxCancelQiquan);
app.use('/AjaxBuy', AjaxBuy);
app.use('/AjaxBuyQiquan', AjaxBuyQiquan);
app.use('/AjaxMingxi', AjaxMingxi);
app.use('/AjaxUpdateSQLstring', AjaxUpdateSQLstring);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
//console.log('666;');

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//console.log('7777;');

app.listen(config.httpPort, function () {
	var time = new Date();
	console.log('证券投资>>Port:'+ config.httpPort +', Listen Succeed at:' + time );
 
	});

module.exports = app;

//console.log('The End;');
