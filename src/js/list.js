$(document).ready(function(){

	// var pushMove = function(){
	// 	alert("push:  "+store.get(pushId));
	// 	if (store.get(pushId)){
	// 		alert("push")
	// 		location.href="/views/detail.html"
	// 	}
	// }
	// pushMove();

	var totalList;	//받아온 데이터를 저장할 변수
	var listLen;	//받아온 데이터 객체의 수

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
					if (subtitle.length > 15){
						retitle = subtitle.substring(0, 16) + "..."; //제목
					} else {
						retitle = subtitle;
					}

	    	        $("#panelGroup").append(
			            "<div class='col-xs-12' id='panel"+i+"'>"+
			                "<div class='panel panel-default margin-bottom' style='border-left-color: #"+colorInfo+";border-left-width:15px;'>"+
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
						location.href="/views/detail.html";
					});
		        }
			}
		});
	}
	getData();


	//웹페이지에서 뒤로가기 누른 경우,
	// history.pushState(null, null, location.href); 
	// window.onpopstate = function(event) { 
	// 	alert("back")
	// 	store.remove("token") //토큰 삭제
	// 	location.href="../index.html"
	// }

	
	//조건에 맞는 ID 를 가진 것들은 보이게 하고 나머지는 보이지 않게 하기
	$("#selectBox").change(function(){
		var place = $(this).children("option:selected").text();

		for(var i=0; i<listLen; i++){
			if (place === "전체"){
				$("#panel"+i).show();
			} else if(place === totalList[i].location){
				$("#panel"+i).show();
			} else {
				$("#panel"+i).hide();
			}
		}
	});
});
