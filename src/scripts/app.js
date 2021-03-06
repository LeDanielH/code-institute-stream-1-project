angular.module('bandApp', [
	'ngFitText',
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ngTouch',
    'myBandAppControllers',
    'myBandAppFilters',
    'myBandAppDirectives',
    'myBandAppServices',
    'myBandAppAnimations'
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
				.when('/cart', {
					templateUrl: 'templates/cart.html',
					controller: 'CartController'
				})
				.when('/biography', {
					templateUrl: 'templates/biography.html',
					controller: 'BioController'
				})
				.when('/lyrics', {
					templateUrl: 'templates/lyrics.html',
					controller: 'LyricsController'
				})
				.when('/sing-in', {
					templateUrl: 'templates/sing-in.html',
					controller: 'SignUpController'
				})
				.otherwise({
					redirectTo: '/home'
				});
        }
    ]);