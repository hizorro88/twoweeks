$(document).ready(function(){

	var totalList;	//받아온 데이터를 저장할 변수
	var listLen;	//받아온 데이터 객체의 수

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
	        		colorInfo = '5cb85c';
	        	} else if (totalList[i].location == '우면동'){
	        		colorInfo = '5bc0de';
	        	} else {
	        		colorInfo = 'f0ad4e';
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
		                "<div class='panel panel-default' style='border-left-color: #"+colorInfo+";border-left-width:15px;'>"+
		                    "<div class='panel-body' style='padding-bottom:0px;' id='"+totalList[i].riceTimeId+"'>"+
		                        "<div class='row'>"+
		                            "<div class='col-xs-2 text-center'>"+
		                                "<img alt='50x50' data-src='holder.js/140x140' class='img-circle' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTk2ZjE5MTBmMSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1OTZmMTkxMGYxIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=' data-holder-rendered='true' style='width: 50px; height: 50px;'>"+
		                            "</div>"+
		                            "<div class='col-xs-10 text-center'>"+
		                                "<div class='row'>"+
		                                    "<div class='col-xs-12 text-left' style='padding-left:30px;'>"+
		                                        "<p style='font-size:16px;'><strong>"+retitle+"</strong></p>"+
		                                    "</div>"+
		                                "</div>"+
		                                "<div class='row' style='margin-bottom:0px'>"+
		                                    "<div class='col-xs-12 text-right'>"+
		                                        "<p style='font-size:12px;margin-bottom:0px;'><strong><i class='fa fa-clock-o' aria-hidden='true'></i>"+finalDate+"</strong></p>"+
		                                    "</div>"+
		                                "</div>"+
		                                "<div class='row'>"+
		                                    "<div class='col-xs-12 text-right'>"+
		                                         "<p style='font-size:12px;margin-bottom:0px;'><strong><i class='fa fa-user' aria-hidden='true'></i>"+totalList[i].maker+"</strong></p>"+
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



				// $("#panelGroup").append("<div class='panel panel-primary' id='panel"+i+"'>"+
				// 							"<div class='panel-heading' style='min-height: 50px; max-height: 50px; vertical-align: middle;'>"+
				// 								"<h4 class='panel-title'>"+
				// 									"<span id='"+totalList[i].riceTimeId+"' style='padding:0px 10px 0px 0px;'></span>"+
				// 								"</h4>"+
				// 							"</div>"+
				// 							"<div class='panel-body'>"+
				// 								"<span class='glyphicon glyphicon-time' style='padding:0px 5px 0px 0px;'></span>"+ //날짜
				// 								"<span id='meetingDate"+i+"' style='padding:0px 10px 0px 0px;'></span>"+
				// 								"<span class='glyphicon glyphicon-map-marker' style='padding:0px 5px 0px 0px;'></span>"+ //장소
				// 								"<span id='location"+i+"' style='padding:0px 10px 0px 0px;'></span>"+
				// 								"<span class='glyphicon glyphicon-user' style='padding:0px 5px 0px 0px;'></span>"+ //작성자
				// 								"<span id='maker"+i+"' style='padding:0px 10px 0px 0px;'></span>"+
				// 							"</div>"+
				// 						"</div>")
				
				// 	 <div class="panel-footer">Panel footer</div>
				
				
	   //          $("#meetingDate"+i).text(finalDate); //날짜
				// $("#location"+i).text(totalList[i].location); //장소
	   //          $("#maker"+i).text(totalList[i].maker); //작성자
	        }
		}
	});

	$('#logout').click(function(){
		store.clear();
		location.href="../index.html";
	});

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
