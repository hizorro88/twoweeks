// 게시물 번호로 상세정보를 출력
// 본인 작성 게시물일 경우 표시를 서버에 같이 보냄, 그 표시가 있는 경우에, 수정, 삭제 버튼 활성화

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