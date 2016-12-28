$(document).ready(function () {
	$('#login').click(function(){
		var id = document.loginForm.inputID.value;
		var pw = document.loginForm.inputPassword.value;

		//해당 아이디와 패스워드로 서버에 전송


		//서버에서 토큰값을 받아옴
		

		//거절 토큰인 경우, login화면을 refresh
		//alert("아이디나 비밀번호를 확인하세요.")
		//location.reload();
	    
	    
		//승인 토큰인 경우,
		//if (승인 토큰){}
		//패스워드가 1234인 경우,
		if (pw == "1234"){
			//토큰, 아이디 값을 넘긴다.
			store.set('token', '01097770994')
			//store.remove('username')
			//store.clear()
			//store.set('user', { name: 'joe', likes: 'javascript' })
			//var user = store.get('user')
			//document.write(user.name + ' likes ' + user.likes)
			//로그인 수정화면으로 이동
			location.href="/views/loginUpdate.html"
		} else {
			//목록 화면으로 이동
			location.href="/views/list.html"
		}
	});
});




// var valid = false;

// var unArray = ["Philip", "George", "Sarah", "Michael"];  // as many as you like - no comma after final entry

// for (var i=0; i <unArray.length; i++) {
// if ((un == unArray[i]) && (pw == pwArray[i])) {
// valid = true;
// break;
// }
// }

// setTimeout("document.myform.username.focus()", 25);

// document.myform.username.disabled = true;