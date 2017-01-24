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
			var code = backdata.code;
			if(code == '204')  {console.log('项目加载失败：',backdata.err);  }  
			if(code == '201') {
				//显示新建的项目到页面中
				var datas = backdata.datas;
				var htmlstr="";
				//循环生成项目
				for(var i=0; i<datas.length; i++) {
					var prjinfo = datas[i].prjinfo;
					var funs = datas[i].funs;
					var roles = datas[i].roles;

					//生成功能导航列表
					var pid = prjinfo.pid;
					var navPrjHtML = " <li> " +
                                 "   <a href='#' id = 'navPrj_" + pid + "'  ><i class='fa fa-sitemap'></i> <span class='nav-label'>" + prjinfo.prjname + "</span><span class='fa arrow'></span></a> " +
                                 " </li>";
					$('#navmark').before(navPrjHtML);			 


					htmlstr="" +
							"<div id='DIVprj_" + prjinfo.pid + "' class='col-lg-12'>  " + 
							"	<div class='ibox float-e-margins'>    " + 
							"		<div class='ibox-title'>    " + 
							"			<h5 class='btn btn-warning'> " + prjinfo.prjname + " </h5>    " + 
							"			<div class='ibox-tools'>    " + 
							"				<a class='collapse-link'><i class='fa fa-chevron-up'></i></a>    " + 
							"				<a class='dropdown-toggle' data-toggle='dropdown' href='#'><i class='fa fa-wrench'></i></a>    " + 
							"				<ul class='dropdown-menu dropdown-user'>    " + 
							"					<li><a href='#'>扩展功能 1</a></li>    " + 
							"					<li><a href='#'>扩展功能 2</a></li>    " + 
							"				</ul>    " + 
							"				<a class='close-link' onclick='delProject(this)' pid='" + prjinfo.pid + "' prjname ='" + prjinfo.prjname + "'   ><i class='fa fa-times'></i></a>    " + 
							"			</div>    " + 
							"		</div>    " + 
							"			<div class='ibox-content'>    " + 
							"			<table class='table table-bordered'>    " + 
							"				<thead><tr><th colspan='3'>  " + 
							"							<form role= 'form' class= 'form-inline'>  " + 
							"								<div class= 'form-group'> 添加一个角色: </div>  " + 
							"								<div class= 'form-group'><input id= 'role_name_" + prjinfo.pid + "' type= 'text' placeholder= '角色名'  class= 'form-control'></div>  " + 
							"								<div class= 'checkbox m-r-xs'><button prjid='" + prjinfo.pid + "'  prjname= '" + prjinfo.prjname + "'  onclick='addrole(this)' class= 'btn btn-white' type= 'button'>添加</button></div>   " +         
							"							</form>  " + 
							"						</th></tr>  " + 
							"				</thead>    " + 
							"				<thead><tr><th>角色</th><th >功能</th><th  >用户名单</th></tr></thead>   " + 
							"				<tbody id='tbody_" + prjinfo.pid + "' >    " + 
							"					<tr id='prjmodel_" + prjinfo.pid + "'>    " + 
							"						<td>功能模块</td><td colspan='2'>  " + 
							"							<div id='funlist_" + prjinfo.pid + "' class='row'> <!--  funlist_pid  -->    " + 
							"							</div>    " + 
							"						</td>   " + 
							"					</tr>    " + 
							"					<tr>    " + 
							"						<td class='col-xs-1 col-sm-2'>添加功能模块</td>  " + 
							"						<td colspan='2'>  " + 
							"							<form role= 'form' class= 'form-inline'>  " + 
							"								<div class= 'form-group'>  " + 
							"									<label for= 'exampleInputEmail2' class= 'sr-only'>功能名</label>  " + 
							"									<input id= 'fun_name_" + prjinfo.pid + "' type= 'text' placeholder= '功能名'  class= 'form-control'>  " + 
							"								</div>  " + 
							"								<div class= 'form-group'>  " + 
							"									<label for= 'exampleInputPassword2' class= 'sr-only'>链接url</label>  " + 
							"									<input id= 'fun_url_" + prjinfo.pid + "' type= 'text ' placeholder= '链接url'  class= 'form-control'>  " + 
							"								</div>  " + 
							"								<div class= 'form-group'>  " + 
							"									<label for= 'exampleInputPassword2' class= 'sr-only'>程序文件名</label>  " + 
							"									<input id= 'fun_docname_" + prjinfo.pid + "' type= 'text' placeholder= '程序文件名'  class= 'form-control'>  " + 
							"								</div>  " + 
							"								<div class= 'checkbox m-r-xs'><input type= 'checkbox' id= 'fun_havedomai_" + prjinfo.pid + "'>  " + 
							"									<label for= 'checkbox1'>链接含主域名?</label>  " + 
							"									<button prjid='" + prjinfo.pid + "' onclick='addfun(this)' class= 'btn btn-white' type= 'button'>添加</button>  " + 
							"								</div>  " + 		
							"							</form>  " + 
							"						</td>   " +  
							"					</tr>    " + 
							"				</tbody>   " +  
							"			</table>    " + 
							"		</div>    " + 
							"	</div>    " + 
							"</div>  ";

						console.log("添加功能模块:");
 						$("#other").before(htmlstr);
						//***循环添加项目的功能，角色 */
						addFunsHtml(prjinfo.pid , funs);
						addRolesHtml(prjinfo.pid , roles  , prjinfo.prjname , funs);


				} //for end

			}   //if(code == '201') end

			
		}

 	}); //ajax end

 }  //function getAllProjects end





