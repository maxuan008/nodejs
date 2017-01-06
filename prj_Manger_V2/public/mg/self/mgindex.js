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



//点击登录按钮
$("#manager").click(function(){
    $.ajax({
        url:'/mg/getAllProjects',
        data:{},
        type:'POST',
        dataType:'json',

        success: function(data){
            console.log("项目管理",data);
        }

    }); //ajax end

});













