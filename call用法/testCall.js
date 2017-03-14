//链接redis
var redis = require("redis"),client = redis.createClient({host:'192.168.0.100' , port:6379});

for(var i=1;i<=30;i++) {
    var key = "b"+i;

    (function(){
      //client.get( key, function(err, reply) {
      //  if (err) throw err; 
      //  console.log(i,reply);
     // }
      console.log(i);
     } 
    ).call(i);






}
