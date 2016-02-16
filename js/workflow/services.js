angular.module('goalBuddy.services', ['ngResource'])
	.factory('GameData', function($resource){
		return $resource('https://statsapi.web.nhl.com/api/v1/schedule?', {})
	})
	.factory('SpecificGameData', function($resource){
		return $resource('https://statsapi.web.nhl.com:gameLink',
			{gameLink: '@gameLink'})
	})
	.value('version', '0.1');