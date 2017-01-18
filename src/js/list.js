$(document).ready(function(){

	var totalList;	//받아온 데이터를 저장할 변수
	var listLen;	//받아온 데이터 객체의 수
    var inviteListData;

	var getData = function(){
		$.ajax({
			url: store.get("url")+'/ricetimes/',
			 //url: '../dummy.json',
			headers: {
	        	'Content-Type':'application/json',
	        	'x-auth-token':store.get("token")
	    	},
	    	// async: false, //결과값 정렬을 위해 전역변수에 넣어 두기 위해
			type: 'GET',
			dataType: 'json',
			error: function(data, status, err) {
				alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.");
				store.remove("token");
				window.location.href="../index.html";
			},
			success: function(data) {
				store.set("listData", data);
				totalList = data;
		        listLen = totalList.length;

		        for(var i=0; i<listLen; i++){
		        	//컬러 정보 결정
		        	var colorInfo;
		        	if (totalList[i].location == '광화문'){
		        		colorInfo = 'd9534f';
		        	} else if (totalList[i].location == '우면동'){
		        		colorInfo = '5bc0de';
		        	} else {
		        		colorInfo = 'f0ad4e';
		        	}

		        	var imageInfo;
		        	if (totalList[i].category == '밥'){
		        		imageInfo = 'plate_50x50.png';
		        	} else if (totalList[i].category == '술'){
		        		imageInfo = 'beer_50x50.png';
		        	} else {
		        		imageInfo = 'coffee_50x50.png';
		        	}

		        	//날짜 정보 수정
		        	var date = totalList[i].meetingDate;
		        	var time = date.substring(11, 13);
		        	var newTime;
		        	var dateStr;
		        	if (Number(time) > 12){
	        			dateStr = "오후";
	        			newTime = Number(time) - 12;
		        	} else {
		        		dateStr = "오전";
		        		newTime = Number(time);
		        	}
					var finalDate = date.substring(0, 10) +" "+dateStr+" "+newTime+ date.substring(13, 16);

					//제목 정보 수정
					var subtitle = totalList[i].title;
					var retitle;
					if (subtitle.length > 14){
						retitle = subtitle.substring(0, 15) + ".."; //제목
					} else {
						retitle = subtitle;
					}

	    	        $("#panelGroup").append(
			            "<div class='col-xs-12' id='panel"+i+"'>"+
			                "<div class='panel margin-bottom panel-shadow' style='border-left-color: #"+colorInfo+";border-left-width:15px;'>"+
			                    "<div class='panel-body' style='padding-bottom:0px;' id='"+totalList[i].riceTimeId+"'>"+
			                        "<div class='row'>"+
			                            "<div class='col-xs-2 text-center'>"+
			                                "<img src='../img/"+imageInfo+"'>"+
			                            "</div>"+
			                            "<div class='col-xs-10 text-center'>"+
			                                "<div class='row'>"+
			                                    "<div class='col-xs-12 text-left' style='padding-left:30px;'>"+
			                                        "<p style='font-size:16px;'><strong>"+retitle+"</strong></p>"+
			                                    "</div>"+
			                                "</div>"+
			                                "<div class='row' style='margin-bottom:0px'>"+
			                                    "<div class='col-xs-12 text-right'>"+
			                                        "<p style='font-size:12px;margin-bottom:0px;'><strong><i class='fa fa-clock-o' aria-hidden='true'></i>&nbsp;"+finalDate+"</strong></p>"+
			                                    "</div>"+
			                                "</div>"+
			                                "<div class='row'>"+
			                                    "<div class='col-xs-12 text-right'>"+
			                                         "<p style='font-size:12px;margin-bottom:0px;'><strong><i class='fa fa-user' aria-hidden='true'></i>&nbsp;"+totalList[i].maker+"</strong></p>"+
			                                    "</div>"+
			                                "</div>"+
			                            "</div>"+
			                        "</div>"+
			                    "</div>"+
			                "</div>"+
			            "</div>")

	    	        .find('.panel').bind('click',function(e){
						var riceTimeId = $(this).find('div:eq(0)').attr('id');
						// console.log(riceTimeId)
						store.set("riceTimeId", riceTimeId);
						window.location.href="/views/detail.html";
					});
		        }
			}
		});
	}

	getData();

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
				store.set("inviteListData", inviteListData);
			},
			error: function(data, status, err) {
				alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.");
				store.remove("token");
				window.location.href="../index.html";
			}
		});
	}

	//저장된 데이터가 없으면 수행
	if (!store.get("inviteListData")){
		getInviteList();	
	}

	//스크롤 올리는 버튼
	$(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                $('#scrollUp').fadeIn();
            } else {
                $('#scrollUp').fadeOut();
            }
        });
        
        $("#scrollUp").click(function() {
            $('html, body').animate({
                scrollTop : 0
            }, 400);
            return false;
        });
    });
	
	//광화문/우면동/분당 정렬 관련
	var btn_g = true;
	var btn_w = true;
	var btn_b = true;
	$('.location_btn button').click(function(e){
		var location = $(this).text();
		location = location.trim();
		
		if (location == "광화문") {
			btn_g = (btn_g)? false:true;
		} else if (location == "우면동") {
			btn_w = (btn_w)? false:true;
		} else if (location == "분당") {
			btn_b = (btn_b)? false:true;
		}

		if (btn_g == false && btn_w == false && btn_b == false){
			alert("적어도 하나는 선택해야 합니다.");
			if (location == "광화문") {
				btn_g = (btn_g)? false:true;
			} else if (location == "우면동") {
				btn_w = (btn_w)? false:true;
			} else if (location == "분당") {
				btn_b = (btn_b)? false:true;
			}
			return false;
		}
		// console.log(btn_g);
		// console.log(btn_w);
		// console.log(btn_b);
		if (location == "광화문") {

			$(this)
			.addClass((btn_g)? 'btn-shadow btn-danger' : 'label-X')
			.removeClass((btn_g)? 'label-X' : 'btn-shadow btn-danger')
		} else if (location == "우면동") {
			$(this)
			.addClass((btn_w)? 'btn-shadow btn-info' : 'label-X')
			.removeClass((btn_w)? 'label-X' : 'btn-shadow btn-info')
		} else if (location == "분당") {
			$(this)
			.addClass((btn_b)? 'btn-shadow btn-warning' : 'label-X')
			.removeClass((btn_b)? 'label-X' : 'btn-shadow btn-warning')
		}

		for(var i=0; i<listLen; i++){
			if (btn_g == true && btn_w == false && btn_b == false) {
				if(totalList[i].location == "광화문"){
					$("#panel"+i).show();
				} else {
					$("#panel"+i).hide();
				}
			} else if (btn_g == true && btn_w == true && btn_b == false) {
				if(totalList[i].location == "광화문" || totalList[i].location == "우면동"){
					$("#panel"+i).show();
				} else {
					$("#panel"+i).hide();
				}
			} else if (btn_g == true && btn_w == true && btn_b == true) {
				$("#panel"+i).show();
			} else if (btn_g == true && btn_w == false && btn_b == true) {
				if(totalList[i].location == "광화문" || totalList[i].location == "분당"){
					$("#panel"+i).show();
				} else {
					$("#panel"+i).hide();
				}
			} else if (btn_g == false && btn_w == true && btn_b == true) {
				if(totalList[i].location == "우면동" || totalList[i].location == "분당"){
					$("#panel"+i).show();
				} else {
					$("#panel"+i).hide();
				}
			} else if (btn_g == false && btn_w == false && btn_b == true) {
				if(totalList[i].location == "분당"){
					$("#panel"+i).show();
				} else {
					$("#panel"+i).hide();
				}
			} else if (btn_g == false && btn_w == true && btn_b == false) {
				if(totalList[i].location == "우면동"){
					$("#panel"+i).show();
				} else {
					$("#panel"+i).hide();
				}
			}
		}
	});
});
