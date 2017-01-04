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
			console.log(detailData.team);
			attendDataLength = attendData.length;

			//참가자, 기본 폼 세팅
			attendSetting();
			formSetting();
		}
	});

	function attendSetting(){
		//참가자 세팅
		for(var i=0; i<attendDataLength; i++){
			
			$("#attendList").append("<a class='btn btn-sm btn-primary' role='button' id='"+ attendData[i].userId +"'></a>"); 

			//true / false 따라서 초기 색상 변경
			if (attendData[i].join == "true"){
				$("#"+attendData[i].userId).attr("class", "btn btn-sm btn-primary");	
			} else {
				$("#"+attendData[i].userId).attr("class", "btn btn-sm btn-danger");
			}
			//참가자 이름 표시
			// console.log(attendData[i].joiner);
            $("#"+attendData[i].userId).text(attendData[i].joiner);
        }
	}

	function formSetting(){
		// 이름, 팀, 제목, 위치, 만남일, 내용
		$("#name").val(detailData.maker);
		$("#team").val(detailData.team);
		$("#title").val(detailData.title);
		$("#location").val(detailData.location);
		$("#meetingdate").val(detailData.meetingDate);
		$("#contents").val(detailData.content);

		//본인 아이디와 글의 아이디가 같은 경우(본인이 작성한 글인 경우)
		console.log(detailData.userId)
		console.log(userId)
		if (userId === detailData.userId){
			$("#update").show(); // 수정, 삭제 버튼 활성화
			$("#delete").show();
			$("#attendQ").hide(); // 참석하시겠습니까? 비활성화
		} else {
			$("#update").hide(); // 수정, 삭제 버튼 비활성화
			$("#delete").hide();
			// 참석자 명단에 본인이 있다면 참석 질문 비활성화, 명단에 없다면 활성화
			for(var i=0; i<attendDataLength; i++){
				if (attendData[i].userId === userId){
					$("#attendQ").hide();
					return;
				} else {
					$("#attendQ").show();
				}
			}
		}
	};

	//참가자 등록: DB에 참가자 정보 추가 후, 화면 갱신
	$("#attendBtn").click(function(){
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
				location.href="/views/list.html"
			}
		});
	});

	// 목록 버튼 클릭 시
	$('#list').click(function(){
		store.remove("detaildata");
		store.remove("riceTimeId");
		location.href="/views/list.html";
	});

	//참석 의사 변경
	$("#attendList .btn").click(function(e){

		var joinerId = $(this).attr('id');

		//댓글의 id와 내 아이디가 같은경우, 본인의 참가만 수정 가능하게 비교 필요
		if (userId === joinerId){
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
						$("#" + joinerId).attr("class", "btn btn-sm btn-primary");
					} else {
						$("#" + joinerId).attr("class", "btn btn-sm btn-danger");	
					}
				}
			});
		}
	});
});