//删除项目
function delProject(ele) {
	var prjname = ele.getAttribute('prjname');
	var pid = ele.getAttribute('pid');

 	var flag = confirm("您确认要删除'"  + prjname + "'?");
    if(flag == false) return;

	var data={pid:pid}

	$.ajax({
		url:'/mg/delproject',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			//console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {alert('创建失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
				//删除页面中的项目
				$("#DIVprj_" + pid).remove();
			}   
		}

	}); //ajax end

}













//***循环添加项目的功能 */
function addFunsHtml(pid , funs) {
	var htmlstr='';
	//console.log('funs:',pid,'', funs);
	for(var i=0; i<funs.length ; i++) {
		var fun=funs[i];
		htmlstr = htmlstr + 
		  "<div class='col-xs-5 col-sm-8' id='fundivdel_" + fun.fid + "'><a fid='" + fun.fid + "'  pid='" + pid + "'   onclick='delfun(this)'><i class='fa fa-times'></i></a> 代码:" + fun.fid + "," + fun.fun_name + "--" + fun.docname +"</div> "; 
	}

	$('#funlist_'+pid).html(htmlstr);
}



//***循环添加项目的角色 */
function addRolesHtml(pid,roles, prjname , funs) {
	var htmlstr='';
	//console.log('roles:',pid,'', roles, prjname);
	for(var i=0; i<roles.length ; i++) {
		var role=roles[i];
		//console.log('role:',role);
		var rid = role.role.rid;
		var rolename = role.role.role_name;

		htmlstr = '' + 
					"	<tr id='role_"+ rid + "'>    " + 
					"		<td  ><button onclick='delRole(this)' rid='" + rid + "' class='btn btn-danger btn-xs' >删除角色</button>  " + rolename + "</td>   " +  
					"		<td >    " + 
					"		   <div id='role_fun_list_" + pid + "_" + rid + "'  class='row'>    " + 
					"		   </div>    " + 
					"		</td>    " + 
					"		<td >     " + 
					"			<div  class='row'>   <!--  role_user_list_prjid_roidid -->   " + 
					"			<div  class='col-xs-5 col-sm-8'  style= 'text-align:right;'><a onclick='adduser(this)' rid='" + rid + "' pid='" + pid + "' prjname='" + prjname + "' rolename='" + rolename + "' > + 添加用户  </a></div>   " + 
					"		    </div>   " +  
					"			<div  id='role_user_list_" + pid + "_" + rid + "' >   </div>" +

					"		</td>    " + 
					"	</tr>    " ;


		$('#prjmodel_'+pid).before(htmlstr);	 

		//添加角色的功能和用户
		var rolefuns = role.funs;
		var roleusers =  role.users;
		addRoleFun(pid, rid, rolefuns , funs);
		addRoleUser(pid, rid,roleusers);

	} //for end

}


