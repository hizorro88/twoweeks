$(document).ready(function(){
		
	// alert("2:"+ store.get("pushId"));

	$('#logout').click(function(){
		store.clear();
		window.location.href="../index.html";
	});

	window.otherMessage = function(token, id){
		var personalToken = token;
		var pushId = id;
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

	function tokenCheck(){
		if (!store.get("userId") || !store.get("username") || !store.get("department") || !store.get("url")){
			store.remove("token");
			window.location.href="../index.html";
		}
		else if (!store.get("token")){
			window.location.href="../index.html";
		} 
		// else { //토큰이 있는 경우
		// 	//토큰관리를 위한 시간
		// 	var now = new Date();
		// 	var day = now.getDate();
		// 	var hour = now.getHours();
		// 	var min = now.getMinutes();
		// 	if (store.get("loginDate") != day || (store.get("loginTime") + 60 < hour*60 + min)){
		// 		store.remove("token");
		// 		window.location.href="../index.html";
		// 	}
		// }
	}
	
	tokenCheck();

});