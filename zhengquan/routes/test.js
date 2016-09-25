var assert=require('assert');
var async = require('async');
var config = require('./config');
var EventProxy =   require('eventproxy');



function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };
 //sleep(10000);  等待10秒。
 
 console.log('aaa');
// sleep(3000);
 //console.log('bbb');
 
 var reu;
 
 
 //console.log('bbbb');
 
 var mysql = require('mysql');
 
 //console.log('ccccc');
 var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : config.user,
	  password : config.password,
	  database : 'zhengquan'
 });
 //console.log('ddddd');
 

 
 connection.connect();
 connection.query('SELECT * FROM `gupiao`  where status = 1', function(err, results) {
		  // if (err) callback(err);
		   
		    //console.log(results);
		    if(results.length==0) console.log('null');
		    
		    async.eachSeries(results,function(value,callback){
		    	
		    	reu=reu + "<tr class=\'success\'> ";
		    	reu=reu + "<td>" + value.name +" </td>";
		    	reu=reu + "<td>" + value.code +" </td>";
		    	reu=reu + "<td>" + value.price +" </td>";
		    	reu=reu + "<td><a>修改</a>  <a>注销</a></td>";
		    	reu=reu + " </tr>";
		    	
		    	callback();
		    	
		    }, function(err){
		    	connection.end();
		    	 console.log(reu);
		    	 
		    });  // async  end
 });
 
 /*
		    connection.connect();
		    //console.log('eeeeee');
		   // connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
		   	  // error will be an Error if one occurred during the query
		   	  // results will contain the results of the query
		   	  // fields will contain information about the returned results fields (if any)
//		   	});
 
 connection.query('SELECT * FROM `gupiao`  where 1', function(err, results) {
   if (err) throw err;
  // console.log('ffffff');
   console.log(results);
   //console.log(fields);
 });

 //connection.end();
 
 */

 
 //ar kk=upload();
 
 //console.log('flag:'+kk);
 
	//结果不成功，  return 不能再mongodb.open(function(err,db){})  中使用


 
 //if(IsModuleExist(2) == 1 ) console.log('11111');
 //else console.log('00000');
 


 /*
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
function IsModuleExist(modid,callback) {
		mongodb.open(function(err,db){
			assert.equal(err,null);
			var cursor=db.collection('module').find({'modid':modid , 'cancelstatus':1});
			cursor.toArray(function(err,doc){
				if(doc.length == 0)  return callback(false);
				else
					 return callback(true);
			});
			
		});

	}

	 
	function upload() { 
	  console.log("Request handler 'upload' was called."); 
	  return "Hello Upload"; 
	} 
 
	IsModuleExist(2,function(flag){
		 console.log('flag:' + flag)
	});
 
	mongodb.open(function(err,db){	
		if(err) return callback(err);
		var val = 6
		//var  cursor = db.collection('admuser');
			    
		db.collection('admuser').update({auid: val}, {$set: { cancelstatus : 0 }}, {w:1}, function(err) {
		          if (err) console.log(err);
		          else  {console.log('注销成功');  }
		       });
	


   // var val='test',  projID = 11 ;
	mongodb.open(function(err,db){
		if(err) {console.log(err);}
		

		var cursor_prj =db.collection('project').find( {'cancelstatus' : 1} );
	    assert.equal(err,null);
	    var cursor_admin_coll=db.collection('admuser');
	    assert.equal(err,null); 

		var n=0, t=0,  reu=null, alldoc=null;
		//--project to array
		cursor_prj.toArray(function(err,docprj){
			if(docprj.length==0)  {console.log('Project NULL');}
			else
				{
	
				//console.log(docprj.length);

				async.eachSeries(docprj,function(prjvalue,callback){
				    
					var ep =new EventProxy();
					n++;		
					var prjlistn='prjlist'+n  ,  adminlistn='adminlist'+n ,    userlistn='userlist' +n ,   modulelistn= 'modulelist'+n ;
					var prjtmp=null, admtmp=null, usertmp=null, moduletmp=null;	
					
					ep.all(prjlistn  , adminlistn ,  userlistn  , modulelistn   ,function(prjlist, adminlist, userlist , modulelist){ 
						
						alldoc = alldoc + prjlist;
						
						alldoc = alldoc + "<tr class=\'success\'><td>管理账户：</td><td> " +  adminlist +    "</td><td><a href=\'http://localhost:3008/addaccountAdm?sid="+ prjvalue._id +  "\' style=\'color: #3366FF\'> + 添加</a></td></tr>";	
						alldoc = alldoc + "<tr class=\'info\'><td>用户：</td><td>"+ userlist + "</td><td><a href=\'http://localhost:3008/addaccountUser?sid="+  prjvalue._id +  "\'  style=\'color: #3366FF\'> + 添加</a></td></tr>";
						
						alldoc = alldoc +  "<tr class=\'warning\'><td>功能模块：</td><td>" + modulelist + " </td><td><a href='http://localhost:3008/addmod?sid="+  prjvalue._id +  " ' style='color: #3366FF'> + 添加</a></td></tr>"   ;
						
						 console.log('Event Proxy-----PrjID:' + prjvalue.projid );
						 
					return 	callback(); 
					});  //--ep.all end
				   //  ep.emit('prjlist', prjtmp);	
				  // ep.emit('adminlist', admtmp);	
				    // ep.emit('userlist', usertmp);	
				   
					
				     console.log('PrjID:' + prjvalue.projid );
					
				     //4.功能模块List， 触发，ep.all
					    ep.all( userlistn, function(adminlist){
					    	getProject.getmodulelist( prjvalue.projid , function(resul){
									  console.log(resul);
									   ep.emit( modulelistn , resul);			   
								   });  
					    });
				     
	 
					//--3.用户List，  触发：4.功能模块List
				    ep.all(adminlistn, function(modulelist){
				    	getProject.getuserprojectlist( prjvalue.projid , function(resul){
								  console.log(resul);
								   ep.emit( userlistn, resul);			   
							   });  
				    });
 
					//--2. 管理账户List， 触发：3.用户List
				    
                      //console.log('1Pid:' + prjvalue.projid );
				 ep.all(prjlistn, function(prjlist){				 
					 getProject.getadmlist( prjvalue.projid , function(resul){
						  console.log(resul);
						   ep.emit(adminlistn, resul);			   
					   });  
				 });
				 
				 
				 //1.project list, 触发：2管理账户List
				  prjtmp= prjtmp + " <div class=\\'container-fluid\'><div class=\'row-fluid\'><div class=\'span12\'><p class=\'table-striped\'></p><table class=\'table table-striped\'>";
				  prjtmp= prjtmp + "<thead><tr><th>项目"+ n + "："+ prjvalue.name +  " &nbsp;&nbsp;&nbsp;&nbsp; <br />端口:"+ prjvalue.port +  " </th><th><a  target = '_blank' href='http://localhost:" + prjvalue.port + "  ' style='color: #3366FF'> >>入口   </a> </th><th><a href='http://localhost:3008/cancelprj?sid="+ prjvalue._id +  "  ' style='color: #3366FF'>-注销</a></th></tr></thead><tbody><tr><td></td><td></td><td></td></tr>";
				  ep.emit(prjlistn, prjtmp);
				 
    
				}, function(err) {
				 if(err==null)  console.log(alldoc);  
					});
				
				}  //--if end
			
		});
		*/
		
		
		
		/*
		 * 
		 * 
		 * 
		 					//--1. 管理账户List
				    var cursor_admin=db.collection('admuser').find({'projid':prjvalue.projid , 'cancelstatus':1  });
				    assert.equal(err,null); //console.log('111');
				    var ad=0;
				    cursor_admin.toArray(function(err,docadm){
				    	if(docadm.length == 0)   ep.emit('adminlist', admtmp);
				    	else
				    	{    //console.log('222');
				    		  async.eachSeries(docadm, function(docvalue, callback){
						    	   ad++;
						    	   admtmp = admtmp + ad +":" + docvalue.name +"<br />";
						    	  // console.log(admtmp);
						    	   callback();
				    		  },  function(err) { if(err==null) {//  console.log(admtmp); 
				    		    ep.emit('adminlist', admtmp);
				    		  }      });   //-- async.eachSeries  end
					   }  //--if end
				    	
				    }); //cursor_admin.toArray
		 
		 * 
		 * 
		 * 
		 * 
		 * 
		 * 
		
		db.collection('users',function(err,collection){
			if(err) {console.log(err);}
				
			var cursor_users =db.collection('users').find( {'name':val,'cancelstatus' : 1} );
			var cursor_usersproject =db.collection('userproject');	
			  var flg=0, nulltmp=null;
			  var  reuu=null;
			  

	    		    	 cursor_users.toArray(function(err, doctmp) {
	    		    	    if(doctmp.length==0)       {console.log(nulltmp); } 
	    		    	    else
	    		    	    { 
	    		    	       async.eachSeries(doctmp, function(value, callback){
	    		    	    	  cursor_usersproject.findOne({'userid':value.userid ,  'projid': projID, 'cancelstatus' : 1  },function(err,result) {
	    		    	    	  assert.equal(err,null);
	    		    			  if(result !=null)  {flg=1;  reu=value;return callback(err); }
	    		    			  else
	    		    				 return callback(); 
                                  });		//--cursor_usersproject.findOne	 
	    		    	    	
                                }, function(err) {
	    		    	    		if(err)  console.log(err);  
	    		    	    	//	console.log('flg:' + flg);
	    		    	    		//console.log( reu);
	    		    	        } );   //async.eachSeries  end
	    		    	    	
	    		    	   }  //--if  end     		       
                       });     //--cursor_users.toArray end	    		
	    		  
	    		    	 var task={'a':1 , 'b':2 , 'c':3};
	    		    	 var kkk=[];
		                   var st=0;
	    		    	    async.forEachOf(task, function(value, key,callback){ kkk[st]=value; st++;console.log(value);console.log(key);callback(); }, function(err){
	    		                console.log(kkk);   
	    		    	    	var ttt=[];
	    			    		   	 
	    			    		   	 for(var i=0; i<3;i++) {
	    			    		   		 ttt[i]= kkk[i];
	    		          	   
	    		                      }
	    			    		   	 console.log(ttt);
	    		    	    	
	    		    	    	console.log(st);
	    		    	    	
	    		    	    } );
	    		    	 
	 
	    		  });      */
	    		   	 
	    		   	 
	    		   	 
	    		   	 
	    		   	 
	    		      // console.log(tasks);
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    	 
	    		    		 /*
	    		    		  * 
	    		    		  * 
	    		    		  * 
	    		    		  * 	    		    	    	
	    		    	    	
	    		    	    	console.log('LEN:' + doctmp.length); 
	    		    		    for(m in doctmp)
	    		    	           {console.log(m + ',' + doctmp[m].userid); 
	    		    		   	    cursor_usersproject.findOne({'userid':doctmp[m].userid ,  'projid': projID, 'cancelstatus' : 1  },function(err,result) {
	    		    		   		     assert.equal(err,null);
	    		    				     if(result !='') { 'M:' +m + ',' + doctmp[m].userid; }
	    		    				     else
						    	   	         if( (m+1)==doctmp.length)   {console.log('nulltmp'); } 
	    		    		     	});		//--cursor_usersproject.findOne	 
	    		    	           }//--for end	  
	    		    		  * 
	    		    		  * 
						      if(n<=count)  {				        
						            	cursor_usersproject.findOne({'userid':doctmp.userid ,  'projid': projID, 'cancelstatus' : 1  },function(err,result) {
								             assert.equal(err,null);
							    	   	     if(result !='') { console.log(doctmp); }
							    	   	     else
							    	   	         if(n==count)   {console.log(nulltmp); }        
							              });  //cursor_usersproject.findOne end if		      	
						       }
						 

 }); 
	});
     */
	    		
		
		
	    		    	    

		
		