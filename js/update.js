// 게시물 번호로 가져온 정보를 미리 폼에 세팅 후 출력
// 수정버튼을 누르면 해당 내용으로 수정
// 취소 누르면 게시물 번호로 상세 페이지로 이동

$(document).ready(function(){
	//해당 ID를 보내고 받아온 정보를 화면 출력
	var test = store.get('token')
	

	//비밀번호를 받아서 두 PW가 일치하면 update 요청
	$('#updatePassword').click(function(){
		var newPw = document.updatePwForm.NewPassword.value;
		var rePw = document.updatePwForm.RePassword.value;

		//입력된 패스워드가 동일한 경우,
		if (newPw == "1234"){
			alert("다른 비밀번호를 입력하세요.")
			location.reload()
		} else if (newPw != "1234" && newPw == rePw){
			//목록 화면으로 이동
			location.href="/views/list.html"
		} else {
			//다시 로드
			alert("동일한 비밀번호를 입력하세요.")
			location.reload()
		}
	});

	$('#back').click(function(){
		history.back()
	});

});

//store.remove('username')
//store.clear()
//store.set('user', { name: 'joe', likes: 'javascript' })
//var user = store.get('user')
//document.write(user.name + ' likes ' + user.likes)