//在指定的角色中加入功能信息
function addRoleFun(pid, rid, rolefuns , funs) {
	var htmlstr = '';
	for(var i=0;i<rolefuns.length;i++) {
		var rolefun = rolefuns[i];
		var fun_name = getFunName(rolefun.fid , funs );
		var status = rolefun.status;
		var checkedstr = ''; 
		if(status == '1') checkedstr = 'checked'; 

		htmlstr = htmlstr +
					"	<div class='col-xs-5 col-sm-8'>   " + 
					"		<div class= 'col-xs-1 col-sm-2'><input onclick='updateRoleFun(this)' type= 'checkbox' " + checkedstr + " rfid='" + rolefun.rfid +"' id= 'rolefun_" + rolefun.rfid +"'></div>  " + 
					"		 代码:" + rolefun.fid +"," + fun_name  + 
					"	</div>    " ;
	} //for end

	$("#role_fun_list_" + pid + "_" + rid).html(htmlstr);

}

//删除角色
function delRole(ele){
	var rid=ele.getAttribute('rid'); 
	if(rid == '') {alert('删除失败，ID获取失败');return;  } 

	var flag = confirm("您确认要删除此角色?");
    if(flag == false) return;

	var data ={}; 
	data.id = rid;

    $.ajax({
		url:'/mg/delRole',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			if(code == '204')  {alert('操作失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
				$("#role_" + rid).remove();

		    } //if end

		}

	}); //ajax end

}


//获取数组中fid的功能名
function  getFunName(fid,funs ) {
	var result = '';
	for(var i=0; i< funs.length; i++) {
		if(funs[i].fid == fid) result = funs[i].fun_name;
	}
	return result;
}



