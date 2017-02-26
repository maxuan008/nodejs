var Mysql = require("../mysql/mysql");

var async = require("async");

function templater(data) {
     this.data = data;
}

module.exports = templater;

//----SQL语句查询--

    templater.SQL = function (str,callback){
        console.log('SQL:',str);
        Mysql.query(str, function(err,doc){
            if(err) console.log(err);
            return callback(err,doc);
        });

     }


//*****插入******************//

    //向数据库中插入一条数据data, data为json数据类型
    templater.add = function (table,data,callback){
        var str = "INSERT INTO `" + table + "` SET ?";
        Mysql.query(str, data , function(err,doc){
            if(err) console.log(err);
            return callback(err,doc);

        });

     }

    //向数据库中插入多个数据data, data为数组数据类型
    templater.add_Arry = function (table,datas,callback){
        console.log('EEEEEEE' , table ,datas  );
        var me = require("./templater");
        
        async.eachSeries(datas, function(data, callback) { 
            me.add(table, data ,function(err,doc){
                if(err) console.log(err);
                callback();
            }); //me.add end 
            
        }, function(err){

            return callback(err);
        }); //async.eachSeries end 

    }



//*****插入 END***************//





//*****修改******************//

    //向数据表中更新条件为wherejson的一条数据data, data为json数据类型
    templater.update = function ( table, wherejson,  data, callback ){
        var wherestr = " where ";
        for(var x in wherejson)  wherestr = wherestr + " `" + x + "`  = '" + wherejson[x] + "' ";
        
        var updatestr = "UPDATE `" + table + "` SET ";

        var str = "";
        var k=-1;
        async.forEachOf(data, function (value, key, callback) {
            k++;
            if(k==0) updatestr =  updatestr + " `" + key + "` = '" + value + "' "  ;
            else if(k>0) updatestr =  updatestr + " ,  `" + key + "` = '" + value + "' "  ;

            callback();
      
        } ,function(err) {

            if(err) console.log(err);
            str = updatestr + wherestr;
            
            if(k == -1)  return callback("template函数'",table,"' 中数据为空数据");
            else {
                console.log(str);
                Mysql.query(str,  function(err,doc){
                    if(err) console.log(err);
                    return callback(err,doc);
                });
            } //if end

        });   //async.forEachOf end


     }


//*****修改 END***************//



//*****查询******************//

    //向数据表中查询条件为wherejson的数据数组， 返回数据为数组, selectstr : `a`,`b`,`c`
    templater.get = function (table, wherejson,selectstr, callback){
        var wherestr = " WHERE 1 ";

        if(selectstr) var str = " SELECT" +  selectstr + " FROM  `" + table + "`  ";
        else var str = " SELECT * FROM  `" + table + "`  ";

        var k=0;
        async.forEachOf(wherejson, function (value, key, callback) {
            k++;
            wherestr =  wherestr + " AND  `" + key + "` = '" + value + "' "  ;
            callback();
      
        } ,function(err) {

            if(err) console.log(err);
            str = str + wherestr;
            
            if(k == 0)  return callback("template函数'" + table +"' 中查询条件数据为空数据");
            else {
                console.log(str);
                Mysql.query(str,  function(err,docs){
                    if(err) console.log(err);
                    return callback(err,docs);
                });
            } //if end

        });   //async.forEachOf end

     }



//*****查询 END***************//



//*****删除******************//

    //向数据表中删除条件为wherejson的数据数组，
    templater.delete = function (table, wherejson,callback){
        var wherestr = "  where   ";
        var str = " DELETE FROM  `" + table + "`  ";
        var k=0;
        async.forEachOf(wherejson, function (value, key, callback) {
            k++;
            if(k<=1)  wherestr =  wherestr + "  `" + key + "` = '" + value + "' "  ;
            else wherestr =  wherestr + " AND  `" + key + "` = '" + value + "' "  ;

            callback();
      
        } ,function(err) {

            if(err) console.log(err);
            str = str + wherestr;
            
            if(k == 0)  return callback("template函数中'",table,"' 中删除条件数据为空数据");
            else {
                console.log(str);
                Mysql.query(str,  function(err,docs){
                    if(err) console.log(err);
                    return callback(err,docs);
                });
            } //if end

        });   //async.forEachOf end

     }





//*****删除 END***************//





//*****查询表中的某个字段的值是否已经存在******************//

    //向数据表中查询条件为wherejson的数据数组， 返回数据为数组, selectstr : `a`,`b`,`c`
    templater.isExist = function (table, wherejson, callback){
        var wherestr = " WHERE 1 ";

         var str = " SELECT * FROM  `" + table + "`  ";

        var k=0;
        async.forEachOf(wherejson, function (value, key, callback) {
            k++;
            wherestr =  wherestr + " AND  `" + key + "` = '" + value + "' "  ;
            callback();
      
        } ,function(err) {

            if(err) console.log(err);
            str = str + wherestr;
            
            if(k == 0)  return callback("template函数'" + table +"' 中查询条件数据为空数据");
            else {
                console.log(str);
                Mysql.query(str,  function(err,docs){
                    if(err) console.log(err);
                    else {
                        if(docs.length <=0 ) return callback(err,false);  //不存在
                        else return callback(err,true);  //存在

                    }
                    
                });
            } //if end

        });   //async.forEachOf end

     }



//*****查询 END***************//






