var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var os = require('os');

var config = require('./config/config.json');

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

//app.set('view options', { pretty: true });



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//console.log(config);
var dbpath = 'mongodb://' + config[mgenv].mongodb.host +':'+config[mgenv].mongodb.port + '/' + config[mgenv].mongodb.db;
//console.log(dbpath);

var newstroe = new MongoStore({
	   url:dbpath,
	   ttl: 3000,
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


var mg_login = require('./routes/mg/controller/login');
var mg_index = require('./routes/mg/controller/index');


//var index = require('./routes/mg/controller/index');
//var users = require('./routes/mg/controller/users');
//var login= require('./routes/mg/controller/login');

//var projectSelecter = require('./routes/mg/controller/projectSelecter'); 
//var setSession= require('./routes/mg/controller/setSession');
var mg_logincheck = require('./routes/mg/controller/ajax/logincheck');
var mg_getAllProjects = require('./routes/mg/controller/ajax/getAllProjects');

//*******中间件：可以用于sesssion验证, 可信任站点，log访问日志的等等*********//

   //***permitPath中的路径为可信任路径看，无需session也能通过中间件***//
var permitPath =['', '/','/index' , '/login' , '/mg/login' , '/mg/logincheck'   ];


   //***designerSessionUrl中的路径为manger控制台的:如果不包含访问base路径直接next, 如何包含访问路径则验证session***//
var designerSessionUrl = [ 'mg' ];

app.use( function(req, res, next) {
    console.log("baseUrl:",req.baseUrl,"path:" , req.path , "originalUrl:" , req.originalUrl);
    //console.log(req);
    var reqpath = req.path;
    var originalUrl = req.originalUrl;
    var urlarry = reqpath.split('/');  //console.log(urlarry);
    var baseUrl = urlarry[1];  console.log("baseur:" , baseUrl ,"arr:" , urlarry);

    if( permitPath.indexOf(originalUrl) > -1 )  { //通过可信任路径
      next();

    } else {  //如果未通过信任路径

       if(designerSessionUrl.indexOf(baseUrl) > -1) { //访问路径属于manger
           if( req.session.designer ) {  //如果通过session
               console.log("manger:  session通过验证");
               next();
           } else {  //如果没有通过session ， 代码为：333

               console.log('manger:  session未通过验证');
               res.send({code:204  , err: "manger: session不存在"   });
           }

       } else  {  //访问路径不属于manger
            if(req.session.userInfo  ) {  //如果通过session
               next();
           } else {  //如果没有通过session ， 代码为：333
               console.log('session未通过验证');
               res.send({code:204  , err: "session不存在"   });
           }

       }

    } // if end

}); // app.use end 



//*******中间件 END*********//



//app.use('/',mglogin);
//app.use('/users', users);
//app.use('/login', login);

//app.use('/projectSelecter', projectSelecter);
//app.use('/setSession', setSession);
app.use('/mg/login',mg_login);
app.use('/mg/index',mg_index);

app.use('/mg/logincheck',mg_logincheck);
app.use('/mg/getAllProjects',mg_getAllProjects);





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
//console.log('666;');

// production error handler
// no stacktraces leaked to user

var fs = require('fs');

var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});

/*
app.use(express.logger({stream: accessLogfile}));



 * 	app.error(function (err, req, res, next) {
	var meta = '[' + new Date() + '] ' + req.url + '\n';
	errorLogfile.write(meta + err.stack + '\n');
	next();
	});
 */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen( config[mgenv].mgport  ,  function () {
	var time = new Date();
	
  console.log("项目管理控制台 manger:  prot:" + config[mgenv].mgport  + ". Listen Succeed at:" + time );


	});



module.exports = app;


