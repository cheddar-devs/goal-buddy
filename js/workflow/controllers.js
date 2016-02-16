'use strict';

angular.module('goalBuddy.controllers', ['ngResource'])
	.controller('ScoresController', ['$scope', 'GameData', 'SpecificGameData', '$resource', function($scope, GameData, SpecificGameData, $resource){
		$scope.gameData = {
			favoriteTeams: [],
			gameList: new Object,
			test:"test"
		};

		$scope.setGameList = function(){
			GameData.get({

			}, function(data){
				$scope.gameData.gameList = data;
			}).$promise;
		};



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
		}

		$scope.showTimeLeft = function(message){
			if(message === "Live")
				return true;
			return false;

		}

		$scope.showTime = function(message){
			if(message === "Preview")
				return true;
			return false;
		}


		//Return Functions
		$scope.getTimeRemaining = function(message){

			var Game = $resource('https://statsapi.web.nhl.com' + message, {});
			var thisGame = Game.get({}, function(data){
				$('#gamePeriod').text(data.liveData.linescore.currentPeriodOrdinal);
			}).$promise;
			// SpecificGameData.get({gameTime:message}, function(data){
			// 	return data.liveData.linescore.currentPeriodOrdinal;
			// }).$promise;
		};



		$scope.setGameList();
	}]);