$(document).ready(function() {
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
				//循环生成项目
				var datas = backdata.datas;
				var htmlstr="";
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
				} //for end

			}  //if(code == '201') end

		}  //success end

 	}); //ajax end

 }  //function getAllProjects end
















