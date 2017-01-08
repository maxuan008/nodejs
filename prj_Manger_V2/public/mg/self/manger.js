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

		success: function(data){
			console.log(data);
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

		success: function(data){
			console.log(data);
			var code = data.code;
			if(code == '204')  {$("#warninfo").text('创建失败:' + data.err); console.log(data.err);  }  
			if(code == '201') {
				$("#warninfo").text('项目创建成功:' + data.datas.prj_name);
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

		success: function(data){
			console.log(data);
			var code = data.code;
			if(code == '204')  {$("#warninfo").text('创建失败:' + data.err); console.log(data.err);  }  
			if(code == '201') {
				//显示新建的功能模块到页面中
				var funhtml= "<div class='col-xs-5 col-sm-8' id='fundivdel_" + data.datas.id + "'> <a fid='" + data.datas.id + "' onclick='delfun(this)'><i class='fa fa-times'></i> </a> 代码:" + data.datas.id + ", " + data.datas.fun_name + " </div> " ;
 
				$("#funlist_"+ prjid ).append(funhtml);

			}   
		}

	}); //ajax end

	
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





