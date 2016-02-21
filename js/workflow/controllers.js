'use strict';

angular.module('goalBuddy.controllers', ['ngResource'])
	.controller('ScoresController', ['$scope', 'GameData', '$resource', function($scope, GameData, $resource){
		$scope.gameData = {
			favoriteTeams: [],
			gameList: [],
			test:"test",
			error: ''
		};
		var promise;
		$scope.setGameList = function(){
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

		//Initialize
		$scope.setGameList();
	}]);