$(document).ready(function(){

	
	$('#doInvite').click(function(){
		var availableTags = [
	      "ActionScript",
	      "AppleScript",
	      "Asp",
	      "BASIC",
	      "C",
	      "C++",
	      "Clojure",
	      "COBOL",
	      "ColdFusion",
	      "Erlang",
	      "Fortran",
	      "Groovy",
	      "Haskell",
	      "Java",
	      "JavaScript",
	      "Lisp",
	      "Perl",
	      "PHP",
	      "Python",
	      "Ruby",
	      "Scala",
	      "Scheme"
	    ];
	    $( ".addresspicker" ).autocomplete({
	      source: availableTags
	    });

	    $('#add').click(function(){
	    	//id값은 유일해야 함
    		$("#addList").append("<span class='label label-invite pull-left' id='test'></span>&nbsp;");
    		$("#test").text($("#search").val());
	    });

	    $('#invite').click(function(){
	    	var test = $("#search").val();
	    	console.log(test)
	    });

	});


    // $( ".addresspicker" ).autocomplete({
    //     source : function( request, response ) {
    //          $.ajax({
    //                 type: 'post',
    //                 url: "/autocomplete.jsp",
    //                 dataType: "json",
    //                 // request.term = $("#autocomplete").val()
    //                 data: { value : request.term },
    //                 success: function(data) {
    //                     //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
    //                     response(
    //                         $.map(data, function(item) {
    //                             return {
    //                                 label: item.data,
    //                                 value: item.data
    //                             }
    //                         })
    //                     );
    //                 }
    //            });
    //         },
    //     //조회를 위한 최소글자수
    //     minLength: 2,
    //     select: function( event, ui ) {
    //         // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
    //     }
    // });



	var userId = store.get("userId");
	var username = store.get("username");
	var team = store.get("department");

	var postItem = function(){
		var sendData = JSON.stringify({
					userId: userId,
					maker: username,
					team: team,
					title: $('#title').val(),
					meetingDate: $('#meetingDate').val(),
					category: $('input:radio[name="category"]:checked').val(),
					location: $('input:radio[name="location"]:checked').val(),
					content: $('#contents').val()
				})

		var token = store.get("token");

		$.ajax({
			url: store.get("url")+'/ricetimes',
			headers: {
		        'Content-Type':'application/json',
	        	'x-auth-token': token
		    },
			type: 'POST',
			dataType: 'json',
			data: sendData,
			success: function(data) {
				alert("만남이 등록되었습니다.");
				//history.back()
				location.href = "/views/list.html";
			}
		});
	}

	//기본 정보 세팅
	$("#name").text(" "+username);
	$("#team").text(team);
	var now = new Date();
	var year= now.getFullYear();
	var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
	var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
	var chan_val = year + '-' + mon + '-' + day + 'T12:00';
	$("#meetingDate").val(chan_val);

	// 물음표 연속 2개시 오류
	$('#title').keyup(function(){
		var str = $(this).val()
		checkStr = str.indexOf('\?\?');
		if (checkStr != -1){
			str = str.replace(/\?/, "");
			$(this).val(str);
		}
	});

	$('#contents').keyup(function(){
		var str = $(this).val()
		checkStr = str.indexOf('\?\?');
		if (checkStr != -1){
			str = str.replace(/\?/, "");
			$(this).val(str);
		}
	});

	// 작성버튼 클릭 시, 서버에 정보를 보내고 리스트 화면으로 이동
	$('#submit').click(function(e){
		//미작성 부분 체크
		if ($("#title").val() == ""){
			$("#title").focus();
		} else if ($("#meetingDate").val() == ""){
			$("#meetingDate").focus();
		} else if ($("#contents").val() == ""){
			$("#contents").focus();
		} else {
			postItem();
		}
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		location.href = "/views/list.html";
	});
});
