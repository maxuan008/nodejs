var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var os = require('os');

var config = require('./config/appconfig.json');

var app = express();
var mgenv = app.get('env');
global.mgENV = mgenv;
console.log("----ENV模式: ",mgenv );
// view engine setup

//var fs = require('fs');
//var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
//var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});

var ip4='';

if(os.networkInterfaces().eth0) {
    for(var i=0;i<os.networkInterfaces().eth0.length;i++){
        if(os.networkInterfaces().eth0[i].family=='IPv4'){
          ip4=os.networkInterfaces().eth0[i].address;
        } //if end
    } //for end 
}  //if end

var hostname = os.hostname();
//console.log(os.networkInterfaces() );

console.log('----操作系统类型: ', os.type());
console.log('----主机名: ' , hostname );
console.log('----IP地址: ' , ip4);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//console.log('__dirname1:', path.join(__dirname, 'public') );

//app.set('view options', { pretty: true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//console.log(config);
var dbpath = 'mongodb://' + config[mgenv].mongodb.host +':'+config[mgenv].mongodb.port + '/' + config[mgenv].mongodb.db;
//console.log(dbpath);

var newstroe = new MongoStore({
	   url:dbpath,
	   ttl: 90000,
	   });
//autoRemove: 'interval',
//autoRemoveInterval: 1 //     ttl: 7 * 24 * 60 * 60 // = 7 days. Default

app.use(cookieParser());

app.use(session({
    secret:config[mgenv].cookiesecret,
    resave: false,
    saveUninitialized: false,
    store: newstroe
   })
);

console.log("----mongodb 信息, ip: %s , 端口: %s , 数据库: %s" , config[mgenv].mongodb.host ,  config[mgenv].mongodb.port , config[mgenv].mongodb.db );

//*****项目登陆入口：login******//

//var login =  require('./routes/login/controller/login');
//var logincheck = require('./routes/login/controller/ajax/logincheck');
//var projectselecter = require('./routes/login/controller/projectselecter');
//var selectoneprj = require('./routes/login/controller/ajax/selectoneprj');

//项目入口
var zhengquanindex = require('./routes/app/zhengquanindex');

var sessionindex = require('./routes/session/index');


//*****项目登陆入口：login END******//









//*******中间件：可以用于sesssion验证, 可信任站点，log访问日志的等等*********//

   //***permitPath中的路径为可信任路径看，无需session也能通过中间件***//
var permitPath =[ '/app/zhengquan/lagout'  ];



app.use( function(req, res, next) {
    //console.log("baseUrl:",req.baseUrl,"path:" , req.path , "originalUrl:" , req.originalUrl);
    //console.log(req);
    var reqpath = req.path;
    var originalUrl = req.originalUrl;
    var urlarry = reqpath.split('/');  //console.log(urlarry);
    var baseUrl = urlarry[1];  //console.log("baseur:" , baseUrl ,"arr:" , urlarry);

    //console.log('session数据：', req.session.userdatas);

    if( permitPath.indexOf(originalUrl) > -1 )  { //通过可信任路径
      next();

    } else {  //如果未通过信任路径

        if(req.session.userdatas ) {  //如果通过session
            next();
        } else {  //如果没有通过session ， 代码为：333
            console.log('session未通过验证');
            res.send({code:205  , err: "用户session不存在"   });
        }  

    } // if end

}); // app.use end 



//*******中间件 END*********//



//*****项目登陆入口：login******//
//app.use('/',login);
//app.use('/index',login);
//app.use('/login',login);

//app.use('/login/logincheck',logincheck);
//app.use('/login/projectselecter',projectselecter);
//app.use('/login/selectoneprj',selectoneprj);

//项目入口

app.use('/app/zhengquan',zhengquanindex);

app.use('/session',sessionindex);
//app.use('/zhengquan',zhengquanindex);


//*****项目登陆入口：END******//





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
	//console.log('AAAAA');
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}




/*
app.use(express.logger({stream: accessLogfile}));



 * 	app.error(function (err, req, res, next) {
	var meta = '[' + new Date() + '] ' + req.url + '\n';
	errorLogfile.write(meta + err.stack + '\n');
	next();
	});
 */

// 

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send( {
    message: err.message,
    error: {}
  });
});


app.listen( config[mgenv].port  ,  function () {
	var time = new Date();
	
  console.log("App项目:  prot:" + config[mgenv].port  + ". Listen Succeed at:" + time );

	});



module.exports = app;


