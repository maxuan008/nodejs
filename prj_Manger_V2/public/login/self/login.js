//定义全局变量






//点击登录按钮
$("#login").click(function(){
	var username = $("#username").val();
	var password = $("#password").val();
	
	if(username == '') {$("#info").text('用户名不能为空'); return;  } 
	if(password == '') {$("#info").text('密码不能为空'); return;  } 

	//console.log(username ,  password);

	$.ajax({
		url:'/login/logincheck',
		data:{u:username , p:password },
		type:'POST',
		dataType:'json',   

		success: function(data){
			console.log(data);
			var code = data.code;
			if(code == '204')  $("#info").text(data.err);   
			if(code == '201') {
				//$("#info").text(data.data);
				//window.location.href = "/login/index"
				$("#info").text('用户验证成功'); 
				var newurl = "/login/projectselecter";
				window.location.href = newurl;

			}   
		} //success end

	})

});









//------projectselecter---选择器页面----//

function selectOnePrj(ele) {
   var pid =  ele.getAttribute('pid');

   if(pid == '') {alert("pid数据不正确");  return ;}

	$.ajax({
		url:'/login/selectoneprj',
		data:{pid:pid},
		type:'post',
		datatype:'json',
		
		success: function(backdatas){
			console.log(backdatas);
			var code = backdatas.code;
			
			if(code == '204')  {alert("err:" , backdatas.datas.err );};   
			if(code == '201') {

			}   
		} //success end
			
	})   //ajax  end



}













