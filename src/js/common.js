$(document).ready(function(){
	
	function tokenCheck(){
		if (!store.get("token")){
			location.href="../index.html";
		} else { //토큰이 있는 경우
			//토큰관리를 위한 시간
			var now = new Date();
			var day = now.getDate();
			var hour = now.getHours();
			var min = now.getMinutes();
			if (store.get("loginDate") != day || (store.get("loginTime") + 60 < hour*60 + min)){
				store.remove("token");
				location.href="../index.html";
			}
		}
	}
	tokenCheck();
});

