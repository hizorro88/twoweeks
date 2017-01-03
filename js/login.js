$(document).ready(function () {

	//id 입력하는 부분
	$('#userId').keyup(function(){
		var str = $(this).val()
		str = str.trim() //공백제거
		str = str.replace(/[^0-9]/g, "")

		var tmp = "";
        if( str.length < 4){
            $(this).val(str);
        } else if (str.length < 7){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            $(this).val(tmp);
        } else if (str.length < 11){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 3);
            tmp += '-';
            tmp += str.substr(6);
            $(this).val(tmp);
        } else {      
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 4);
            tmp += '-';
            tmp += str.substr(7);
            $(this).val(tmp);
        }
	});

	//로그인 버튼 클릭
	$('#login').click(function(){
		var id = $('#userId').val();
		var pw = $('#password').val();

		//보낼 때
		$.ajax({
			url: 'http://192.168.3.1:8000/user/login',
			headers: {
		        'Content-Type':'application/json'
		    },
			type: 'post',
			dataType: 'json',
			data: JSON.stringify({
				userId: id,
				password: pw
			}),
			success: function(data) {
				//아이디, 이름, 토큰 저장
				store.set("userId", id);
				store.set("username", data.username);
				store.set("token", data.token);
				
				if (pw == "1234"){
					//로그인 수정화면으로 이동
					location.href="/views/loginUpdate.html"
				} else {
					//목록 화면으로 이동
					location.href="/views/list.html"
				}
			},
			error: function(data, status, err) {
				alert("아이디나 비밀번호를 확인하세요.")
				$('#userId').val("");
				$('#password').val("");
				$('#userId').focus();
			}
		});
	});
});