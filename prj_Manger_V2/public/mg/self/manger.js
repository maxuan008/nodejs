//全局变量
roleID_addUser='';
prjID_addUser = '';



$(document).ready(function() {
	//alert('OK');
	getAllProjects();

});


//获取所有选项
function getAllProjects() {

	$.ajax({
		url:'/mg/getAllProjects',
		data:{},
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);


			
		}

 	}); //ajax end

 }  //function getAllProjects end





//点击'添加项目'按钮
$("#addproject").click(function(){
	var prj_name = $("#prj_name").val();
	var port = $("#port").val();
	var domain_url = $("#domain_url").val(); 
	
	if(prj_name == '') {$("#warninfo").text('项目名不能为空'); return;  } 

	var data = {};
	data.name = prj_name  ,data.port= port, data.url = domain_url;

	//console.log(username ,  password);

	$.ajax({
		url:'/mg/addproject',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {$("#warninfo").text('创建失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
				$("#warninfo").text('项目创建成功:' + backdata.datas.prj_name);
				//显示新建的项目到页面中

			}   
		}

	}); //ajax end

});



//项目的“添加”模块功能被点击
function addfun(ele) {
	
	var prjid = ele.getAttribute('prjid'); 
	var data ={}; 
	if(document.getElementById("fun_havedomai_"+ prjid).checked) data.isdomain=1;
	else data.isdomain=0;

	data.fun_name = $("#fun_name_" + prjid  ).val();
	data.fun_url = $("#fun_url_"+ prjid ).val();
	data.fun_docname = $("#fun_docname_"+ prjid ).val();
	data.id = prjid;

	if(data.fun_name == '') {alert('模块功能的名称不能为空'); $("#fun_name_" + prjid , this.el).focus();  return;  } 
	if(data.fun_url == '') {alert('功能链接不能为空'); $("#fun_url_"+ prjid, this.el).focus();  return;  } 

    $.ajax({
		url:'/mg/addfun',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {$("#warninfo").text('创建失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
				//显示新建的功能模块到页面中
				var funhtml= "<div class='col-xs-5 col-sm-8' id='fundivdel_" + backdata.datas.id + "'> <a fid='" + backdata.datas.id + "' onclick='delfun(this)'><i class='fa fa-times'></i> </a> 代码:" + backdata.datas.id + ", " + backdata.datas.fun_name + " </div> " ;
 
				$("#funlist_"+ prjid ).append(funhtml);

				//触发此项目的角色，重新获取所有角色的功能
				var roledatas = backdata.datas.roles;
				var fid = backdata.datas.id;
				//getAllRoleFun(prjid,fid,roledatas);

			}   
		}

	}); //ajax end

	
}


//在角色的后面添加新建的功能
function getAllRoleFun(prjid,fid,roledatas) {
	if(roledatas.length >0 ) {
		var htmlstr = '';
		for(var i=0; i<roledatas.length; i++) {


		} //for end

	}//if end


}





//删除具体的功能模块
function delfun(ele) {
	var fid = ele.getAttribute('fid'); 
	var flag = confirm("您确认要删除此功能模块?");
    if(flag == false) return;
    
	if(fid=='' || fid==undefined) {alert('ID数据不正确！');   return;  } 
	var data = {id:fid};
	$.ajax({
		url:'/mg/delfun',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(data){
			console.log(data);
			var code = data.code;
			if(code == '204')  {alert('创建失败:' + data.err); console.log(data.err);  }  
			if(code == '201') {
				//删除页面的具体的功能模块
				$("#fundivdel_" + fid).remove(); 

			}   
		}

	}); //ajax end


}




//项目的“添加角色”被点击
function addrole(ele) {
	var prjid = ele.getAttribute('prjid'); 
	var data ={}; 
	data.name = $("#role_name_" + prjid  ).val();

	if(data.name == '') {alert('角色的名称不能为空'); $("#role_name_" + prjid , this.el).focus();  return;  } 

	if(prjid == '') {alert('项目ID数据错误');  return;  } 
	data.prjid = prjid;

	$.ajax({
		url:'/mg/addrole',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backData){
			console.log(backData);
			var code = backData.code;
			if(code == '204')  {alert('创建失败:' + backData.err);console.log(backData.err);  }  
			if(code == '201') {
				//显示新建的角色到页面中
				var rolehtml= " " +
				    "<tr id='role_"+ backData.datas.id + "'>  "+
					"	<td>"+ backData.datas.role_name + "</td>    "+
					"	<td >    "+
					"		<div id='role_fun_list_"+ prjid + "_"+ backData.datas.id+ "' class='row'>    "+
					"		</div>    "+
					"	</td>    "+
					"	<td >    "+
					"		<div id='role_user_list_"+ prjid + "_"+ backData.datas.id + "' class='row'>    "+
					"		</div>    "+
					"	</td>    "+
					"</tr>   ";
 
				$("#tbody_"+ prjid ).prepend(rolehtml);

			}   
		}

	}); //ajax end

}


//更改角色功能
function updateRoleFun(ele) {
	var rfid = ele.getAttribute('rfid'); 
	if(rfid=='')  {alert('ID数据错误');  return;  } 

	if(document.getElementById("rolefun_"+ rfid).checked) flag=1;
	else flag=0;
	
	var data = {id:rfid, flag:flag };

	ajaxRoleFun(data);

}

//Ajax请求，设置角色功能
function ajaxRoleFun(data) {

	$.ajax({
		url:'/mg/setRoleFun',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {alert('创建失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
			}   
		}

	}); //ajax end	

}



