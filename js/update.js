$(document).ready(function(){
	
	// detail 에서 저장된 정보를 미리 폼에 세팅 후 출력	
	var data = store.get("data");

	$("#name").val(data.name);
	$("#team").val(data.team);
	$("#title").val(data.title);
	$("#place").val(data.location);
	$("#meetDay").val(data.date);
	// $("#category").val(data.category);
	$("#contents").val(data.contents);


	//미작성 부분 체크 (제목, 만남일, 내용)
	function checkForm(){
		if ($("#title").val() == ""){
			$("#title").focus();
		} else if ($("#meetDay").val() == ""){
			$("#meetDay").focus();
		} else if ($("#contents").val() == ""){
			$("#contents").focus();
		}
	}

	// 작성버튼 클릭 시, 서버에 정보를 보내고 상세 화면으로 이동
	$('#submit').click(function(){
		
		checkForm();//미작성 부분 체크

		$.ajax({
			url: "{{url}}/ricetimes/"+store.get("number"),
			headers: {
		        'Content-Type':'application/json',
	        	'Authorization':store.get("token")
		    },
			type: 'put',
			dataType: 'json',
			data: JSON.stringify({
				//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
				userId: store.get("#userId"),
				// name: $('#name').val(),
				// team: $('#team').val(),
				title: $('#title').val(),
				location: $('#location').val(),
				meetingdate: $('#meetingdate').val(),
				// category: $('#category').val(),
				contents: $('#contents').val()
			}),
			success: function(data) {
				store.remove("data");
				location.href="/views/detail.html";
			}
		});
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		history.back();
	});
});