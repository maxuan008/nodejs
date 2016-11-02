//console.log('admlogin');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var MySql = require('./MySql');
var refer_qiquan=require('./class/refer_qiquan');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '535851926@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'vtsifzosgrfqbjff'
    }
});


var mailOptions = {
    from: '535851926@qq.com', // 发件地址
    to: '313478554@qq.com', // 收件列表
    subject: '期权市场漏洞', // 标题
    //text和html两者只支持一种
    html: '' // 标题
};



router.post('/', function(req,res,next)  {
	if(req.session.users !=null &&  req.session.selproject !=null)  {  	                //如果session存在
		//console.log(req.body);
		var info = JSON.parse(req.body['info']) ;
		//var info = req.body['info'] ;
		console.log(info);

		mailOptions.html = info;
		
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, resinfo){
			if(error){
				console.log(error);
				res.send({status:'404',err: error});
			} 
			console.log('Message sent: ' + resinfo);

			res.send({status:'200'});

		});

		
		//res.send({status:'404',err: err});

	
	} else {
		res.render('error', 'Session Out, Login again!');
	}//--if  session end
});   //--Post end!



module.exports = router;

