$(document).ready(function(){

	var idList = [];
	 idList = $.getJSON("sample data/gamedaydata.jsonp", function(data){
		var i;

		//alert(data.games.length);
		for(i = 0; i < data.games.length; i++){
			this.push("<li>"+data.games[i].id+"</li>");

		}
	})	;
	//alert(idList[1]);
	//alert(idList.length);
	for(i = 0; i < idList.length; i++){
		$(".scoreBox").text(idList[i]);
	}

	// var key, count = 0;

	// var id = gameData.data[1].id;
	
	// alert(id);
	// $(".scoreBox").text(id);

});