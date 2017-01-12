$(document).ready(function(){
	
	//초기 세팅
	var userId = store.get("userId");
	$("#id").text(userId);

	//확인 클릭 시, 비밀번호를 받아서 두 PW가 일치하면 update 요청
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
				url: store.get("url") + '/user/password',
				headers: {
		        	'Content-Type':'application/json',
		        	'x-auth-token':store.get("token")
		    	},
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify({
					userId : userId,
					password : newPw
				}),
				complete: function(data, textStatus, jqXHR ) {
					if (data.status === 200)
						location.href="/views/list.html";
				}
			});

		} else {
			alert("동일한 비밀번호를 입력하세요.")
			$("#NewPassword").val("");
			$("#RePassword").val("");
			$("#NewPassword").focus();
		}
	});

	//웹페이지에서 뒤로가기 누른 경우,
	history.pushState(null, null, location.href); 
	window.onpopstate = function(event) { 
		store.remove("token") //토큰 삭제
		location.href="../index.html"
	}

	$("#back").click(function(){
		store.remove("token") //토큰 삭제
		location.href="../index.html"
	});
});