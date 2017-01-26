
$(document).ready(function () {

	store.remove("detailData");
	store.remove("listData");
	var id;
	var pw;
	var personalToken="";
	var pushId="";
	
	// store.set("url", "http://192.168.3.2:8000");
	store.set("url", "http://ktapi.m.bd-lab.com:8000");

	$('#userId').val("010-");

	var signalToAndroid = function(){
		try {
			window.android.setMessage("go android");
		} catch(err) {
	        console.log('error');
	    }
		// alert("go android!");
	}

	// var signalToIOS = function() {
	//     try {
	//         webkit.messageHandlers.callbackHandler.postMessage("go ios");
	//     } catch(err) {
	//         console.log('error');
	//     }
	// }
	window.otherMessage=function(token, id){
		personalToken = token;
		pushId = id;
		// alert("success")
		// alert(personalToken)
		// alert(pushId)

		if(pushId.length != 0 && pushId.length != 4){
			store.set("pushId", pushId);
			// alert("2:"+ store.get("pushId"));
			if (store.get("token")){
				// alert("3:"+ store.get("pushId"));
				window.location.href="/views/detail.html"
			}
		} 
	}


	//token 있는 경우
	var isToken = function(){
		if(store.get("token")){
			if (!store.get("userId") || !store.get("username") || !store.get("department") || !store.get("url")){
				store.remove("userId");
				store.remove("username");
				store.remove("department");
				store.remove("url");
				store.remove("token");
			} else {
				window.location.href="/views/list.html"	
			}
		}
	}

	try {
		//안드로이드에서 값 받아오기
		signalToAndroid();
		//아이폰에서 값 받아오기
		// alert("signal")
		// signalToIOS();
	} catch(e) {
		// console.log(e)
	} finally {
		isToken();
	}


	var postPersonalToken = function(){
		// alert(personalToken)
		// alert(typeof(personalToken)) //string
		// alert(store.get("url")+'/fcm/'+store.get("userId"))
		// alert(store.get("token"))
		var sendData = JSON.stringify({"token" : personalToken})

		$.ajax({
			url: store.get("url")+'/fcm/'+store.get("userId"),
			headers: {
		        'Content-Type':'application/json',
		        'x-auth-token':store.get("token")
		    },
			type: 'POST',
			dataType: 'json',
			async: false,
			data: sendData,
			success: function(data){
				// alert("success")
				// alert(data.token)
				store.set("personalToken", personalToken);
			},
			error:function(request,status,error){
		    	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    }
		});
	}

	// var loginCheck = function(){
		// if (pw == "1234"){
		// 	//로그인 수정화면으로 이동
		// 	window.location.href="/views/loginUpdate.html"
		// } 
		// else if(pushId.length != 0 &&  pushId.length != 4){
		// 	alert(pushId);
		// 	window.location.href="/views/detail.html"
		// } 
		// else {
		// 	//목록 화면으로 이동
		// 	alert(pushId);
		// 	window.location.href="/views/list.html"
		// }	
	// }

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

	var defaultDataSetting = function(data){
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
	}

	//로그인 버튼 클릭
	$('#login').click(function(){
		id = $('#userId').val();
		pw = $('#password').val();

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
				//기본 정보 저장(local)
				defaultDataSetting(data);
				
				if(personalToken.length != 0){
					// alert(personalToken)
					//기기 토큰 정보 저장(server)
					postPersonalToken();	
				}
				
				//최종 목적지 결정
				// loginCheck();
				if (pw == "1234"){
					//로그인 수정화면으로 이동
					window.location.href="/views/loginUpdate.html"
				} 
				else if(pushId.length != 0 &&  pushId.length != 4){
					// alert("상세");
					window.location.href="/views/detail.html"
				} 
				else {
					//목록 화면으로 이동
					// alert("목록");
					window.location.href="/views/list.html"
				}	
			},
			error: function(data, status, err) {
				if (data.status == 403){
					alert("비밀번호를 확인하세요.");
					$('#password').val("");
					$('#password').focus();	
				} else if (data.status == 404){ //id 없는 것
					alert("정확한 휴대폰번호를 입력하세요.");
					$('#userId').val("010-");
					$('#password').val("");
					$('#userId').focus();
				}
			}
		});
	});
});