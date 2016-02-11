$(document).ready(function(){

	var currentDate;
	var teamBGs = {"teams": ["blank", "njd-bg", "nyi-bg", "nyr-bg", "phi-bg", "pit-bg", "bos-bg", "buf-bg", "mon-bg", "ott-bg", "tor-bg", "blank", "car-bg", "fla-bg", "tbl-bg", "wsh-bg", "chi-bg", "det-bg", "nsh-bg", "stl-bg", "cgy-bg", "col-bg", "edm-bg", "van-bg", "ana-bg", "dal-bg", "lak-bg", "blank", "sjs-bg", "cbj-bg", "min-bg", "blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank", "win-bg", "ari-bg"] };

	$.get("https://statsapi.web.nhl.com/api/v1/schedule?", function(data){
		currentDate = data.dates[0].date;
		
		var dateData = currentDate.split('-');
		currentDate = dateData[1] + "/" + dateData[2] + "/" + dateData[0];

		$("#gameDate").html(currentDate);

		var currentGames = data.dates[0].games;

		jQuery.each(currentGames, function(index, item){
			//item.teams.away.team.name - gives the value of the name of the away team.
			//item.teams.home.team.name - gives the value of the name of the home team.
			var link = item.link;

			var expandedData;
			$.getJSON("https://statsapi.web.nhl.com/" + link, function(data){expandedData = data;}).done(function(data){
				var curPeriod = expandedData.liveData.linescore.currentPeriod;
			});
			
			var gameState = item.status.abstractGameState;
			var gamePeriod = item.status.codedGameState;
			var gameStart = moment(item.gameDate)

			var gameTime = gameStart.tz('America/New_York').format('h:mma z'); 

			var homeName = item.teams.home.team.name;
			var awayName = item.teams.away.team.name;

			var homeScore = item.teams.home.score;
			var awayScore = item.teams.away.score;
			
			var homeBG="";
			var awayBG="";
			
			var homeId = item.teams.home.team.id;
			var awayId = item.teams.away.team.id;

			homeBG = teamBGs.teams[homeId];
			awayBG = teamBGs.teams[awayId];

			$("#scoreTable").append("<tr>");
			$("#scoreTable").append("<td class='"+ homeBG +"'>" + homeName + "</td>");

			if(gameState === "Live"){
				$("#scoreTable").append("<td>" + homeScore + "</td>");
				if(curPeriod === "1")
					$("#scoreTable").append("<td>" + curPeriod + "st</td>");
				if(curPeriod === "2")
					$("#scoreTable").append("<td>" + curPeriod + "nd</td>");
				if(curPeriod === "3")
					$("#scoreTable").append("<td>" + curPeriod + "rd</td>");
				if(curPeriod === "OT")
					$("#scoreTable").append("<td>" + "OT" + "</td>");
				$("#scoreTable").append("<td>" + awayScore + "</td>");
			}
			else if(gameState === "Final"){
				$("#scoreTable").append("<td>" + homeScore + "</td>");
				$("#scoreTable").append("<td>" + " Final " + "</td>");
				$("#scoreTable").append("<td>" + awayScore + "</td>");
			}
			else
			{
				$("#scoreTable").append("<td></td>");
				$("#scoreTable").append("<td class='gameTimes'>" + gameTime + "</td>");
				$("#scoreTable").append("<td></td>");
			}

			$("#scoreTable").append("<td class='"+ awayBG +"'>" + awayName + "</td>");
			$("#scoreTable").append("</tr>");


		});
	});
	


});