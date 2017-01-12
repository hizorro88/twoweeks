$(document).ready(function(){
	var inviteListData;
	var postInviteListData;
	// 받아온 초대 인원
	var getInviteList = function(){
		$.ajax({
			url: store.get("url")+'/user/persons',
			headers: {
		        'Content-Type':'application/json',
		        'x-auth-token':store.get("token")
		    },
		    async: false, //결과값 전역변수에 넣어 두기
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				inviteListData = data;
			},
			error: function(data, status, err) {
				alert("error")
			}
		});
	}

	//보낼 초대 인원
	var postInviteList = function(){
		$.ajax({
			url: store.get("url")+'/user/persons',
			headers: {
		        'Content-Type':'application/json',
		        'x-auth-token':store.get("token")
		    },
			type: 'POST',
			data: postInviteListData,
			dataType: 'json',
			success: function(data) {
				alert("success");
			},
			error: function(data, status, err) {
				alert("error");
			}
		});
	}

	$(".chosen-select").chosen();
	// $(".chosen-select").chosen({no_results_text: "Oops, nothing found!"}); 





	// $('#doInvite').click(function(){
	// 	//데이터 목록
	// 	getInviteList();

	// 	// var availableTags = [];

	// 	for (var i=0; i<inviteListData.length; i++){
	// 		//리스트를 만들어야 함
	// 		$("#check-list-box").append("<li class='list-group-item' id='"+inviteListData[i].userId+"'></li>");

	// 		$("#"+inviteListData[i].userId).text(inviteListData[i].username+"("+inviteListData[i].department+")");
	// 	}
		
	// 	$(function () {
 //    		$('.list-group.checked-list-box .list-group-item').each(function () {
	// 	        // Settings
	// 	        var $widget = $(this),
	// 	            $checkbox = $('<input type="checkbox" class="hidden" />'),
	// 	            color = ($widget.data('color') ? $widget.data('color') : "primary"),
	// 	            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
	// 	            settings = {
	// 	                on: {
	// 	                    icon: 'glyphicon glyphicon-check'
	// 	                },
	// 	                off: {
	// 	                    icon: 'glyphicon glyphicon-unchecked'
	// 	                }
	// 	            };
		            
	// 	        $widget.css('cursor', 'pointer')
	// 	        $widget.append($checkbox);

	// 	        // Event Handlers
	// 	        $widget.on('click', function () {
	// 	            $checkbox.prop('checked', !$checkbox.is(':checked'));
	// 	            $checkbox.triggerHandler('change');
	// 	            updateDisplay();
	// 	        });
	// 	        $checkbox.on('change', function () {
	// 	            updateDisplay();
	// 	        });		          

	// 	        // Actions
	// 	        function updateDisplay() {
	// 	            var isChecked = $checkbox.is(':checked');

	// 	            // Set the button's state
	// 	            $widget.data('state', (isChecked) ? "on" : "off");

	// 	            // Set the button's icon
	// 	            $widget.find('.state-icon')
	// 	                .removeClass()
	// 	                .addClass('state-icon ' + settings[$widget.data('state')].icon);

	// 	            // Update the button's color
	// 	            if (isChecked) {
	// 	                $widget.addClass(style + color + ' active');
	// 	            } else {
	// 	                $widget.removeClass(style + color + ' active');
	// 	            }
	// 	        }

	// 	        // Initialization
	// 	        function init() {
		            
	// 	            if ($widget.data('checked') == true) {
	// 	                $checkbox.prop('checked', !$checkbox.is(':checked'));
	// 	            }
		            
	// 	            updateDisplay();

	// 	            // Inject the icon if applicable
	// 	            if ($widget.find('.state-icon').length == 0) {
	// 	                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
	// 	            }
	// 	        }
	// 	        init();
	// 	    });
		    
	// 	    $('#get-checked-data').on('click', function(event) {
	// 	        event.preventDefault(); 
	// 	        var checkedItems = [], counter=0;

	// 	        $("#check-list-box li.active").each(function(idx, li) {
	// 	        	var invite_person = new Object();
	// 	        	var substring = $(li).text().split('(');

	// 	        	invite_person.joiner = substring[0]; //이름 
	// 	        	invite_person.userId = $(li).attr('id'); //아이디
	// 	        	checkedItems[counter] = JSON.stringify(invite_person);
	// 	        	counter++;
	// 	        	$("#addList").append("<span class='label label-invite' id='"+ counter +"'></span>&nbsp;");
	// 				$("#"+counter).text(substring[0]);
	// 	        });
		        
	// 	        postInviteListData = JSON.stringify(checkedItems, null, '\t');

	// 	        //창 종료
	// 	        $('#modal').modal('toggle');
	// 	    });

	// 	});
   
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
			//초대 인원을 서버에게 전달
			postInviteList();
			//글 내용을 서버에게 전달
			postItem();
		}
	});

	// 취소버튼 클릭 시, 이전 화면으로 이동
	$('#back').click(function(){
		location.href = "/views/list.html";
	});
});
