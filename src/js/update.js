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


	var settingInviteList = function(){
		var inviteListData = store.get("inviteListData");
	
		for (var i=0; i<inviteListData.length; i++){
			// 본인 이름 제외하고 리스트 구성
			if (inviteListData[i].username != username){
				//제목 정보 수정
				var subtitle = inviteListData[i].department;
				var retitle;
				if (subtitle.length > 5){
					retitle = subtitle.substring(0, 6) + ".."; //제목
				} else {
					retitle = subtitle;
				}

				$("#addList").append("<option value='"+inviteListData[i].userId+"'>"+inviteListData[i].username+" ("+retitle+") "+"</option>");
			}
		}

		//참가자들 미리 선택으로 세팅
		for (var i=0; i< detailData.joinRiceTime.length; i++){
			console.log(detailData.joinRiceTime[i].userId)
			$('option[value="'+detailData.joinRiceTime[i].userId+'"]').attr("selected", "selected")
		}
	}
	settingInviteList();
	
	//@@@@ json 파일 보낼 때, 명단 같이 보내기
	var postInviteListData;
	$(".chosen-select").chosen().change(function(event){
	     if(event.target == this){
	     	var checkedItems = $(this).val();
	     	var checkedNames = $("#addList option:selected").text();
	     	var leftstring = checkedNames.split(' ');
	     	var j=0;

	     	for(var i=0; i<checkedItems.length; i++){

	     		var invite_person = new Object();
		     	invite_person.joiner = leftstring[j]; //이름 
		     	invite_person.userId = checkedItems[i]; //번호
		     	j = j+2;
		     	checkedItems[i] = invite_person;
	     	}
     	   postInviteListData = checkedItems;

     	   console.log(postInviteListData);
	     }
	});

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
					content: $('#contents').val(),
					joinRiceTime: postInviteListData
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