$(document).ready(function(){
	
	var totalList;	//받아온 데이터를 저장할 변수
	var listLen;	//받아온 데이터 객체의 수

	$.ajax({
		url: 'http://192.168.3.1:8000/ricetimes/',
		headers: {
        	'Content-Type':'application/json',
        	'Authorization':store.get("token")
    	},
    	async: false, //결과값 정렬을 위해 전역변수에 넣어 두기 위해
		type: 'get',
		dataType: 'json',
		success: function(data) {
			totalList = data;
	        listLen = totalList.length;

	        for(var i=0; i<listLen; i++){
				$("#panelGroup").append("<div class='panel panel-default' id='panel"+i+"'>"+
											"<div class='panel-body'>"+
												"<span id='category"+i+"'></span>"+
												"<a id='"+totalList[i].riceTimeId+"'></a>"+ //@@@ 이 부분 수정 필요
												"<span id='meetingdate"+i+"'></span>"+
												"<span id='name"+i+"'></span>"+ //작성자
												// "<span class='badge' id='attendee"+i+"'></span>"+ //참가자
											"</div>"+
										"</div>");

				$("#location"+i).text(totalList[i].location); // 카테고리로 변경해야함.
	            $("#title"+i).text(totalList[i].title);
	            $("#meetingdate"+i).text(totalList[i].meetingdate);
	            $("#name"+i).text("name");
	            // $("#attendee"+i).text("attendee");
	        }
		}
	});

	//조건에 맞는 ID 를 가진 것들은 보이게 하고 나머지는 보이지 않게 하기
	$("#selectBox").change(function(){
		categorySort($(this).children("option:selected").text());
	});

	function categorySort(x){
		for(var i=0; i<listLen; i++){
			if (x == "전체"){
				$("#panel" + i).show();
			} else if(totalList[i].category == x){
				$("#panel" + i).show();
			} else {
				$("#panel" + i).hide();
			}
		}
	};

	//글 작성 클릭 시, 작성으로 이동
	$("#write").click(function(){
		location.href="/views/write.html";
	});

	//해당 게시물 클릭 시, 상세보기로 이동
	$("a").click(function(){
		var titleId = $(this).attr("id");
		store.set("titleId", titleId);

		location.href="/views/detail.html";
	});
});