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
			.when('/home/:postId', {
				templateUrl: 'templates/blog-post-detail.html',
				controller: 'BlogPostDetailController'
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
        .controller('BlogPostDetailController', [
            '$scope',
            'BlogPostsDataService',
            '$routeParams',
            function(
                $scope,
                BlogPostsDataService,
                $routeParams
            ) {
                $scope.post = BlogPostsDataService.blogPosts.get({
                    postId: $routeParams.postId
                }, function(post) {
                    $scope.mainImageUrl = post.images[0];
                });
                $scope.setMainImage = function(imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                };
                $scope.comments = BlogPostsDataService.comments;
                $scope.addComment = function () {
                	if (!$scope.content || $scope.content === '' ) {
                		return;
                	}
                	$scope.comments.push({
                		userName: $scope.userName,
                		content: $scope.content,
                        upVotes: 0
                	});
                	$scope.userName = '';
                	$scope.content = '';
                };
                $scope.upVote = BlogPostsDataService.upVote;
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
                $scope.getYears = GigsDataService.getYears();
                $scope.getMonths = GigsDataService.getMonths();
                $scope.guests = [];
                $scope.ticketPrice = GuestsDataService.ticketPrice;
                $scope.addGuest = function() {
                    if (!$scope.name || $scope.name === '') {
                        return;
                    }
                    $scope.guests.push({
                        name: $scope.name
                    });
                    $scope.name = '';

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
            }
        ]);
}());
;(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('StoreItemDetailController', [
            '$scope',
            'StoreDataService',
            '$routeParams',
            function(
                $scope,
                StoreDataService,
                $routeParams
            ) {
                $scope.item = StoreDataService.storeItems.get({
                    itemId: $routeParams.itemId
                }, function(item) {
                    $scope.mainImageUrl = item.images[0];
                });
                $scope.setMainImage = function(imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                };
            }
        ]);

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
	angular.module('myBandAppServices', ['ngResource']);
}());
;(function() {
    'use strict';
    angular.module('myBandAppServices')
        .factory('BlogPostsDataService', [
            '$resource',
            function(
                $resource
            ) {
                var posts = {
                    title: 'News',
                    blogPosts: $resource('data/json/posts/:postId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                postId: 'blog-posts'
                            },
                            isArray: true
                        }
                    }),
                    upVote: function(post) {
                        post.upVotes += 1;
                    },
                    comments: [{
                            userName: 'Adela',
                            content: 'This is an amazing post!',
                            upVotes: 2
                        }, {
                            userName: 'Daniel',
                            content: 'This website sucks!',
                            upVotes: 10
                        }, {
                            userName: 'Oliver',
                            content: 'This is so cool!',
                            upVotes: 3
                        }

                    ]
                };
                return posts;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices')
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
;(function() {
    'use strict';
    angular.module('myBandAppServices')
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
                    }),
                    getYears: function() {
                        var today = new Date();
                        var year = today.getFullYear();
                        var years = [];
                        for (var i = year; i < year + 50; i++) {
                            years.push(i);
                        }
                        return years;
                    },
                    getMonths: function() {
                        var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                        var months = numberArray.map(function(month) {
                            if (month < 10) {
                                return '0' + month;
                            } else {
                                return month.toString();
                            }
                        });
                        return months;

                    }
                };
                return gigs;
            }
        ]);
}());
;(function(){
	'use strict';
	angular.module('myBandAppServices')
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
	angular.module('myBandAppServices')
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
	angular.module('myBandAppServices')
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
                    sortByCategories: ['popular', 'price'],
                    sortByCategory: 'price'
                };
                return store;
            }
        ]);
}());
;(function() {
    'use strict';
    angular.module('myBandAppServices')
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
	angular.module('myBandAppDirectives', []);
}());
;(function(){
	'use strict';
	angular.module('myBandAppDirectives')
    .directive('makeMap', function() {
        var mapDirective = {
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
                        // if (angular.isDefined(!$scope.map.width)) {
                            var width = 200;
                        } else {
                            width = $scope.map.width;
                        }
                        if (!$scope.map.height) {
                        // if (angular.isDefined(!$scope.map.height)) {
                            var height = 200;
                        } else {
                            height = $scope.map.height;
                        }
                        return width + 'x' + height;
                    };
                    $scope.returnAddressOrNot = function() {
                        console.log("address: " + $scope.map.address);
                        if (!$scope.map.address)
                        // if (angular.isDefined(!$scope.map.address))
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
        return mapDirective;
    });
}());
// http://stackoverflow.com/questions/20432127/angularjs-interpolation-error
// ;(function() {
//     'use strict';
//     angular.module('myBandAppDirectives')
//         .directive('photoSlider', ['$timeout',
//             function($timeout) {
//                 return {
//                     restrict: 'AE',
//                     replace: true,
//                     templateUrl: 'templates/directives/testimonials.html',
//                     scope: {
//                         images: '='
//                     },
//                     link: function(scope, elem, attrs) {
//                         scope.currentIndex = 0;
//                         scope.next = function() {
//                             if (scope.currentIndex < scope.images.length - 1) {
//                                 scope.currentIndex++;
//                             } else {
//                                 scope.currentIndex = 0;
//                             }
//                         };
//                         scope.prev = function() {
//                             if (scope.currentIndex > 0) {
//                                 scope.currentIndex--;
//                             } else {
//                                 scope.currentIndex = scope.images.length - 1;
//                             }
//                         };
//                         scope.$watch('currentIndex', function() {
//                             scope.images.forEach(function(image) {
//                                 image.visible = false;
//                             });
//                             scope.images[scope.currentIndex].visible = true;
//                         });

//                         var timer;
//                         var sliderFunc = function() {
//                             timer = $timeout(function() {
//                                 scope.next();
//                                 timer = $timeout(sliderFunc, 5000);
//                             }, 5000);
//                         };
//                         sliderFunc();
//                         scope.$on('$destroy', function() {
//                             $timeout.cancel(timer);
//                         });
//                     },

//                 };
//             }
//         ]);
// }());
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