$(document).ready(function(){
	
	var riceTimeId = store.get("riceTimeId");
	var userId = store.get("userId");
	var username = store.get("username");
	var detailData;	//상세 데이터(전체)
	var attendData;	//참가자 데이터
	var attendDataLength; // 데이터 길이

	$.ajax({
		url: store.get("url")+"/ricetimes/" + riceTimeId,
		async: false, //결과값 전역변수에 넣어 두기
		headers: {
        	'Content-Type':'application/json',
        	'x-auth-token':store.get("token")
    	},
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			//전체 데이터
			detailData = store.set("detailData", data);
			//참가자 데이터
			attendData = detailData.joinRiceTime;
			attendDataLength = attendData.length;
			//참가자, 기본 폼 세팅
			attendSetting();
			formSetting();
		}
	});

	function attendSetting(){
		//참가자 세팅
		for(var i=0; i<attendDataLength; i++){
			$("#attendList").append("<span class='label label-invite' id='"+ attendData[i].userId +"'></span>");

			// $("#attendList").append("<a class='btn btn-sm btn-primary' id='"+ attendData[i].userId +"'></a>&nbsp;"); 

			//true / false 따라서 초기 색상 변경
			if (attendData[i].join == "true"){
				$("#"+attendData[i].userId).attr("class", "label label-invite");	
			} else {
				$("#"+attendData[i].userId).attr("class", "label label-notinvite");
			}

			//참가자 이름 표시
            $("#"+attendData[i].userId).text(attendData[i].joiner);
        }
	}

	function formSetting(){

		var imageInfo;
    	if (detailData.category == '밥'){
    		imageInfo = 'plate_50x50.png';
    	} else if (detailData.category == '술'){
    		imageInfo = 'beer_50x50.png';
    	} else {
    		imageInfo = 'coffee_50x50.png';
    	}

    	//컬러 정보 결정
    	var colorInfo;
    	if (detailData.location == '광화문'){
    		colorInfo = 'label-G';
    	} else if (detailData.location == '우면동'){
    		colorInfo = 'label-W';
    	} else {
    		colorInfo = 'label-B';
    	}

		$("#makeImage").append(
		            "<div class='col-xs-2 text-right'>"+
		                "<img src='/img/"+imageInfo+"'>"+
		            "</div>"+
		            "<div class='col-xs-10 text-right'>"+
		                "<div class='row'>"+
		                    "<div class='col-xs-12 text-right'>"+
		                        "<h4><span class='label "+colorInfo+"' id='location'></span></h4>"+
		                        "<h5><strong><i class='fa fa-clock-o' aria-hidden='true'></i> <span id=meetingdate></span></strong></h5>"+
		                    "</div>"+
		                "</div>"+
		            "</div>");

		// 이름, 팀, 제목, 위치, 만남일, 내용
		$("#name").text(detailData.maker);
		$("#team").text(detailData.team);
		$("#title").text(detailData.title);

		//날짜 정보 수정
    	var date = detailData.meetingDate;
    	var time = date.substring(11, 13);
    	var newTime;
    	var dateStr;
    	if (Number(time) > 12){
			dateStr = "오후";
			newTime = Number(time) - 12;
    	} else {
    		dateStr = "오전";
    		newTime = Number(time);
    	}
		var finalDate = date.substring(0, 10) +" "+dateStr+" "+newTime+ date.substring(13, 16);

		$("#meetingdate").text(finalDate);
		$("#contents").val(detailData.content);

		

		$("#location").text(detailData.location);

		//본인 아이디와 글의 아이디가 같은 경우(본인이 작성한 글인 경우)
		if (userId === detailData.userId){
			$("#update").show(); // 수정, 삭제 버튼 활성화
			$("#delete").show();
			
			// 참석자 명단에 본인이 있다면 참석 질문 비활성화, 명단에 없다면 활성화
			for(var i=0; i<attendDataLength; i++){
				if (attendData[i].userId === userId){
					if (attendData[i].join == "true"){ //불참 활성화
						$("#attendQ").hide();
						$("#attendN").show();
					} else {	//참석 활성화
						$("#attendQ").show();
						$("#attendN").hide(); 
					}
				}
			}
		} else { //남의 글
			$("#update").hide(); // 수정, 삭제 버튼 비활성화
			$("#delete").hide();
			
			// 참석자 명단에 본인이 있다면 참석 질문 비활성화, 명단에 없다면 활성화
			for(var i=0; i<attendDataLength; i++){
				if (attendData[i].userId === userId){
					if (attendData[i].join == "true"){ //불참 활성화
						$("#attendQ").hide();
						$("#attendN").show();
					} else {	//참석 활성화
						$("#attendQ").show();
						$("#attendN").hide(); 
					}
				} else {
					$("#attendQ").show();
					$("#attendN").hide();
				}
			}	
		}
	};

	function attendCheck(){
		var exist;
		var joinerId;
		for(var i=0; i<attendDataLength; i++){
			if (attendData[i].userId === userId){
				exist = true;
				joinerId = attendData[i].userId
				break;
			} else {
				exist = false;
			}
		}

		if (exist) {
			//내 정보가 있는 경우,
			$.ajax({
				url: store.get("url")+'/ricetimes/' + riceTimeId + '/persons/' + userId,
				headers: {
			        'Content-Type':'application/json',
		 	       	'x-auth-token':store.get("token")
			    },
				type: 'PUT',
				dataType: 'json',
				success: function(data) {
					//버튼 색상 변경
					if(data.join == "true"){
						$("#attendQ").hide();
						$("#attendN").show();
						$("#" + joinerId).attr("class", "label label-invite");
					} else {
						$("#attendQ").show();
						$("#attendN").hide();
						$("#" + joinerId).attr("class", "label label-notinvite");	
					}
					// location.reload();//화면 갱신
				}
			});
		} else {
			//내 정보가 없는 경우, 생성
			$.ajax({
				url: store.get("url")+'/ricetimes/' + riceTimeId + '/persons',
				headers: {
			        'Content-Type':'application/json',
		        	'x-auth-token':store.get("token")
			    },
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify({
					joiner : username, 
					userId : userId
				}),
				success: function(data) {
					location.reload();//화면 갱신
				}
			});
		}
	}

	//참가자 등록: DB에 참가자 정보 추가 후, 화면 갱신
	$("#attendBtn").click(function(){
		attendCheck();
	});

	//불참 등록
	$("#attendBtnN").click(function(){
		attendCheck();
	});

	// 삭제 버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#delete').click(function(){
		$.ajax({
			url: store.get("url")+'/ricetimes/' + riceTimeId,
			headers: {
		        'Content-Type':'application/json',
	        	'x-auth-token':store.get("token")
		    },
			type: 'DELETE',
			dataType: 'json',
			complete: function(data) {
				alert("만남이 삭제되었습니다.");
				location.href="/views/list.html"
			}
		});
	});


	$("#update").click(function(){
		location.href="/views/update.html"
	});
	
	// 목록 버튼 클릭 시
	$('#list').click(function(){
		// store.remove("detaildata");
		store.remove("riceTimeId");
		location.href="/views/list.html";
	});

	//참석 의사 변경
	// $("#attendList .btn").click(function(e){

	// 	var joinerId = $(this).attr('id');

	// 	//댓글의 id와 내 아이디가 같은경우, 본인의 참가만 수정 가능하게 비교 필요
	// 	if (userId === joinerId){
	// 		$.ajax({
	// 			url: store.get("url")+'/ricetimes/' + riceTimeId + '/persons/' + userId,
	// 			headers: {
	// 		        'Content-Type':'application/json',
	// 	 	       	'x-auth-token':store.get("token")
	// 		    },
	// 			type: 'PUT',
	// 			dataType: 'json',
	// 			success: function(data) {
	// 				// $('#attendYes').attr("class", "show");
	// 				// $('#attendNo').attr("class", "show");
	// 				// setTimeout(function(){ $('#snackbar').attr("class", ""); }, 1000);
					// //버튼 색상 변경
					// if(data.join == "true"){
					// 	$("#" + joinerId).attr("class", "btn btn-sm btn-primary");
					// 	// setTimeout(function(){ $('#attendYes').attr("class", ""); }, 1000);
					// } else {
					// 	$("#" + joinerId).attr("class", "btn btn-sm btn-danger");	
					// 	// setTimeout(function(){ $('#attendNo').attr("class", ""); }, 1000);
					// }
	// 			}
	// 		});
	// 	}
	// });
});
