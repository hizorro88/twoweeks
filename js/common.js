$(document).ready(function(){
	
	function tokenCheck(){
		if (!store.get("token")){
			location.href="../index.html";
		}
	}

	tokenCheck();

});