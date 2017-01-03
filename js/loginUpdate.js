$(document).ready(function(){
	
	$("#id").text(store.get("userId"));

	//확인 버튼 클릭 이벤트: 비밀번호를 받아서 두 PW가 일치하면 update 요청
	$("#updatePassword").click(function(){
		var newPw = $("#NewPassword").val();
		var rePw = $("#RePassword").val();
		
		//입력된 패스워드가 8 자리가 안되면 다시 입력
		if (newPw.length < 8){
			alert("8자리 이상의 비밀번호를 입력하세요.")
			$("#NewPassword").val("");
			$("#RePassword").val("");
			$("#NewPassword").focus();

		} else if (newPw == rePw) {
			//서버에 패스워드 변경 요청
			$.ajax({
				url: 'http://192.168.3.1:8000/user/' + store.get("userId"),
				headers: {
		        	'Content-Type':'application/json',
		        	'Authorization':store.get("token")
		    	},
				type: 'put',
				dataType: 'json',
				data: JSON.stringify({
					password : newPw
				}),
				success: function(data) {
					//목록 화면으로 이동
					location.href="/views/list.html";
				}
			});

		} else {
			//다시 로드
			alert("동일한 비밀번호를 입력하세요.")
			$("#NewPassword").val("");
			$("#RePassword").val("");
			$("#NewPassword").focus();
		}
	});

	$("#back").click(function(){
		store.remove("token")//토큰 삭제
		location.href="../index.html"
	});
});