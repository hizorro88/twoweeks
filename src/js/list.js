$(document).ready(function(){
	
	var totalList;	//받아온 데이터를 저장할 변수
	var listLen;	//받아온 데이터 객체의 수

	$.ajax({
		url: store.get("url")+'/ricetimes/',
		// url: '../../dummy.json',
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
	        	//style='max-height: 5;'
				$("#panelGroup").append("<div class='panel panel-primary' id='panel"+i+"'>"+
											"<div class='panel-heading'>"+
												"<h4 class='panel-title'>"+
													"<span id='"+totalList[i].riceTimeId+"' style='padding:0px 10px 0px 0px;'></span>"+
												"</h4>"+
											"</div>"+
											"<div class='panel-body'>"+
												"<span class='glyphicon glyphicon-time' style='padding:0px 5px 0px 0px;'></span>"+ //날짜
												"<span id='meetingDate"+i+"' style='padding:0px 10px 0px 0px;'></span>"+
												"<span class='glyphicon glyphicon-map-marker' style='padding:0px 5px 0px 0px;'></span>"+ //장소
												"<span id='location"+i+"' style='padding:0px 10px 0px 0px;'></span>"+
												"<span class='glyphicon glyphicon-user' style='padding:0px 5px 0px 0px;'></span>"+ //작성자
												"<span id='maker"+i+"' style='padding:0px 10px 0px 0px;'></span>"+ 
											"</div>"+
										"</div>")
				.find('.panel').bind('click',function(e){
					var riceTimeId = $(this).find('span:eq(0)').attr('id');
					// console.log(riceTimeId)
					//var riceTimeId = $(this).attr("id");
					store.set("riceTimeId", riceTimeId);
					location.href="/views/detail.html";
				});

				// 	 <div class="panel-footer">Panel footer</div>
				
				$("#"+totalList[i].riceTimeId).text(totalList[i].title); //제목
				var date = totalList[i].meetingDate;
				
				var finalDate = date.substring(0, 10) +" "+ date.substring(11, 16);
				
	            $("#meetingDate"+i).text(finalDate); //날짜
				$("#location"+i).text(totalList[i].location); //장소 
	            $("#maker"+i).text(totalList[i].maker); //작성자
	        }
		}
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