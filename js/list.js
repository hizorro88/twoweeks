//token 을 가지고 있는지 검사
// 1. 카테고리에 따라 리스트 재정렬
// 2. 전체 정보 가져와서 반복하여 폼에 보여주기, 정렬조건에 따라 필터링된 리스트만 구
// 3. 해당 게시물 클릭 시, 상세보기로 이동

$(document).ready(function(){
	
	var test = store.get('token')
	
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