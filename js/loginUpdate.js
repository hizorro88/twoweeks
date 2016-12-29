$(document).ready(function(){
	
	var token = store.get('token')
	var userId = store.get('userId')
	var name = store.get('name')
	var team = store.get('team')

	//해당 ID를 보내고 받아온 정보를 화면 출력
	$.('#id').val(userId)
	$.('#name').val(name)
	$.('#team').val(team)

	//비밀번호를 받아서 두 PW가 일치하면 update 요청
	$('#updatePassword').click(function(){
		var newPw = $.('#NewPassword').val()
		var rePw = $.('#RePassword').val()
		
		//입력된 패스워드가 또 1234 이면 다시 입력
		if (newPw == "1234"){
			alert("다른 비밀번호를 입력하세요.")
			//값을 없애고 포커싱을 newPw로 이동
			$.('#NewPassword').val("")
			$.('#RePassword').val("")
			$.('#NewPassword').focus()
		} else if (newPw != "1234" && newPw == rePw){
			//서버에 패스워드 변경 요청
			$.ajax({
				url: '/test.json/' + userId,
				type: 'put',
				dataType: 'json',
				data: {
					password : newPw
				},
				success: function(data) {
					//목록 화면으로 이동
					location.href="/views/list.html"
				}
			});
		} else {
			//다시 로드
			alert("동일한 비밀번호를 입력하세요.")
			//값을 없애고 포커싱을 newPw로 이동
			$.('#NewPassword').val("")
			$.('#RePassword').val("")
			$.('#NewPassword').focus()
		}
	});

	$('#back').click(function(){
		//토큰 삭제
		store.remove('token')
		history.back()
	});

});

//store.remove('username')
//store.clear()
//store.set('user', { name: 'joe', likes: 'javascript' })
//var user = store.get('user')
//document.write(user.name + ' likes ' + user.likes)

//$('body').append(data);