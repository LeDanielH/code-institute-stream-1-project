angular.module('bandApp', [
		'ngRoute',
		'myBandAppControllers',
		'myBandAppFilters',
		'myBandAppDirectives',
		'myBandAppServices',
		// 'templates'
		// 'myBandAppAnimations',
	])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'templates/home.html',
				controller: 'HomeController'
			})
			.when('/gigs', {
				templateUrl: 'templates/gigs.html',
				controller: 'GigsController'
			})
			.when('/store', {
				templateUrl: 'templates/store.html',
				controller: 'StoreController'
			})
			.when('/store-items/:itemId', {
				templateUrl: 'templates/store-item-detail.html',
				controller: 'StoreItemDetailController'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}]);