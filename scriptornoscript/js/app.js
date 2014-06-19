angular.module('SONS', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false);

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'MainCtrl'
	})
	.when('/play', {
		templateUrl: 'views/game.html',
		controller: 'GameCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);