//在指定的角色中加入用户信息
function addRoleUser(pid, rid,roleusers) {

	var htmlstr = '';
	for(var i=0;i<roleusers.length;i++) {
		var ruid = roleusers[i].ruid;
		var username =  roleusers[i].username;

		var fullname ='';
		if(roleusers[i].fullname)  fullname = roleusers[i].fullname;
		htmlstr = htmlstr +
					"	<div class='col-xs-5 col-sm-8'   id='roleuser_" + ruid + "'>    " + 
					"			<i onclick='delRoleUser(this)' ruid='" + ruid + "'  class='fa fa-times'></i>" + username + "  " + fullname + "  " + 
					"	</div>    " ;
	}

	$("#role_user_list_" + pid + "_" + rid).html(htmlstr);

}




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
				$("#prj_name").val("");
				//显示新建的项目到页面中
				var prjinfo = backdata.datas;

				add_newProject(prjinfo);
			}   
		}

	}); //ajax end

});


    //添加一个新的项目框架HTML到页面中
	function add_newProject(prjinfo) {
		var pid = prjinfo.id;
		var prjname = prjinfo.prj_name;
		var port = prjinfo.port;
		var domain_url = prjinfo.domain_url;

		htmlstr="" +
				"<div id='DIVprj_" + pid + "' class='col-lg-12'>  " + 
				"	<div class='ibox float-e-margins'>    " + 
				"		<div class='ibox-title'>    " + 
				"			<h5 class='btn btn-warning'> " + prjname + " </h5>    " + 
				"			<div class='ibox-tools'>    " + 
				"				<a class='collapse-link'><i class='fa fa-chevron-up'></i></a>    " + 
				"				<a class='dropdown-toggle' data-toggle='dropdown' href='#'><i class='fa fa-wrench'></i></a>    " + 
				"				<ul class='dropdown-menu dropdown-user'>    " + 
				"					<li><a href='#'>扩展功能 1</a></li>    " + 
				"					<li><a href='#'>扩展功能 2</a></li>    " + 
				"				</ul>    " + 
				"				<a class='close-link' onclick='delProject(this)' pid='" + pid + "' prjname ='" + prjname + "'   ><i class='fa fa-times'></i></a>    " + 
				"			</div>    " + 
				"		</div>    " + 
				"			<div class='ibox-content'>    " + 
				"			<table class='table table-bordered'>    " + 
				"				<thead><tr><th colspan='3'>  " + 
				"							<form role= 'form' class= 'form-inline'>  " + 
				"								<div class= 'form-group'> 添加一个角色: </div>  " + 
				"								<div class= 'form-group'><input id= 'role_name_" + pid + "' type= 'text' placeholder= '角色名'  class= 'form-control'></div>  " + 
				"								<div class= 'checkbox m-r-xs'><button prjid='" + pid + "'  prjname= '" + prjname + "'  onclick='addrole(this)' class= 'btn btn-white' type= 'button'>添加</button></div>   " +         
				"							</form>  " + 
				"						</th></tr>  " + 
				"				</thead>    " + 
				"				<thead><tr><th>角色</th><th >功能</th><th  >用户名单</th></tr></thead>   " + 
				"				<tbody id='tbody_" + pid + "' >    " + 
				"					<tr id='prjmodel_" + pid + "'>    " + 
				"						<td>功能模块</td><td colspan='2'>  " + 
				"							<div id='funlist_" + pid + "' class='row'>  <!--  funlist_pid  -->    " + 
				"							</div>    " + 
				"						</td>   " + 
				"					</tr>    " + 
				"					<tr>    " + 
				"						<td class='col-xs-1 col-sm-2'>添加功能模块</td>  " + 
				"						<td colspan='2'>  " + 
				"							<form role= 'form' class= 'form-inline'>  " + 
				"								<div class= 'form-group'>  " + 
				"									<label for= 'exampleInputEmail2' class= 'sr-only'>功能名</label>  " + 
				"									<input id= 'fun_name_" + pid + "' type= 'text' placeholder= '功能名'  class= 'form-control'>  " + 
				"								</div>  " + 
				"								<div class= 'form-group'>  " + 
				"									<label for= 'exampleInputPassword2' class= 'sr-only'>链接url</label>  " + 
				"									<input id= 'fun_url_" + pid + "' type= 'text ' placeholder= '链接url'  class= 'form-control'>  " + 
				"								</div>  " + 
				"								<div class= 'form-group'>  " + 
				"									<label for= 'exampleInputPassword2' class= 'sr-only'>程序文件名</label>  " + 
				"									<input id= 'fun_docname_" + pid + "' type= 'text' placeholder= '程序文件名'  class= 'form-control'>  " + 
				"								</div>  " + 
				"								<div class= 'checkbox m-r-xs'><input type= 'checkbox' id= 'fun_havedomai_" + pid + "'>  " + 
				"									<label for= 'checkbox1'>链接含主域名?</label>  " + 
				"									<button prjid='" + pid + "' onclick='addfun(this)' class= 'btn btn-white' type= 'button'>添加</button>  " + 
				"								</div>  " + 		
				"							</form>  " + 
				"						</td>   " +  
				"					</tr>    " + 
				"				</tbody>   " +  
				"			</table>    " + 
				"		</div>    " + 
				"	</div>    " + 
				"</div>  ";

			console.log("添加功能模块:");
			$("#other").before(htmlstr);

	}
















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

	var pid = prjid;
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
				var funhtml= "<div class='col-xs-5 col-sm-8' id='fundivdel_" + backdata.datas.id + "'> <a fid='" + backdata.datas.id + "'  pid='" + pid + "'  onclick='delfun(this)'><i class='fa fa-times'></i> </a> 代码:" + backdata.datas.id + ", " + backdata.datas.fun_name + " </div> " ;
 
				$("#funlist_"+ prjid ).append(funhtml);

				//清空功能名
				$("#fun_name_" + prjid  ).val("");

				var roles = backdata.datas.roles;
				var funs =  backdata.datas.funs;

				//刷新角色的功能信息html
				for(var i=0; i<roles.length ; i++) {
					var role=roles[i];
					var rid = role.role.rid;
					var rolename = role.role.role_name;

					//添加角色的功能和用户
					var rolefuns = role.funs;
					var roleusers =  role.users;
					addRoleFun(pid, rid, rolefuns , funs);
					//addRoleUser(pid, rid,roleusers);

				} //for end

		    } //if end

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
	var pid = ele.getAttribute('pid'); 
	var flag = confirm("您确认要删除此功能模块?");
    if(flag == false) return;
    
	if(fid=='' || fid==undefined) {alert('ID数据不正确！');   return;  } 
	var data = {fid:fid, pid:pid };
	$.ajax({
		url:'/mg/delfun',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			console.log(backdata);
			var code = backdata.code;
			var roles = backdata.datas.roles;
			var funs =  backdata.datas.funs;
			if(code == '204')  {alert('创建失败:' + backdata.err); console.log(backdata.err);  }  
			if(code == '201') {
			//删除页面的具体的功能模块
			$("#fundivdel_" + fid).remove(); 

				//刷新角色的功能信息html
				for(var i=0; i<roles.length ; i++) {
					var role=roles[i];
					var rid = role.role.rid;
					var rolename = role.role.role_name;

					//添加角色的功能和用户
					var rolefuns = role.funs;
					var roleusers =  role.users;
					addRoleFun(pid, rid, rolefuns , funs);
					//addRoleUser(pid, rid,roleusers);

				} //for end
			}   
		}

	}); //ajax end

}




