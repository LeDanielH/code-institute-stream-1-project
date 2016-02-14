angular.module('bandApp', [
		'ngRoute',
		'myBandAppControllers',
		'myBandAppDirectives',
		'myBandAppServices'
	])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'templates/home.html',
				controller: 'BlogPostsController'
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
			.otherwise({
				redirectTo: '/home'
			});
	}]);