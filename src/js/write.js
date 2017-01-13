$(document).ready(function(){

	var userId = store.get("userId");
	var username = store.get("username");
	var team = store.get("department");

	var inviteListData;
	var postInviteListData;
	// 받아온 초대 인원
	var getInviteList = function(){
		$.ajax({
			url: store.get("url")+'/user/persons',
			headers: {
		        'Content-Type':'application/json',
		        'x-auth-token':store.get("token")
		    },
		    async: false, //결과값 전역변수에 넣어 두기
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				inviteListData = data;
				store.set("inviteListData", inviteListData);
				for (var i=0; i<inviteListData.length; i++){
					// 본인 이름 제외하고 리스트 구성
					if (inviteListData[i].username != username){
						//제목 정보 수정
						var subtitle = inviteListData[i].department;
						var retitle;
						if (subtitle.length > 6){
							retitle = subtitle.substring(0, 7) + ".."; //제목
						} else {
							retitle = subtitle;
						}

						$("#addList").append("<option value='"+inviteListData[i].userId+"'>"+inviteListData[i].username+" ("+retitle+") "+"</option>");	
					}
				}
			},
			error: function(data, status, err) {
				alert("error")
			}
		});
	}
	getInviteList();

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
	     }
	});



	var postItem = function(){
		var sendData = JSON.stringify({
					userId: userId,
					maker: username,
					team: team,
					title: $('#title').val(),
					meetingDate: $('#meetingDate').val(),
					category: $('input:radio[name="category"]:checked').val(),
					location: $('input:radio[name="location"]:checked').val(),
					content: $('#contents').val(),
					joinRiceTime: postInviteListData
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
				alert("만남이 등록되었습니다.");
				// var ricetimeid = data.riceTimeId;
				
				// postInviteList(ricetimeid);

				location.href = "/views/list.html";
			}
		});
	}

	//기본 정보 세팅
	$("#name").text(" "+username);
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
			//글 내용을 서버에게 전달
			postItem();
		}
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		location.href = "/views/list.html";
	});
});