//项目的“添加角色”被点击
function addrole(ele) {
	var prjid = ele.getAttribute('prjid'); 
	var prjname = ele.getAttribute('prjname'); 
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
				var rid = backData.datas.id;
				var pid = prjid;
				var rolename = backData.datas.role_name ;

				var rolehtml= " " +
				    "<tr id='role_"+ rid + "'>  "+
					"	<td> <button onclick='delRole(this)' rid='" + rid + "' class='btn btn-danger btn-xs'>删除角色</button>"+ rolename + "</td>    "+
					"	<td >    "+
					"		<div id='role_fun_list_"+ pid + "_"+ rid + "' class='row'>    "+
					"		</div>    "+
					"	</td>    "+
					"	<td >    "+
					"		<div  class='row'>   <!--  role_user_list_prjid_roidid -->   " + 
					"			   <div  class='col-xs-5 col-sm-8'  style= 'text-align:right;'><a onclick='adduser(this)' rid='" + rid + "' pid='" + pid + "' prjname='" + prjname + "' rolename='" + rolename + "' > + 添加用户  </a></div>   " + 
					"		</div>   " +
					"		<div id='role_user_list_"+ pid + "_"+ rid + "' > </div>   "+
					"		</div>    "+
					"	</td>    "+
					"</tr>   ";

				$('#prjmodel_'+pid).before(rolehtml);

				//刷新新增的角色
				refreshRole(pid,rid);

				//addRoleFun(pid, rid, rolefuns , funs);

			}   
		}

	}); //ajax end

}







//刷新角色HTML
function refreshRole(pid,rid) {

	if(pid == ''|| rid == '') {alert('ID数据不能为空');  return;  } 

	var data ={pid:pid, rid:rid }; 

    $.ajax({
		url:'/mg/refreshRole',
		data:data,
		type:'POST',
		dataType:'json',   

		success: function(backdata){
			//console.log(backdata);
			
			var code = backdata.code;
			if(code == '204')  { console.log('失败:' + backdata.err);   }  
			if(code == '201') {
				var role = backdata.datas;
				
				//刷新角色页面中
				var rolefuns = role.rolefuns;
				var roleusers =  role.roleusers;
				var funs =  role.funs;

			    addRoleFun(pid, rid, rolefuns , funs);
			    addRoleUser(pid, rid,roleusers);	

		    } //if end
		}  //success end

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
				addRoleUserList(prjID_addUser ,roleID_addUser,userlist);

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







