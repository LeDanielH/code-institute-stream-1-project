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
;(function() {
    'use strict';
    angular.module('myBandAppControllers', ['myBandAppServices'])
        .controller('IndexController', [
            '$scope',
            '$location',
            // '$http',
            'GigsDataService',
            'StoreDataService',
            'TestimonialsDataService',
            'SocialLinksDataService',
            'CallToActionDataService',
            function(
                $scope,
                $location,
                // $http,
                GigsDataService,
                StoreDataService,
                TestimonialsDataService,
                SocialLinksDataService,
                CallToActionDataService
            ) {
                // $scope.getDocumentWidth = window.matchMedia(width);
                //GIGS
                $scope.subtitles = GigsDataService.subtitles;
                $scope.maps = GigsDataService.maps.query();

                // STORE
                // $http.get('data/store-items.json').success(function(data) {
                //     $scope.storeItemsList = data.splice(0, 5);
                // });
                $scope.storeItems = StoreDataService.storeItems.query();
                $scope.sortByCategory = StoreDataService.sortByCategory;
                $scope.sortByCategories = StoreDataService.sortByCategories;
                // $scope.getSaleAll = StoreDataService.getSaleAll;

                //TESTIMONIALS
                $scope.images = TestimonialsDataService.images.query();

                //SOCIAL LINKS
                $scope.socialLinkstitle = SocialLinksDataService.title;
                $scope.socialIcons = SocialLinksDataService.socialIcons.query();

                //BUTTON BOXES
                $scope.go = CallToActionDataService.go;
                $scope.callToActionBoxes = CallToActionDataService.callToActionBoxes.query();
            }
        ]);

}());
;(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('GigsController', [
            '$scope',
            'GigsDataService',
            'GuestsDataService',
            function(
                $scope,
                GigsDataService,
                GuestsDataService
            ) {
                $scope.title = 'GIGS';
                $scope.subtitles = GigsDataService.subtitles;
               $scope.maps = GigsDataService.maps.query();
                $scope.guests = GuestsDataService.guests;
                $scope.ticketPrice = GuestsDataService.ticketPrice;
                $scope.addGuest = function() {
                    if (!$scope.guestsName || $scope.guestsName === '') {
                        return;
                    }
                    $scope.guests.push({
                        guestsName: $scope.guestsName
                    });
                };
            }
        ]);
}());
;(function() {
    'use strict';

    angular.module('myBandAppControllers')
        .controller('HomeController', [
            '$scope',
            'BlogPostsDataService',
            function(
                $scope,
                BlogPostsDataService
            ) {
                $scope.title = BlogPostsDataService.title;
                $scope.blogPosts = BlogPostsDataService.blogPosts.query();
                $scope.upVote = BlogPostsDataService.upVote;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppControllers')
		.controller('StoreItemDetailController', [
        '$scope',
        // '$http',
        '$routeParams', 
        function(
            $scope,
            // $http,
            $routeParams
            ) {
                // $http.get('data/store-items/' + $routeParams + '.json')
                //     .success(function(data) {
                //         $scope.item = data;
                //         $scope.mainImageUrl = data.images[0];
                //     });
                $scope.item = StoreDataService.get({itemId: $routeParams.itemId}, function(item) {
                    $scope.mainImageUrl = item.images[0];
                });
                $scope.setMainImage = function(imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                };
            }]);

}());

;(function() {
	'use strict';
	angular.module('myBandAppControllers')
	.controller('StoreController', [
        '$scope',
        'StoreDataService', 
        function(
            $scope, 
            StoreDataService
            ) {
                // $http.get('data/store-items/store-items.json').success(function(data) {
                //     $scope.storeItemsList = data.splice(0, 5);
                // });
                $scope.storeItemsList = StoreDataService.storeItems.query();
                $scope.sortByCategory = StoreDataService.sortByCategory;
            }
        ]);
}());

;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('BlogPostsDataService', [
        '$resource',
        function(
            $resource
            ) {
                var posts = {
                    title: 'News',
                    blogPosts: $resource('data/json/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'blog-posts'
                            },
                            isArray: true
                        }
                    }),
                    upVote: function(post) {
                        post.upVotes += 1;
                    }
                };
                return posts;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('CallToActionDataService', [
        '$resource',
        function($resource) {
            var calls = {
                go: function(path) {
                    $location.path(path);
                },
                callToActionBoxes: $resource('data/json/:itemId.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                            itemId: 'calls-to-action'
                        },
                        isArray: true
                    }
                })
            };
            return calls;
        }
    ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('GigsDataService', [
        '$rootScope', 
        '$resource',
        function(
            $rootScope, 
            $resource
            ) {
                var gigs = {
                    subtitles: ['where', 'when'],
                    maps: $resource('data/json/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'gigs'
                            },
                            isArray: true
                        }
                    })
                };
                return gigs;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('GuestsDataService', [
        function() {
            var people = {
                guests: [{}],
                ticketPrice: 20
            };
            return people;
        }
    ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('SocialLinksDataService', [
        '$resource',
        function(
            $resource
            ) {
                var socialLinks = {
                    title: 'follow us!',
                    socialIcons: $resource('data/json/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'social-links'
                            },
                            isArray: true
                        }
                    })
                };
                return socialLinks;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('StoreDataService', [
        '$resource',
        function(
            $resource
            ) {
                var store = {
                    storeItems: $resource('data/json/store-items/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'store-items'
                            },
                            isArray: true
                        }
                    }),
                    sortByCategories: ['popular', 'best selling', 'price'],
                    sortByCategory: 'price'
                };
                return store;
            }
        ]);
}());
;(function() {
    'use strict';
    angular.module('myBandAppServices', ['ngResource'])
        .factory('TestimonialsDataService', [
            '$resource',
            function(
                $resource
            ) {
                var testimonials = {
                    images: $resource('data/json/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'testimonials'
                            },
                            isArray: true
                        }
                    })
                };
                return testimonials;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppDirectives', [])
    .directive('makeMap', function() {
        var mapDdirective = {
            restrict: 'EA',
            templateUrl: 'templates/directives/maps.html',
            scope: {
                map: '='
            },
            link: function(scope, element, attrs) {
                console.log('in map directive link');
            },
            controller: ['$scope',
                function mapController($scope) {

                    $scope.$watch('map', function() {
                        console.log("map directive controller watching map change", $scope.map);
                    });

                    $scope.zoomIn = function() {
                        $scope.map.zoom++;
                    };
                    $scope.zoomOut = function() {
                        $scope.map.zoom--;
                    };
                    $scope.mapDimensions = function() {
                        if (!$scope.map.width) {
                            var width = 200;
                        } else {
                            width = $scope.map.width;
                        }
                        if (!$scope.map.height) {
                            var height = 200;
                        } else {
                            height = $scope.map.height;
                        }
                        return width + 'x' + height;
                    };
                    $scope.returnAddressOrNot = function() {
                        console.log("address: " + $scope.map.address);
                        if ($scope.map.address)
                            return true;
                        else
                            return false;
                    };
                    $scope.mapAddress = function() {
                        var street = $scope.map.address[0].street;
                        var city = $scope.map.address[0].city;
                        var country = $scope.map.address[0].country;
                        return street + ', ' + city + ', ' + country;
                    };
                }
            ]
        };
        return mapDdirective;
    });
}());
;(function() {
    'use strict';
    angular.module('myBandAppDirectives', [])
        .directive('photoSlider', ['$timeout',
            function($timeout) {
                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: 'templates/directives/photo-slider.html',
                    scope: {
                        images: '='
                    },
                    link: function(scope, elem, attrs) {
                        scope.currentIndex = 0;
                        scope.next = function() {
                            if (scope.currentIndex < scope.images.length - 1) {
                                scope.currentIndex++;
                            } else {
                                scope.currentIndex = 0;
                            }
                        };
                        scope.prev = function() {
                            if (scope.currentIndex > 0) {
                                scope.currentIndex--;
                            } else {
                                scope.currentIndex = scope.images.length - 1;
                            }
                        };
                        scope.$watch('currentIndex', function() {
                            scope.images.forEach(function(image) {
                                image.visible = false;
                            });
                            scope.images[scope.currentIndex].visible = true;
                        });

                        var timer;
                        var sliderFunc = function() {
                            timer = $timeout(function() {
                                scope.next();
                                timer = $timeout(sliderFunc, 5000);
                            }, 5000);
                        };
                        sliderFunc();
                        scope.$on('$destroy', function() {
                            $timeout.cancel(timer);
                        });
                    },

                };
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppFilters', [])
	.filter('StockFilter', function() {
		var trueMark = '\u2713';
		var falseMark = '\u2718';
		return function(stock) {
			if (stock > 0) {
				return trueMark;
			} else {
				return falseMark;
			}
		};
	});
}());