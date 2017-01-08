


//点击登录按钮
$("#login").click(function(){
	var username = $("#username").val();
	var password = $("#password").val();
	
	if(username == '') {$("#info").text('用户名不能为空'); return;  } 
	if(password == '') {$("#info").text('密码不能为空'); return;  } 

	//console.log(username ,  password);

	$.ajax({
		url:'/mg/logincheck',
		data:{u:username , p:password },
		type:'POST',
		dataType:'json',   

		success: function(data){
			console.log(data);
			var code = data.code;
			if(code == '204')  $("#info").text(data.err);   
			if(code == '201') {
				//$("#info").text(data.data);
				window.location.href = "/mg/index"

			}   
		}

	})

});








function canceladm(auid)
{
con=confirm("确定要注销吗?");
	
if(con==true) {

$.ajax({
url:'/cancelAdm',
data:{id:auid,},
type:'GET',
dataType:'json',   

success: function(data){
	var admclass= 'div.adm'+auid;
	if(data.des == true)  { alert('注销成功'); $(admclass).hide("slow");}
	else  alert('warn:' + data.des);
}

})
	
		
//alert(auid);
} 
}





function cancelmod(modid)
{
	con=confirm("确定要注销吗?");
	
	if(con==true) {
		//alert('ID:' + modid)
		$.ajax({
			url:'/cancelMod',
			data:{id:modid,},
			type:'GET',
			datatype:'json',
			
		   success: function(data) {
			 var modclass='div.mod' +modid;
			 if(data.des==true) { alert('注销成功'); $(modclass).hide("slow");}
				else  alert('warn:' + data.des);
		   }      
			
		})   //ajax  end
	}
}



function cancelusers(sid, userid)
{
	con=confirm("确定要注销吗?");
	//alert('ID:' + userid)
	if(con==true) {
		
		$.ajax({
			url:'/cancelUser',
			data:{id:sid},
			type:'GET',
			datatype:'json',
			
		   success: function(data) {
			 var userclass='div.usersclass' +userid;
			 if(data.des==true) { alert('注销成功'); $(userclass).hide("slow");}
				else  alert('warn:' + data.des);
		   }      
			
		})   //ajax  end
	}
}


function setSession(key,value)
{
		$.ajax({
			url:'/setSession',
			data:{'value':value, 'key':key},
			type:'GET',
			datatype:'json',
			
		   success: function(data) {
			 if(data.des!=true) alert('warn:' + data.des);
		   }      
			 
		})   //ajax  end

}















