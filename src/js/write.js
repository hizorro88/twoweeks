$(document).ready(function(){
	var userId = store.get("userId");
	var username = store.get("username");

	var postItem = function(){
		var sendData = JSON.stringify({
					userId: userId,
					maker: username,
					team: $('#team').val(),
					title: $('#title').val(),
					meetingDate: $('#meetingDate').val(),
					location: $('#location').val(),
					content: $('#contents').val()
				})

		var token = store.get("token");

		$.ajax({
			url: store.get("url")+'/ricetimes',
			headers: {
		        'Content-Type':'application/json',
	        	'x-auth-token': token
		    },
			type: 'POST',
			dataType: 'json',
			data: sendData,
			success: function(data) {
				//history.back()
				location.href = "/views/list.html";
			}
		});
	}

	$("#name").text(username);
	
	// 작성버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#submit').click(function(e){
		// console.log($('#contents').val());
		//미작성 부분 체크
		if ($("#team").val() == ""){
			$("#team").focus();
		} else if ($("#title").val() == ""){
			$("#title").focus();
		} else if ($("#meetDay").val() == ""){
			$("#meetDay").focus();
		} else if ($("#contents").val() == ""){
			$("#contents").focus();
		} else {
			postItem();		
		}
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		history.back()
	});
});