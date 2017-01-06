$(document).ready(function(){
	var userId = store.get("userId");
	var username = store.get("username");
	var team = store.get("department");

	var postItem = function(){
		var sendData = JSON.stringify({
					userId: userId,
					maker: username,
					team: username,
					title: $('#title').val(),
					meetingDate: $('#meetingDate').val(),
					category: //$('#category').val(),
					location: //$('#location').val(),
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
				console.log("성공")
				//history.back()
				location.href = "/views/list.html";
			}
		});
	}

	//기본 정보 세팅
	$("#name").text(username);
	$("#team").text(team);
	var now = new Date();
	var year= now.getFullYear();
	var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
	var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
	var chan_val = year + '-' + mon + '-' + day + 'T12:00';
	$("#meetingDate").val(chan_val);

	// 물음표 연속 2개시 오류
	$('#title').keyup(function(){
		var str = $(this).val()
		checkStr = str.indexOf('\?\?');
		if (checkStr != -1){
			str = str.replace(/\?/, "");
			$(this).val(str);
		}
	});

	$('#contents').keyup(function(){
		var str = $(this).val()
		checkStr = str.indexOf('\?\?');
		if (checkStr != -1){
			str = str.replace(/\?/, "");
			$(this).val(str);
		}
	});

	// 작성버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#submit').click(function(e){
		//미작성 부분 체크
		if ($("#title").val() == ""){
			$("#title").focus();
		} else if ($("#meetingDate").val() == ""){
			$("#meetingDate").focus();
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
