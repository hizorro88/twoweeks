$(document).ready(function(){
		
	// alert("2:"+ store.get("pushId"));

	$('#logout').click(function(){
		store.clear();
		window.location.href="../index.html";
	});

	function tokenCheck(){
		if (!store.get("userId") || !store.get("username") || !store.get("department") || !store.get("url")){
			store.remove("token");
			window.location.href="../index.html";
		}

		if (!store.get("token")){
			window.location.href="../index.html";
		} else { //토큰이 있는 경우
			//토큰관리를 위한 시간
			var now = new Date();
			var day = now.getDate();
			var hour = now.getHours();
			var min = now.getMinutes();
			if (store.get("loginDate") != day || (store.get("loginTime") + 60 < hour*60 + min)){
				store.remove("token");
				window.location.href="../index.html";
			}
		}
	}
	
	tokenCheck();

	// function ajaxCall(url, async, token, type, sendData){
	// 	$.ajax({
	// 		url: store.get("url")+"/ricetimes/" + riceTimeId,
	// 		async: false, //결과값 전역변수에 넣어 두기
	// 		headers: {
	//         	'Content-Type':'application/json',
	//         	'x-auth-token':store.get("token")
	//     	},
	// 		type: 'GET',
	// 		dataType: 'json',
	// 		success: function(data) {
	// 			//전체 데이터
	// 			detailData = store.set("detailData", data);
	// 			//참가자 데이터
	// 			attendData = detailData.joinRiceTime;
	// 			attendDataLength = attendData.length;
	// 			//참가자, 기본 폼 세팅
	// 			attendSetting();
	// 			formSetting();
	// 		}
	// 	});
	// }


});