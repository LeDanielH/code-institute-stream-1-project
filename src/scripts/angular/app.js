angular.module('bandApp', ['ngRoute', 'myBandAppControllers', 'myBandAppDirectives', 'myBandAppServices'])
	.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/home', {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
				})
				.when('/gigs', {
					templateUrl: 'templates/gigs.html',
					controller: 'GigsController'
				})
				// .when('/tab-1', {
				// 	templateUrl: 'templates/buy-ticket.html',
				// 	controller: 'BuyTicketController'
				// })
				// .when('/tab-2', {
				// 		templateUrl: 'templateUrl/book-us.html',
				// 		controller: 'BookUsController'
				// 	})
				.otherwise({redirectTo: '/home'});
		}]);