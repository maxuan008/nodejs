var express = require('express');
var router = express.Router();
var assert=require('assert');
var moment = require('moment');
var user = require("../model/user");
var async = require("async");

router.get('/', function(req,res,next)  {

   console.log(req.session.userdatas);
   var uid = req.session.userdatas.info.uid;
   var username = req.session.userdatas.info.username;


   user.getUserAllPrj(uid, function(err,docs){
       //console.log(docs);
       if(err) return res.send({code:204, err:err});

       var data={username:username};
       var projectlist='' ,prjs=[];
       //req.session.userdatas.prjs=[];
       
       var i=-1;
       async.eachSeries(docs, function(doc, callback) { 
                i++;
                var prjname =  doc.prj_name , pid =  doc.pid, port=doc.port, domain_url=doc.domain_url  ;
                var checkedstr = '';
                if(i==0) { //设置选择的项目
                    checkedstr = 'checked';
                    req.session.userdatas.selectprj = {pid:pid};
                }

                projectlist = projectlist +
                            "<li>" +
                            "   <input tabindex='8' type='radio' pid='" + pid + "' name='prjlist' " + checkedstr + "  onclick='selectOnePrj(this)'   >" +
                            "   <label for='minimal-radio-2'>" + prjname + "</label>" +
                            "</li>" ;

               user.getPrjRolesAndFuns(doc,function(err,roleAndFuns){
                   if(err) console.log(err);
                   prjs[i]= roleAndFuns;
                   //console.log('gggggggggg:',i,prjs[i]);
                   callback();
               }); //  user.getPrjRolesAndFuns  end


       }, function(err){ 
            if(err) console.log(err);
           
            data.projectlist = projectlist;
            req.session.userdatas.prjs = prjs;

            if(i<0) return res.render('login/projectselecter',data);
            else { //设置选择的项目和用户的角色， funs的url信息
                var pidSelected = req.session.userdatas.selectprj.pid;
                user.setSelectRoleAndFunUrls(pidSelected,uid , function(err,datas){
                    if(err) return res.send({code:204, err:err});
                    req.session.userdatas.selectprj.rid = datas.rid;
                    req.session.userdatas.selectprj.havfunUrls = datas.havfunUrls;
                    req.session.userdatas.selectprj.ishavedomain = datas.ishavedomain;
                    //res.send(req.session.userdatas);
                    return  res.render('login/projectselecter',data);
                });  //user.setSelectRoleAndFunUrls end 
            }
           //res.render('login/projectselecter',data);
      }); //async.eachSeries  end


   });  //user.getAllPrjAndRoles end

	
});   //get  end!



module.exports = router;















