$(document).ready(function(){

	var userId = store.get("userId");
	var username = store.get("username");
	var team = store.get("department");

	var inviteListData = store.get("inviteListData");
	var postInviteListData;
	var location="광화문";
	var category="밥";
	
	var settingInviteList = function(){
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
	}
	settingInviteList();

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
			var iteratorLocation = $(this).text();
			if (iteratorLocation == "광화문" || iteratorLocation == "우면동" || iteratorLocation == "분당" ){
				if (location != iteratorLocation){
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
			if ($(this).attr("id") == "밥" || $(this).attr("id") == "술" || $(this).attr("id") == "커피" ){
				if (category != $(this).attr("id")){
					$(this).attr('class', 'img-shadow grayscale');
				}	
			}
		});
	});


	var postItem = function(){
		var sendData = JSON.stringify({
					userId: userId,
					maker: username,
					team: team,
					title: $('#title').val(),
					meetingDate: $('#meetingDate').val(),
					category: category,
					location: location,
					content: $('#contents').val(),
					pushRiceTime: postInviteListData
				})

		// console.log(sendData);
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
			error: function(data, status, err) {
				alert("네트워크 오류입니다. 다시 로그인 해주세요.");
				store.remove("token");
				window.location.href="../index.html";
			},
			success: function(data) {
				
				alert("만남이 등록되었습니다.");
				window.location.href = "/views/list.html";
				// console.log(data);
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
	var hour = now.getHours();

	console.log(hour);
	var chan_val = year + '-' + mon + '-' + day + 'T' + (hour+1) + ':00';
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
			alert("제목을 입력하세요.");
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
		window.location.href = "/views/list.html";
	});
});
