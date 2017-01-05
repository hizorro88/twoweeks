$(document).ready(function () {

	window.addEventListener("load", function() {
		setTimeout(scrollTo, 0, 0, 1);
	}, false);
	
	// var filter = "win16|win32|win64|mac";

	// if(navigator.platform){
	// 	if(0 > filter.indexOf(navigator.platform.toLowerCase())){
	// 		console.log("mobile")
	// 	}else{
	// 		console.log("PC")
	// 	}
	// }

	// store.clear();
	store.remove("department");
	store.remove("detailData");
	store.remove("listData");
	store.remove("url");
	store.remove("userId");
	store.remove("username");
	store.set("url", "http://192.168.3.2:8000");
	
	if(store.get("token")){
		location.href="/views/list.html"
	}

	$('#userId').val("010-");	

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
			url: store.get("url")+'/user/login',
			headers: {
		        'Content-Type':'application/json'
		    },
			type: 'POST',
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
				store.set("department", data.department);
				
				//토큰관리를 위한 시간
				var now = new Date();
				var day = now.getDate();
				var hour = now.getHours();
				var min = now.getMinutes();
				store.set("loginDate", day);
				store.set("loginTime", hour*60 + min); // 시간 저장

				if (pw == "1234"){
					//로그인 수정화면으로 이동
					location.href="/views/loginUpdate.html"
				} else {
					//목록 화면으로 이동
					location.href="/views/list.html"
				}	
			},
			error: function(data, status, err) {
				console.log(data.status)

				// alert("아이디나 비밀번호를 확인하세요.")
				
				$('#password').val("");
				$('#userId').select();
			}
		});
	});
});