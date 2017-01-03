$(document).ready(function(){
	
	var number = 124125125217;
	// var number = store.get("number");
	var detailData;	//받아온 상세 데이터를 저장할 변수
	var attendData;	//받아온 참가자 데이터를 저장할 변수
	
	//상세 내용
	$.ajax({
		// url: "http://192.168.3.1:8000/ricetimes/" + number,
		url: '../ricetime.json',
		async: false, //결과값 전역변수에 넣어 두기
		headers: {
        	'Content-Type':'application/json',
        	'Authorization':store.get("token")
    	},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			detailData = store.set("data", data);
			attendData = detailData.joinRiceTime;

			var attendDataLength = attendData.length;

			//참석자 세팅
			for(var i=0; i<attendDataLength; i++){
				$("#attendList").append("<a class='btn btn-sm btn-primary' role='button' id='attendee"+i+"'></a>");

				//어느 부분에 정보를 보여줄 것인지 결정하기 위해 tag 마다 ID 값을 부여함.
	            $("#attendee"+i).text(attendData[i].joiner);
	        }

			formSetting();
		}
	});

	//폼 기본 내용 세팅
	function formSetting(){

		$("#name").val(detailData.name);
		$("#team").val(detailData.team);
		$("#title").val(detailData.title);
		$("#location").val(detailData.location);
		$("#meetingdate").val(detailData.date);
		// $("#category").text(detailData.category);
		$("#contents").val(detailData.content);

		// 참석자 명단
		$("#attendBtn").show();

		//본인 아이디와 글의 아이디가 같은 경우(본인이 작성한 글인 경)
		if (store.get("userId") === detailData.riceTimeId){
			// 수정, 삭제 버튼 활성화
			$("#update").show();
			$("#delete").show();
			// 참석하시겠습니까? 비활성화
			$("#attendQ").hide();

		//타인 글
		} else {
			// 수정, 삭제 버튼 비활성화
			$("#update").hide();
			$("#delete").hide();
			// 참석하시겠습니까? 활성화
			$("#attendQ").show();
		}
	};


	// $("a").click(function(){
	// 	var titleId = $(this).attr("id");
	// 	var lastNumber = titleId.substr(5, titleId.length);


	var attendFlag = true;
	$("a").click(function(){
		
		//본인의 참가글만 수정 가능하게 비교 필요


		//현재 true 이면 false 로 
		if(attendFlag === true){
			$(this).attr("class", "btn btn-sm btn-danger");	
			attendFlag = false;
		} else {
			$(this).attr("class", "btn btn-sm btn-primary");	
			attendFlag = true;
		}


		//댓글리스트에 true / false 수정
		// $.ajax({
		// 	url: '{{url}}/ricetimes/' + number,
		// 	headers: {
		        // 'Content-Type':'application/json',
	 	       // 	'Authorization':store.get("token")
		//     },
		// 	type: 'put',
		// 	dataType: 'json',
		// 	// data: {
		// 	// 	//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
		// 	// 	userId: $('#userId').val(),
		// 	// 	name: $('#name').val()
		// 	// },
		// 	success: function(data) {
		// 		location.href="/views/list.html"
		// 	}
		// });
	});

	//참가자 등록: DB에 참가자 정보 추가 후, 리스트 받아와서 화면 갱신
	$("#attend").click(function(){
		
		// $.ajax({
		// 	url: '{{url}}/ricetimes/' + number,
		// 	headers: {
		//         'Content-Type':'application/json',
	 //        	'Authorization':store.get("token")
		//     },
		// 	type: 'put',
		// 	dataType: 'json',
		// 	// data: {
			// 	//작성자, 팀, 제목, 장소, 만남일, 범주, 내용
			// 	userId: $('#userId').val(),
			// 	name: $('#name').val()
			// },
		// 	success: function(data) {
		// 		location.href="/views/list.html"
		// 	}
		// });
	});


	// 본인 작성 게시물일 경우, 수정, 삭제 버튼 활성화
	$('#update').click(function(){
		location.href="/views/update.html"
	});

	// 삭제 버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#delete').click(function(){
		$.ajax({
			url: '{{url}}/ricetimes/' + number,
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
});
