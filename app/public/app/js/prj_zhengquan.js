
/**
 * Created by mx
 */

var app5 = window.app5;

$(function(){

    app5.htmlinit();


    $("#lagout").click(function(){
        app5.lagout();
    });

   

});

 //执行子功能
 function doFun(ele) {
     var fid = ele.getAttribute('fid');
     //console.log(fid);

     app5.doFun(fid);

 }

 //添加证券
