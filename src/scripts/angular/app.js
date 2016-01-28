angular.module('bandApp', ['ngRoute', 'myBandAppControllers', 'myBandAppDirectives', 'myBandAppServices'])
	.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/home', {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
				})
				.otherwise({redirectTo: '/home'});
		}]);