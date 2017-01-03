$(document).ready(function(){
	
	$("#name").text(store.get("name"));
	
	//미작성 부분 체크 (팀, 제목, 만남일, 내용)
	function checkForm(){
		if ($("#team").val() == ""){
			$("#team").focus();
		} else if ($("#title").val() == ""){
			$("#title").focus();
		} else if ($("#meetDay").val() == ""){
			$("#meetDay").focus();
		} else if ($("#contents").val() == ""){
			$("#contents").focus();
		}
	}

	// 작성버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#submit').click(function(){
		
		//미작성 부분 체크
		checkForm();

		$.ajax({
			url: '{{url}}/ricetimes/{{ricetimeId}}/persons',
			headers: {
		        'Content-Type':'application/json',
	        	'Authorization':store.get("token")
		    },
			type: 'post',
			dataType: 'json',
			data: {
				//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
				userId: store.get("userId"),
				name: store.get("name"),
				team: $('#team').val(),
				title: $('#title').val(),
				meetingDate: $('#meetingDate').val(),
				location: $('#location').val(),
				// category: $('#category').val(),
				contents: $('#contents').val()

				//기본적으로 본인이 참가자리스트에 추가되어야함.
			},
			success: function(data) {
				location.href="/views/list.html"
			}
		});
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		history.back()
	});
});