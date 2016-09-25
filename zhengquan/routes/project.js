//console.log('Project')
var mongodb = require('./db.js');
var ObjectID = require('mongodb').ObjectID;

function Project(project) {
		this.projid = project.desid;
		this.name = project.name;
	    this.desc = project.name;
		this.desgid = project.desgid;
		this.port = project.port;
	};	
	
module.exports = Project;

//---project  文档的数据库操作.
		
// 1.findone	-name
	    
Project.prjfindone = function prjfindone(prjname,callback){
	mongodb.open(function(err,db){
		if(err) {return callback(err);}
		db.collection('project',function(err,collection){
			if(err) { return callback(err);}
			  
			  //--开始数据库操作
		      // var tmp = new Designer({});
			   collection.findOne({name:prjname},function(err,doc){
				if(err) {
					callback(err);
				}	else {
					callback(err,doc);
				}		
				
		    });  //collection.findone end!
			
		});  //--db.collection end!
   });  //--mongodb.open end!
}   //--designerfindone function end!
	
		
//2.findone_X	-x  0:_id, 1:projid 2:name

Project.Prjfindone_X = function Prjfindone_X(x, val ,callback){
	mongodb.open(function(err,db){
		if(err) {return callback(err);}
		db.collection('project',function(err,collection){
			if(err) { return callback(err);}
			var nullerr=null;
			//console.log("Val:"+val);
			//console.log("x:"+x);		
			  //--开始数据库操作
		     switch(true)  
		     {
		    
		     case x==0:
		    	      //console.log('11');
					var objID= new ObjectID(val);
				     collection.findOne({'_id' : objID } , function(err,doc){
						if(err) {callback(err);}	else {mongodb.close();callback(err,doc);  }	
					 });  
		    	 break;
		    
		     case x==1:
			     collection.findOne({'projid' :  val}   , function(err,doc){
						if(err) {callback(err);}	else {mongodb.close();callback(err,doc);}	
					 });   
		    	 break;
		    	 
		     case x==2:
			     collection.findOne({'name'  :  val}   , function(err,doc){
						if(err) {callback(err);}	else {mongodb.close();callback(err,doc);}	
					 });  
		    	 break;
		     
		     case true:
		    	 mongodb.close();
		    	 callback(nullerr);
		    	 break;	 
		     }
		     
		});  //--db.collection end!
   });  //--mongodb.open end!
}   //--designerfindone function end!


		
// 3.insert

Project.prjinsert = function prjinsert(newproj,callback) {
	mongodb.open(function(err,db) {
		if(err) {  return callback(err);}  
        db.collection('project',function(err,collection){
        	if(err) {  return callback(err);}
	        
        	//开始数据库操作
        	//var tmperr = 'System Error:project insert failed.';
    	    //collection.ensureIndex('name',{unique: true});
    	   // console.log(newproj);
    	    collection.insert({projid:newproj.projid  , name: newproj.name , desc: newproj.desc   , desgid: newproj.desgid ,  cancelstatus : 1, port: newproj.port }, {safe:true},function(err,doc){ 
    	    	if(err){
    	    		return callback(err);} 
    	    	else {
				   callback(err,doc);
    		    } 
    	    	
    	    });  //--collection.insert end!

      });  //--db.collection end!
	});   //--mongodb.open end!
}  //--desginsert function end!

		
//4. cancel project      cancelstatus: 0:注销， 1：正常

Project.PrjCancel = function PrjCancel(val,callback) {
	mongodb.open(function(err,db){
		if(err) { mongodb.close();return callback(err);}
		db.collection('project',function(err,collection){
			if(err) {  mongodb.close(); return callback(err);}
			var nullerr=null;
			var objID= new ObjectID(val);
		
			console.log("ID:"+ val);
		
			collection.update({'_id' : objID }, {$set: {cancelstatus: 0}}, {w:1}, function(err) {
			      if (err) { console.warn(err.message);} 
			      else console.log('successfully updated');
			      callback(err);
			    });
			
			
			
			//console.log("Val:"+val);
			//console.log("x:"+x);		
	
	  });  //--db.collection end!
  });   //--mongodb.open end!
}   //--function end!



	
// designer文档的数据库操作,END!  -->






































