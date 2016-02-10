$(document).ready(function(){

	var currentDate;

	$.get("https://statsapi.web.nhl.com/api/v1/schedule?", function(data){
		currentDate = data.dates[0].date;
		
		var dateData = currentDate.split('-');
		currentDate = dateData[1] + "/" + dateData[2] + "/" + dateData[0];

		$("#gameDate").html(currentDate);

		var currentGames = data.dates[0].games;

		jQuery.each(currentGames, function(index, item){
			//item.teams.away.team.name - gives the value of the name of the away team.
			//item.teams.home.team.name - gives the value of the name of the home team.
			var gameState = item.status.abstractGameState;
			var gameStart = moment(item.gameDate)
			//var clientDate = new Date();
			//
			var gameTime = gameStart.tz('America/New_York').format('h:mma z'); 
			//var gameTime    = moment.tz(gameStart, "America/New_York");
			//var date = new Date(((gameStart || "").replace(/-/g,"/").replace(/[TZ]/g," ")) + clientDate.getTimezoneOffset());

			//alert(date.toLocaleTimeString());
			//var gameStartArr = gameStart.split('T');

			//var gameTime = gameStartArr[1];

			var homeName = item.teams.home.team.name;
			var awayName = item.teams.away.team.name;

			var homeScore = item.teams.home.score;
			var awayScore = item.teams.away.score;

			$("#scoreTable").append("<tr>");
			$("#scoreTable").append("<td>" + homeName + "</td>");

			if(gameState === "Live"){
				$("#scoreTable").append("<td>" + homeScore + "</td>");
				$("#scoreTable").append("<td>" + " - " + "</td>");
				$("#scoreTable").append("<td>" + awayScore + "</td>");
			}
			else
			{
				$("#scoreTable").append("<td></td>");
				$("#scoreTable").append("<td class='gameTimes'>" + gameTime + "</td>");
				$("#scoreTable").append("<td></td>");
			}

			$("#scoreTable").append("<td>" + awayName + "</td>");
			$("#scoreTable").append("</tr>");

			// $("#scoreTable").append("<tr>");
			// $("#scoreTable").append("<td>" + homeScore + "</td>");
			// $("#scoreTable").append("<td>" + awayScore + "</td>");
			// $("#scoreTable").append("</tr>");
		});
	});
	


});