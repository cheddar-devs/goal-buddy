'use strict';

angular.module('goalBuddy.controllers', ['ngResource', 'ngRoute'])
	.controller('ScoresController', ['$scope', 'GameData', '$resource', '$route', function($scope, GameData, $resource, $route){
		$scope.gameData = {
			favoriteTeams: [],
			gameList: [],
			settings: new Object,
			theme: '',
			generatorEnabled: false
		};
		$scope.favoriteTeam = 'None';
		$scope.teamList = {"teams" : [ {"id" : 1, "name" : "New Jersey Devils", "link" : "/api/v1/teams/1", "venue" : {"name" : "Prudential Center", "city" : "Newark", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "NJD", "teamName" : "Devils", "locationName" : "New Jersey", "firstYearOfPlay" : "1982", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 23, "teamName" : "Devils", "link" : "/api/v1/franchises/23"}, "officialSiteUrl" : "http://www.newjerseydevils.com", "franchiseId" : 23, "shortName" : "New Jersey", "active" : true }, {"id" : 2, "name" : "New York Islanders", "link" : "/api/v1/teams/2", "venue" : {"name" : "Barclays Center", "city" : "Brooklyn", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "NYI", "teamName" : "Islanders", "locationName" : "New York", "firstYearOfPlay" : "1972", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 22, "teamName" : "Islanders", "link" : "/api/v1/franchises/22"}, "officialSiteUrl" : "http://www.newyorkislanders.com", "franchiseId" : 22, "shortName" : "NY Islanders", "active" : true }, {"id" : 3, "name" : "New York Rangers", "link" : "/api/v1/teams/3", "venue" : {"name" : "Madison Square Garden", "city" : "New York", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "NYR", "teamName" : "Rangers", "locationName" : "New York", "firstYearOfPlay" : "1926", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 10, "teamName" : "Rangers", "link" : "/api/v1/franchises/10"}, "officialSiteUrl" : "http://www.newyorkrangers.com", "franchiseId" : 10, "shortName" : "NY Rangers", "active" : true }, {"id" : 4, "name" : "Philadelphia Flyers", "link" : "/api/v1/teams/4", "venue" : {"name" : "Wells Fargo Center", "city" : "Philadelphia", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "PHI", "teamName" : "Flyers", "locationName" : "Philadelphia", "firstYearOfPlay" : "1967", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 16, "teamName" : "Flyers", "link" : "/api/v1/franchises/16"}, "officialSiteUrl" : "http://www.philadelphiaflyers.com", "franchiseId" : 16, "shortName" : "Philadelphia", "active" : true }, {"id" : 5, "name" : "Pittsburgh Penguins", "link" : "/api/v1/teams/5", "venue" : {"name" : "CONSOL Energy Center", "city" : "Pittsburgh", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "PIT", "teamName" : "Penguins", "locationName" : "Pittsburgh", "firstYearOfPlay" : "1967", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 17, "teamName" : "Penguins", "link" : "/api/v1/franchises/17"}, "officialSiteUrl" : "http://www.pittsburghpenguins.com", "franchiseId" : 17, "shortName" : "Pittsburgh", "active" : true }, {"id" : 6, "name" : "Boston Bruins", "link" : "/api/v1/teams/6", "venue" : {"name" : "TD Garden", "city" : "Boston", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "BOS", "teamName" : "Bruins", "locationName" : "Boston", "firstYearOfPlay" : "1924", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 6, "teamName" : "Bruins", "link" : "/api/v1/franchises/6"}, "officialSiteUrl" : "http://www.bostonbruins.com", "franchiseId" : 6, "shortName" : "Boston", "active" : true }, {"id" : 7, "name" : "Buffalo Sabres", "link" : "/api/v1/teams/7", "venue" : {"name" : "First Niagara Center", "city" : "Buffalo", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "BUF", "teamName" : "Sabres", "locationName" : "Buffalo", "firstYearOfPlay" : "1970", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 19, "teamName" : "Sabres", "link" : "/api/v1/franchises/19"}, "officialSiteUrl" : "http://www.sabres.com", "franchiseId" : 19, "shortName" : "Buffalo", "active" : true }, {"id" : 8, "name" : "Montréal Canadiens", "link" : "/api/v1/teams/8", "venue" : {"name" : "Centre Bell", "city" : "Montreal", "timeZone" : {"id" : "America/Montreal", "offset" : -5 } }, "abbreviation" : "MTL", "teamName" : "Canadiens", "locationName" : "Montréal", "firstYearOfPlay" : "1909", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 1, "teamName" : "Canadiens", "link" : "/api/v1/franchises/1"}, "officialSiteUrl" : "http://www.canadiens.com", "franchiseId" : 1, "shortName" : "Montréal", "active" : true }, {"id" : 9, "name" : "Ottawa Senators", "link" : "/api/v1/teams/9", "venue" : {"name" : "Canadian Tire Centre", "city" : "Ottawa", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "OTT", "teamName" : "Senators", "locationName" : "Ottawa", "firstYearOfPlay" : "1990", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 30, "teamName" : "Senators", "link" : "/api/v1/franchises/30"}, "officialSiteUrl" : "http://www.ottawasenators.com", "franchiseId" : 30, "shortName" : "Ottawa", "active" : true }, {"id" : 10, "name" : "Toronto Maple Leafs", "link" : "/api/v1/teams/10", "venue" : {"name" : "Air Canada Centre", "city" : "Toronto", "timeZone" : {"id" : "America/Toronto", "offset" : -5 } }, "abbreviation" : "TOR", "teamName" : "Maple Leafs", "locationName" : "Toronto", "firstYearOfPlay" : "1917", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 5, "teamName" : "Maple Leafs", "link" : "/api/v1/franchises/5"}, "officialSiteUrl" : "http://www.mapleleafs.com", "franchiseId" : 5, "shortName" : "Toronto", "active" : true }, {"id" : 12, "name" : "Carolina Hurricanes", "link" : "/api/v1/teams/12", "venue" : {"name" : "PNC Arena", "city" : "Raleigh", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "CAR", "teamName" : "Hurricanes", "locationName" : "Carolina", "firstYearOfPlay" : "1979", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 26, "teamName" : "Hurricanes", "link" : "/api/v1/franchises/26"}, "officialSiteUrl" : "http://www.carolinahurricanes.com", "franchiseId" : 26, "shortName" : "Carolina", "active" : true }, {"id" : 13, "name" : "Florida Panthers", "link" : "/api/v1/teams/13", "venue" : {"name" : "BB&T Center", "city" : "Sunrise", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "FLA", "teamName" : "Panthers", "locationName" : "Florida", "firstYearOfPlay" : "1993", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 33, "teamName" : "Panthers", "link" : "/api/v1/franchises/33"}, "officialSiteUrl" : "http://www.floridapanthers.com", "franchiseId" : 33, "shortName" : "Florida", "active" : true }, {"id" : 14, "name" : "Tampa Bay Lightning", "link" : "/api/v1/teams/14", "venue" : {"name" : "Amalie Arena", "city" : "Tampa", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "TBL", "teamName" : "Lightning", "locationName" : "Tampa Bay", "firstYearOfPlay" : "1991", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 31, "teamName" : "Lightning", "link" : "/api/v1/franchises/31"}, "officialSiteUrl" : "http://www.tampabaylightning.com", "franchiseId" : 31, "shortName" : "Tampa Bay", "active" : true }, {"id" : 15, "name" : "Washington Capitals", "link" : "/api/v1/teams/15", "venue" : {"name" : "Verizon Center", "city" : "Washington", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "WSH", "teamName" : "Capitals", "locationName" : "Washington", "firstYearOfPlay" : "1974", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 24, "teamName" : "Capitals", "link" : "/api/v1/franchises/24"}, "officialSiteUrl" : "http://www.washingtoncapitals.com", "franchiseId" : 24, "shortName" : "Washington", "active" : true }, {"id" : 16, "name" : "Chicago Blackhawks", "link" : "/api/v1/teams/16", "venue" : {"name" : "United Center", "city" : "Chicago", "timeZone" : {"id" : "America/Chicago", "offset" : -6 } }, "abbreviation" : "CHI", "teamName" : "Blackhawks", "locationName" : "Chicago", "firstYearOfPlay" : "1926", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 11, "teamName" : "Blackhawks", "link" : "/api/v1/franchises/11"}, "officialSiteUrl" : "http://www.chicagoblackhawks.com", "franchiseId" : 11, "shortName" : "Chicago", "active" : true }, {"id" : 17, "name" : "Detroit Red Wings", "link" : "/api/v1/teams/17", "venue" : {"name" : "Joe Louis Arena", "city" : "Detroit", "timeZone" : {"id" : "America/Detroit", "offset" : -5 } }, "abbreviation" : "DET", "teamName" : "Red Wings", "locationName" : "Detroit", "firstYearOfPlay" : "1926", "division" : {"id" : 17, "name" : "Atlantic", "link" : "/api/v1/divisions/17"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 12, "teamName" : "Red Wings", "link" : "/api/v1/franchises/12"}, "officialSiteUrl" : "http://www.detroitredwings.com", "franchiseId" : 12, "shortName" : "Detroit", "active" : true }, {"id" : 18, "name" : "Nashville Predators", "link" : "/api/v1/teams/18", "venue" : {"name" : "Bridgestone Arena", "city" : "Nashville", "timeZone" : {"id" : "America/Chicago", "offset" : -6 } }, "abbreviation" : "NSH", "teamName" : "Predators", "locationName" : "Nashville", "firstYearOfPlay" : "1997", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 34, "teamName" : "Predators", "link" : "/api/v1/franchises/34"}, "officialSiteUrl" : "http://www.nashvillepredators.com", "franchiseId" : 34, "shortName" : "Nashville", "active" : true }, {"id" : 19, "name" : "St. Louis Blues", "link" : "/api/v1/teams/19", "venue" : {"name" : "Scottrade Center", "city" : "St. Louis", "timeZone" : {"id" : "America/Chicago", "offset" : -6 } }, "abbreviation" : "STL", "teamName" : "Blues", "locationName" : "St. Louis", "firstYearOfPlay" : "1967", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 18, "teamName" : "Blues", "link" : "/api/v1/franchises/18"}, "officialSiteUrl" : "http://www.stlouisblues.com", "franchiseId" : 18, "shortName" : "St Louis", "active" : true }, {"id" : 20, "name" : "Calgary Flames", "link" : "/api/v1/teams/20", "venue" : {"name" : "Scotiabank Saddledome", "city" : "Calgary", "timeZone" : {"id" : "America/Denver", "offset" : -7 } }, "abbreviation" : "CGY", "teamName" : "Flames", "locationName" : "Calgary", "firstYearOfPlay" : "1980", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 21, "teamName" : "Flames", "link" : "/api/v1/franchises/21"}, "officialSiteUrl" : "http://www.calgaryflames.com", "franchiseId" : 21, "shortName" : "Calgary", "active" : true }, {"id" : 21, "name" : "Colorado Avalanche", "link" : "/api/v1/teams/21", "venue" : {"name" : "Pepsi Center", "city" : "Denver", "timeZone" : {"id" : "America/Denver", "offset" : -7 } }, "abbreviation" : "COL", "teamName" : "Avalanche", "locationName" : "Colorado", "firstYearOfPlay" : "1979", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 27, "teamName" : "Avalanche", "link" : "/api/v1/franchises/27"}, "officialSiteUrl" : "http://www.coloradoavalanche.com", "franchiseId" : 27, "shortName" : "Colorado", "active" : true }, {"id" : 22, "name" : "Edmonton Oilers", "link" : "/api/v1/teams/22", "venue" : {"name" : "Rexall Place", "city" : "Edmonton", "timeZone" : {"id" : "America/Edmonton", "offset" : -7 } }, "abbreviation" : "EDM", "teamName" : "Oilers", "locationName" : "Edmonton", "firstYearOfPlay" : "1979", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 25, "teamName" : "Oilers", "link" : "/api/v1/franchises/25"}, "officialSiteUrl" : "http://www.edmontonoilers.com", "franchiseId" : 25, "shortName" : "Edmonton", "active" : true }, {"id" : 23, "name" : "Vancouver Canucks", "link" : "/api/v1/teams/23", "venue" : {"name" : "Rogers Arena", "city" : "Vancouver", "timeZone" : {"id" : "America/Vancouver", "offset" : -8 } }, "abbreviation" : "VAN", "teamName" : "Canucks", "locationName" : "Vancouver", "firstYearOfPlay" : "1970", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 20, "teamName" : "Canucks", "link" : "/api/v1/franchises/20"}, "officialSiteUrl" : "http://www.canucks.com", "franchiseId" : 20, "shortName" : "Vancouver", "active" : true }, {"id" : 24, "name" : "Anaheim Ducks", "link" : "/api/v1/teams/24", "venue" : {"name" : "Honda Center", "city" : "Anaheim", "timeZone" : {"id" : "America/Los_Angeles", "offset" : -8 } }, "abbreviation" : "ANA", "teamName" : "Ducks", "locationName" : "Anaheim", "firstYearOfPlay" : "1993", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 32, "teamName" : "Ducks", "link" : "/api/v1/franchises/32"}, "officialSiteUrl" : "http://www.anaheimducks.com", "franchiseId" : 32, "shortName" : "Anaheim", "active" : true }, {"id" : 25, "name" : "Dallas Stars", "link" : "/api/v1/teams/25", "venue" : {"name" : "American Airlines Center", "city" : "Dallas", "timeZone" : {"id" : "America/Chicago", "offset" : -6 } }, "abbreviation" : "DAL", "teamName" : "Stars", "locationName" : "Dallas", "firstYearOfPlay" : "1967", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 15, "teamName" : "Stars", "link" : "/api/v1/franchises/15"}, "officialSiteUrl" : "http://www.dallasstars.com", "franchiseId" : 15, "shortName" : "Dallas", "active" : true }, {"id" : 26, "name" : "Los Angeles Kings", "link" : "/api/v1/teams/26", "venue" : {"name" : "STAPLES Center", "city" : "Los Angeles", "timeZone" : {"id" : "America/Los_Angeles", "offset" : -8 } }, "abbreviation" : "LAK", "teamName" : "Kings", "locationName" : "Los Angeles", "firstYearOfPlay" : "1967", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 14, "teamName" : "Kings", "link" : "/api/v1/franchises/14"}, "officialSiteUrl" : "http://www.lakings.com", "franchiseId" : 14, "shortName" : "Los Angeles", "active" : true }, {"id" : 28, "name" : "San Jose Sharks", "link" : "/api/v1/teams/28", "venue" : {"name" : "SAP Center at San Jose", "city" : "San Jose", "timeZone" : {"id" : "America/Los_Angeles", "offset" : -8 } }, "abbreviation" : "SJS", "teamName" : "Sharks", "locationName" : "San Jose", "firstYearOfPlay" : "1990", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 29, "teamName" : "Sharks", "link" : "/api/v1/franchises/29"}, "officialSiteUrl" : "http://www.sjsharks.com", "franchiseId" : 29, "shortName" : "San Jose", "active" : true }, {"id" : 29, "name" : "Columbus Blue Jackets", "link" : "/api/v1/teams/29", "venue" : {"name" : "Nationwide Arena", "city" : "Columbus", "timeZone" : {"id" : "America/New_York", "offset" : -5 } }, "abbreviation" : "CBJ", "teamName" : "Blue Jackets", "locationName" : "Columbus", "firstYearOfPlay" : "1997", "division" : {"id" : 18, "name" : "Metropolitan", "link" : "/api/v1/divisions/18"}, "conference" : {"id" : 6, "name" : "Eastern", "link" : "/api/v1/conferences/6"}, "franchise" : {"franchiseId" : 36, "teamName" : "Blue Jackets", "link" : "/api/v1/franchises/36"}, "officialSiteUrl" : "http://www.bluejackets.com", "franchiseId" : 36, "shortName" : "Columbus", "active" : true }, {"id" : 30, "name" : "Minnesota Wild", "link" : "/api/v1/teams/30", "venue" : {"name" : "Xcel Energy Center", "city" : "St. Paul", "timeZone" : {"id" : "America/Chicago", "offset" : -6 } }, "abbreviation" : "MIN", "teamName" : "Wild", "locationName" : "Minnesota", "firstYearOfPlay" : "1997", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 37, "teamName" : "Wild", "link" : "/api/v1/franchises/37"}, "officialSiteUrl" : "http://www.wild.com", "franchiseId" : 37, "shortName" : "Minnesota", "active" : true }, {"id" : 52, "name" : "Winnipeg Jets", "link" : "/api/v1/teams/52", "venue" : {"name" : "MTS Centre", "city" : "Winnipeg", "timeZone" : {"id" : "America/Winnipeg", "offset" : -6 } }, "abbreviation" : "WPG", "teamName" : "Jets", "locationName" : "Winnipeg", "firstYearOfPlay" : "2011", "division" : {"id" : 16, "name" : "Central", "link" : "/api/v1/divisions/16"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 35, "teamName" : "Jets", "link" : "/api/v1/franchises/35"}, "officialSiteUrl" : "http://winnipegjets.com", "franchiseId" : 35, "shortName" : "Winnipeg", "active" : true }, {"id" : 53, "name" : "Arizona Coyotes", "link" : "/api/v1/teams/53", "venue" : {"name" : "Gila River Arena", "city" : "Glendale", "timeZone" : {"id" : "America/Phoenix", "offset" : -7 } }, "abbreviation" : "ARI", "teamName" : "Coyotes", "locationName" : "Arizona", "firstYearOfPlay" : "1979", "division" : {"id" : 15, "name" : "Pacific", "link" : "/api/v1/divisions/15"}, "conference" : {"id" : 5, "name" : "Western", "link" : "/api/v1/conferences/5"}, "franchise" : {"franchiseId" : 28, "teamName" : "Coyotes", "link" : "/api/v1/franchises/28"}, "officialSiteUrl" : "http://www.arizonacoyotes.com", "franchiseId" : 28, "shortName" : "Arizona", "active" : true } ] };


		var promise;
		$scope.setGameList = function(){
			$scope.gameData.gameList = [];
			GameData.getGames().then(function(data){
				//I don't know why this makes grabbing meta data work, but it does....
				var metaData = $scope.setMetaData(data);
				$scope.gameData.gameList.Games = [];

				var count = 0;
				var length = data.dates[0].totalItems;
				while(count < length){
					var Game = new Object;
					Game.GameInfo = data.dates[0].games[count];
					Game.GameMeta = $.get('https://statsapi.web.nhl.com' + data.dates[0].games[count].link, function(resp){

					});
					$scope.gameData.gameList.push(Game);
					count++;
				}

			});
		};

		$scope.setMetaData = function(data){
			//Grab links and add in meta data from indivisual game API calls.
			
			var count = 0;
			var length = data.dates[0].totalItems;
			var metaList = [];
			
			while(count < length){
				GameData.getSpecificGame(data.dates[0].games[count].link).then(function(resp){
					//$scope.gameData.gameList[count].GameMeta = resp; //Still don't know
				});
				count++;
			}

			return metaList;
		};

		$scope.resolve



		//Conditionals
		$scope.showScore = function(message){
			
			if(message === "Live" || message === "Final")
				return true;
			else
				return false;
		};

		$scope.showStatus = function(message){
			if(message === "Final")
				return true;
			else
				return false;
		};

		$scope.showTimeLeft = function(message){
			if(message === "Live")
				return true;
			return false;

		};

		$scope.showTime = function(message){
			if(message === "Preview")
				return true;
			return false;
		};

		$scope.isHomeWinner = function(homeScore, awayScore, gameState){
			if(gameState === "Final"){
				if(homeScore > awayScore)
					return "success";
				return "danger";
			}
		};

		$scope.isAwayWinner = function(awayScore, homeScore, gameState){
			if(gameState === "Final"){
				if(awayScore > homeScore)
					return "success";
				return "danger";
			}
		};

		$scope.isSelectedTheme = function(message){
			if(message === $scope.gameData.theme)
				return false;

			return true;
		};

		$scope.isGeneratorEnabled = function(){
			if($scope.gameData.generatorEnabled)
				return true;
			return false;
		};

		$scope.isFavoriteTeam = function(team){
			if(team === $scope.favoriteTeam)
				return false;

			return true;
		}

		$scope.isFavoriteTeamInvolved = function(homeTeam, awayTeam){
			if(homeTeam === $scope.favoriteTeam || awayTeam === $scope.favoriteTeam)
				return false;
			return true;
		}

		/*
		///
		/// Get/Set Functions
		///
		*/

		$scope.getSettings = function(){
			chrome.storage.sync.get(function(result){
				
				if(jQuery.isEmptyObject(result))
				{
					chrome.storage.sync.set({'theme': "Plain"});
					chrome.storage.sync.set({'generatorEnabled': false})
					chrome.storage.sync.set({'favoriteTeam': 'None'});
					return getSettings();
				}

				$scope.gameData.theme = result.theme;
				$scope.gameData.generatorEnabled = result.generatorEnabled;
				$scope.favoriteTeam = result.favoriteTeam;
			});
		};

		$scope.saveSettings = function(){

			if($('#generatorEnabled').is(':checked')){
				chrome.storage.sync.set({'generatorEnabled' : true});
			}
			else
				chrome.storage.sync.set({'generatorEnabled': false});
			var currentTheme = $("#themeSelect").val();
			var currentTeam = $("#favoriteSelect").val();

			chrome.storage.sync.set({'theme': currentTheme});
			chrome.storage.sync.set({'favoriteTeam': currentTeam});

			$("#notifyBox").toggle("slow");
		};

		$scope.init = function(){
			if($route.current.templateUrl === "partials/scores.html"){
				$scope.setGameList();
				$scope.getSettings();
			}
			else
				$scope.getSettings();
		};


		//Initialize
		$scope.init();
	}]);