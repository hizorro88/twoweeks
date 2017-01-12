$(document).ready(function(){
	
	// detail 에서 저장된 정보를 미리 폼에 세팅 후 출력
	var detailData = store.get("detailData");
	var riceTimeId = store.get("riceTimeId");
	var userId = store.get("userId");
	var username = store.get("username");
	$("#name").text(detailData.maker);
	$("#team").text(detailData.team);
	$("#title").val(detailData.title);
	$('input:radio[name="location"][value="'+detailData.location+'"]').prop('checked', true);
	$('input:radio[name="category"][value="'+detailData.category+'"]').prop('checked', true);
	$("#meetingDate").val(detailData.meetingDate);
	$("#contents").val(detailData.content);

	//물음표 연속 2개를 막아야 함
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
	
	// 작성버튼 클릭 시, 서버에 정보를 보내고 상세 화면으로 이동
	$('#submit').click(function(){
		
		if ($("#title").val() == ""){
			$("#title").focus();
		} else if ($("#meetingDate").val() == ""){
			$("#meetingDate").focus();
		} else if ($("#contents").val() == ""){
			$("#contents").focus();
		} else {
			$.ajax({
				url: store.get("url")+"/ricetimes/"+riceTimeId,
				headers: {
			        'Content-Type':'application/json',
		        	'x-auth-token':store.get("token")
			    },
				type: 'PUT',
				dataType: 'json',
				data: JSON.stringify({
					//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
					userId: userId,
					maker: username,
					team: detailData.team,	
					title: $('#title').val(),
					location: $('input:radio[name="location"]:checked').val(),
					category: $('input:radio[name="category"]:checked').val(),
					meetingDate: $('#meetingDate').val(),
					content: $('#contents').val()
				}),
				success: function(data) {
					alert("만남이 수정되었습니다.");
					location.href="/views/detail.html";
				}
			});
		}
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		history.back();
	});
});