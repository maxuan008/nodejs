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

		success: function(data){
			console.log(data);
		}

 	}); //ajax end

 }  //function getAllProjects end
















