angular.module('bandApp', [
	'ngFitText',
    'ngRoute',
    'ngSanitize',
    'myBandAppControllers',
    'myBandAppFilters',
    'myBandAppDirectives',
    'myBandAppServices'
    // 'templates'
    // 'myBandAppAnimations',
])
	.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
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
				.when('/home/:postId', {
					templateUrl: 'templates/blog-post-detail.html',
					controller: 'BlogPostDetailController'
				})
				.otherwise({
					redirectTo: '/home'
				});
        }
    ]);