function delRoleUser(ele) {
	var ruid = ele.getAttribute('ruid'); 
	if(ruid=='')  {alert('ID数据错误');  return;  } 

	var data = {id : ruid　};

	ajaxDelRoleUser(data);

}

//Ajax请求，删除角色用户功能
function ajaxDelRoleUser(data) {

	$.ajax({
		url:'/mg/delRoleUser',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {alert('删除失败:' , backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
				$('#roleuser_' + data.id).remove();
			}   
		}

	}); //ajax end	

}



//添加用户--项目角色
function  adduser(ele) {

    var rid = ele.getAttribute('rid');
	var pid = ele.getAttribute('pid');
	if(rid=='' || pid=='') {alert('ID数据获取错误');return;}
	prjID_addUser = pid;
	roleID_addUser = rid;

	var prjname = ele.getAttribute('prjname');
	var rolename = ele.getAttribute('rolename'); 

    //初始化模态框数据
	$("#prjname").text("<" + prjname + "@角色:" + rolename + ">添加用户");
	$("#modalUserName").val("");
	$("#modalPassword").val("");
	
	var data = {rid:rid };
	getUserGrid( data );
    $('#myModal').modal({   //弹出模态框
        keyboard: true ,
		backdrop :false
    })

}


//列出用户的grid
function getUserGrid(doc ) {

		//var datas = [{username:'mx',fullname:'马mr'}];

		var data = {id: doc.rid};
		$.ajax({
			url:'/mg/getUnRoleUsers',
			data:data,
			type:'POST',
			dataType:'json',   

			success: function(backdata){
				console.log(backdata);
				var code = backdata.code;
				if(code == '204')  {alert('获取失败:' , backdata.err); console.log(backdata.err);  }  
				if(code == '201') {  //成功后将数据显示到列表
					listUserGrid(backdata.datas);
				}   
			}

	    }); //ajax end	

	
}


//用户列表
function listUserGrid(datas) {
		var len = datas.length , he=100;
		if(len<5 && len >0 ) he =  he + (len -1)*35;
		else if(len >= 5 ) he = he + 4*35;

        $("#userlist").kendoGrid({
						dataSource:{
							data:datas,
							pageSize:5
						} ,
                        height: he ,  //'100%'
                        //filterable: { mode: "row" },   //过滤器
                        pageable: true,
                        columns: 
                        [
							{
								template: "<div align='center'><input class='userbox' name='modalBoxList' type='checkbox' id='ubox_#=userid#' uid='#=userid#' value='#=userid#'  > </div><input hidden id='userinfo_#=userid#' value='#=username#' >",
								width: '10%',
								title: "<div align='center'> <input onclick='selectAllBox(this)' id='allbox' type='checkbox'   > </div>"
							},
							{
								field: "username",
								title: "账户",
								width: '45%',
								//filterable: {
								//	cell: {
								//		operator: "gte"
								//	}
								//}
							},
							{
								field: "fullname",
								title: "姓名",
								width: '45%',
								//filterable: {
								//	cell: {
								//		operator: "gte"
								//	}
								//}
							},
					    ]
						
                    });

}


function selectAllBox(ele) {  //全选 或全不选

	var ID = ele.getAttribute('id');
    if( $("#" + ID).is(':checked') )   $(":checkbox[class='userbox']").prop("checked",true);   
    else   $(":checkbox[class='userbox']").prop("checked",false);
}




//点击添加用户
$("#modalAddUser").click(function(){
	var username = $('#modalUserName').val();
	var password = $('#modalPassword').val();

	var rid = roleID_addUser ;
	var pid =prjID_addUser;

	if(username != '' &&　password == '' ) {alert('密码不能为空.'); return ;}
	if(username == '' &&　password != '' ) {alert('用户名不能为空.'); return ;}	

    //***通过用户名和密码的约束条件后，获取用户选中列表信息
	//***获取选中用户ui列表
	var uidlist = [];
	$('input[type="checkbox"][name="modalBoxList"]').each(
			function() {
				if( $(this).is(':checked') ) 
					uidlist[uidlist.length] = { pid:  pid,   rid: rid ,  uid: $(this).val() } ;   
			}
		);  

     if(uidlist.length <= 0 &&  username=='' ) {alert('请选择或者创建用户后才能添加.'); return ;}	


	//通过所有约束条件后
	var data={name:username ,password:password };
	data.rid = rid;
	data.pid =pid;
	data.uidlist = JSON.stringify(uidlist) ;

	console.log(data);
	$.ajax({
		url:'/mg/modalAddUser',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {alert('用户添加失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
				console.log('用户添加成功');

				
				//***添加用户到列表中去
				var userlist = backdata.datas;
				addRoleUserList(roleID_addUser ,roleID_addUser,userlist);

				//清空全局变量
				roleID_addUser='';
				prjID_addUser = '';

				//关闭模态框
				$("#modalUserName").val("");
				$("#modalPassword").val("");
				$('#myModal').modal('hide');

			}   
		}

	}); //ajax end	

});


//在角色后面加入新增用户列表
function addRoleUserList(pid, rid,userlist) {

	if(userlist.length >0 ) {
		var htmlstr = '';

		for(var i=0;i<userlist.length;i++){
			if(userlist[i].username) var name = userlist[i].username;
			else var name = $('#userinfo_'+ userlist[i].uid ).val(); 
			
			
			htmlstr = htmlstr + 
					" <div class='col-xs-5 col-sm-8'   id='roleuser_" + rid + "'> " + 
					"	<i onclick='delRoleUser(this)' ruid='" + rid + "'  class='fa fa-times'></i>" + name   +
					"</div> " ;
		} //for end

		$("#role_user_list_" + pid + "_" + rid).append(htmlstr);
		
	} //if end





}







