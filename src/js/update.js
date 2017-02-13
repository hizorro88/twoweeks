$(document).ready(function(){

	// detail 에서 저장된 정보를 미리 폼에 세팅 후 출력
	var detailData = store.get("detailData");
	var riceTimeId = store.get("riceTimeId");
	var userId = store.get("userId");
	var username = store.get("username");
	var category = detailData.category;
	var location = detailData.location;
	$("#name").text(detailData.maker);
	$("#team").text(detailData.team);
	$("#title").val(detailData.title);
	$("#meetingDate").val(detailData.meetingDate);
	$("#contents").val(detailData.content);
	var postInviteListData = []; //최종 보낼 참가 리스트	
	var addInviteListData = [];

	$('span').each(function(index, value){
		var spanLocation = $(this).text();
		if (spanLocation == "광화문" || spanLocation == "우면동" || spanLocation == "분당" ){
			if ((location == spanLocation)){
				if (spanLocation == "광화문"){
					$(this).attr('class', 'label label-G button-shadow');
				} else if (spanLocation == "우면동"){
					$(this).attr('class', 'label label-W button-shadow ');
				} else {
					$(this).attr('class', 'label label-B button-shadow ');
				}
			} else {
				$(this).attr('class', 'label label-X');
			}
		}
	});

	$('img').each(function(index, value){
		var imgCategory = $(this).attr('id');
		if (imgCategory == "밥" || imgCategory == "술" || imgCategory == "커피" ){
			if (category == imgCategory){
				$(this).attr('class', 'img-shadow');
			} else {
				$(this).attr('class', 'img-shadow grayscale');
			}
		}
	});

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
		for (var i=0; i< detailData.pushRiceTime.length; i++){
			$('option[value="'+detailData.pushRiceTime[i].userId+'"]').attr("selected", "selected")
			$('option[value="'+detailData.pushRiceTime[i].userId+'"]').attr("disabled", "disabled")
			var invite_person = new Object();
			invite_person.joiner = detailData.pushRiceTime[i].joiner;
			invite_person.userId = detailData.pushRiceTime[i].userId;
			postInviteListData[i] = invite_person;
		}
		// console.log(postInviteListData)
	}
	settingInviteList();
	
	//@@@@ json 파일 보낼 때, 명단 같이 보내기
	$(".chosen-select").chosen().change(function(event){
		var tempInviteListData = []; //임시 보낼 참가 리스트

		console.log(event.target)
	    if(event.target == this){
	    	var checkedItems = $(this).val();
	    	// console.log(checkedItems)
	    	var checkedNames = [];
	    	for (var i=0; i< checkedItems.length; i++){
	    		var temp = $('option[value="'+checkedItems[i]+'"]').text();
	    		var leftstring = temp.split(' ');
	    		checkedNames.push(leftstring[0]);
	    	}
	    	// console.log(checkedNames)
	    	for(var i=0; i< checkedItems.length; i++){
	    		var invite_person = new Object();
		    	invite_person.joiner = checkedNames[i]; //이름 
		    	invite_person.userId = checkedItems[i]; //번호
		    	tempInviteListData[i] = invite_person;
	    	}
	    	// console.log(postInviteListData)
	    	addInviteListData = tempInviteListData;
	 	  	console.log(addInviteListData);
	    }
	});

	// //광화문, 양재동, 분당 클릭 시,
	$('.location_span span').click(function(e){
		location = $(this).text();
		// console.log(location)
		if (location == "광화문"){
			$(this).attr('class', 'label button-shadow label-G');
		} else if (location == "우면동"){
			$(this).attr('class', 'label button-shadow label-W');
		} else {
			$(this).attr('class', 'label button-shadow label-B');
		}

		$('span').each(function(index, value){
			var tempLocation = $(this).text();
			if (tempLocation == "광화문" || tempLocation == "우면동" || tempLocation == "분당" ){
				if (location != tempLocation){
					$(this).attr('class', 'label label-X');
				}
			}
		});
	});

	//광화문, 양재동, 분당 클릭 시,
	$('img').click(function(e){
		category = $(this).attr("id");
		// console.log(category)
		$(this).attr('class', 'img-shadow')
		$('img').each(function(index, value){
			var tempCategory = $(this).attr("id");
			if (tempCategory == "밥" || tempCategory == "술" || tempCategory == "커피" ){
				if (category != $(this).attr("id")){
					$(this).attr('class', 'img-shadow grayscale');
				}	
			}
		});
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
		postInviteListData = postInviteListData.concat(addInviteListData);
		// postInviteListData = postInviteListData.sort();
		// console.log(postInviteListData);
		
		if ($("#title").val() == ""){
			alert("제목을 입력하세요.");
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
					location: location,
					category: category,
					meetingDate: $('#meetingDate').val(),
					content: $('#contents').val(),
					pushRiceTime: postInviteListData
				}),
				beforeSend: function(){
					$('#loading').removeClass('displayNone');
					$('body > .container').addClass('displayNone');
				},
				complete: function(){
					$('#loading').addClass('displayNone');
				},
				error: function(data, status, err) {
				// alert("네트워크 오류입니다. 다시 로그인 해주세요.");
				store.remove("token");
				window.location.href="../index.html";
				},
				success: function(data) {
					alert("만남이 수정되었습니다.");
					window.location.href="/views/detail.html";
				}
			});
		}
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		history.back();
	});
});