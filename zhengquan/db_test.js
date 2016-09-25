  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;    

  MongoClient.connect('mongodb://127.0.0.1:27017/mx', function(err, db) {
    if(err)  {throw err; console.log("11");}
      var collection = db.collection('mx');
    collection.insert({name: 'kkk',sex:'m',age:13}, {w:1}, function(err, objects) {
    	
    	console.log("22");
      if (err) { console.warn(err.message);console.log("33");  }  
      
      
      if (err && err.message.indexOf('E11000 ') !== -1) {
        // this _id was already inserted in the database
          console.log("666");  
      }
      
      db.close();
        
    });
    
   
  });