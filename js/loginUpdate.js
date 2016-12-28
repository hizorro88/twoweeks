



function updatePassword(){
	var newPw = document.updatePwForm.NewPassword.value;
	var rePw = document.updatePwForm.RePassword.value;



	//입력된 패스워드가 동일한 경우,
	if (newPw == rePw){
		//목록 화면으로 이동
		location.href="/views/list.html"
	} else {
		//다시 로드
		location.reload();
	}
}



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