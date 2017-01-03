$(document).ready(function(){
	
	var titleId = store.get("titleId");
	var detailData;	//상세 데이터(전체)
	var attendData;	//참가자 데이터
	
	$.ajax({
		// url: "http://192.168.3.1:8000/ricetimes/" + titleId,
		url: '../ricetime.json',
		async: false, //결과값 전역변수에 넣어 두기
		headers: {
        	'Content-Type':'application/json',
        	'Authorization':store.get("token")
    	},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			//전체 데이터
			detailData = store.set("data", data);
			//참가자 데이터
			attendData = detailData.joinRiceTime;
			
			//참가자, 기본 폼 세팅
			attendSetting();
			formSetting();
		}
	});

	function attendSetting(){
		var attendDataLength = attendData.length;

		//참가자 세팅 @@@@@ ID 뭐로 할지 수정 필요 @@@@@
		for(var i=0; i<attendDataLength; i++){
			$("#attendList").append("<a class='btn btn-sm btn-primary' role='button' id='attendee"+i+"'></a>");
            $("#attendee"+i).text(attendData[i].joiner);
        }
	}

	function formSetting(){
		// 이름, 팀, 제목, 위치, 만남일, 내용
		$("#name").val(detailData.name);
		$("#team").val(detailData.team);
		$("#title").val(detailData.title);
		$("#location").val(detailData.location);
		$("#meetingdate").val(detailData.date);
		$("#contents").val(detailData.content);

		//본인 아이디와 글의 아이디가 같은 경우(본인이 작성한 글인 경)
		if (store.get("token") === detailData.riceTimeId){
			$("#update").show(); // 수정, 삭제 버튼 활성화
			$("#delete").show();
			$("#attendQ").hide(); // 참석하시겠습니까? 비활성화
		} else {
			$("#update").hide(); // 수정, 삭제 버튼 비활성화
			$("#delete").hide();
			// 참석자 명단에 본인이 있다면 참석 질문 비활성화, 명단에 없다면 활성화
			for(var i=0; i<attendDataLength; i++){
				if (attendData[i].joiner === store.get("username")){
					$("#attendQ").hide();
				} else {
					$("#attendQ").show();	
				}
			}
		}
	};

	//참가자 등록: DB에 참가자 정보 추가 후, 화면 갱신
	$("#attendBtn").click(function(){

		$.ajax({
			url: 'http://192.168.3.1:8000/ricetimes/' + number,
			headers: {
		        'Content-Type':'application/json',
	        	'Authorization':store.get("token")
		    },
			type: 'put',
			dataType: 'json',
			// data: {
				//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
			// 	userId: $('#userId').val(),
			// 	name: $('#name').val()
			// },
			success: function(data) {
				location.reload();//화면 갱신
			}
		});
	});

	// 본인 작성 게시물일 경우, 수정, 삭제 버튼 활성화
	$('#update').click(function(){
		location.href="/views/update.html"
	});

	// 삭제 버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#delete').click(function(){
		$.ajax({
			url: 'http://192.168.3.1:8000/ricetimes/' + number,
			headers: {
		        'Content-Type':'application/json',
	        	'Authorization':store.get("token")
		    },
			type: 'delete',
			dataType: 'json',
			// data: {
			// 	//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
			// 	userId: $('#userId').val(),
			// 	name: $('#name').val()
			// },
			success: function(data) {
				location.href="/views/list.html"
			}
		});
	});

	// 목록 버튼 클릭 시
	$('#list').click(function(){
		store.remove("data");
		location.href="/views/list.html"
	});

	//참가자 클릭 시
	var attendFlag = true;
	$("a").click(function(){
		var titleId = $(this).attr("id");

		//본인의 참가만 수정 가능하게 비교 필요
		if (store.get("token") === attendData.riceTimeId){
			
			//참가자 리스트에 true / false 수정
			$.ajax({
				url: 'http://192.168.3.1:8000/ricetimes/' + number,
				headers: {
			        'Content-Type':'application/json',
		 	       	'Authorization':store.get("token")
			    },
				type: 'put',
				dataType: 'json',
				// data: {
				// 	//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
				// 	userId: $('#userId').val(),
				// 	name: $('#name').val()
				// },
				success: function(data) {
					//버튼 색상 변경
					if(attendFlag === true){
						$(this).attr("class", "btn btn-sm btn-danger");	
						attendFlag = false;
					} else {
						$(this).attr("class", "btn btn-sm btn-primary");	
						attendFlag = true;
					}
				}
			});
		}
	});
});
