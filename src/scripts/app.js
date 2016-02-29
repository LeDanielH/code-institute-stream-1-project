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
			.when('/store/:itemId', {
				templateUrl: 'templates/store-item-detail.html',
				controller: 'StoreItemDetailController'
			})
			.when('/home/post', {
				templateUrl: 'templates/blog-post-detail.html',
				controller: 'HomeController'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}]);