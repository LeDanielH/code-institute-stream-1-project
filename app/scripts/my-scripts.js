//// sticky nav
//$(function() {
//    var stickyNav = $('nav.main-navigation').offset().top;
//    $(window).scroll(function() {
//        if ($(window).scrollTop() > stickyNav) {
//            $('nav.main-navigation').addClass('main-navigation-fixed');
//            $('.sticky-alias').css('display', 'block');
//        } else {
//            $('nav.main-navigation').removeClass('main-navigation-fixed');
//            $('.sticky-alias').css('display', 'none');
//        }
//    });
//});
//
//// mobile menu
//$(function() {
//    $('.main-navigation').on('click', '.menu-item:first-child', function(e) {
//        e.preventDefault();
//        if ($(this).nextAll().slice(0, 7).is('.menu-item')) {
//            $(this).nextAll().slice(0, 7).removeClass('menu-item').addClass('menu-item-mobile');
//            $('#nav-down').css('display', 'none');
//            $('#nav-up').css('display', 'block');
//        } else {
//            $(this).nextAll().slice(0, 7).removeClass('menu-item-mobile').addClass('menu-item');
//            $('#nav-down').css('display', 'block');
//            $('#nav-up').css('display', 'none');
//        }
//    });
//});

//// slider
//$(function() {
//    $('.slider').each(function() {
//        var $this = $(this);
//        var $slidersGroup = $this.find('.slide-viewer');
//        var $slide = $this.find('.slide');
//        var buttonArray = [];
//        var currentIndex = 0;
//        var timeout;
//
//        function move(newIndex) {
//            var animateLeft, slideLeft;
//            slideSlider();
//            if ($slidersGroup.is('animated') || currentIndex === newIndex) {
//                return;
//            }
//            if (newIndex > currentIndex) {
//                slideLeft = '100%';
//                animateLeft = '-100%';
//            } else {
//                slideLeft = '-100%';
//                animateLeft = '100%';
//            }
//
//            $slide.eq(newIndex).css({
//                left: slideLeft,
//                display: 'block'
//            });
//
//            $slidersGroup.animate({
//                left: animateLeft
//            }, function() {
//                $slide.eq(currentIndex).css({
//                    display: 'none'
//                });
//                $slide.eq(newIndex).css({
//                    left: 0
//                });
//                $slidersGroup.css({
//                    left: 0
//                });
//                currentIndex = newIndex;
//            });
//        }
//
//        function slideSlider() {
//            clearTimeout(timeout);
//            timeout = setTimeout(function() {
//                if (currentIndex < ($slide.length - 1)) {
//                    move(currentIndex + 1);
//                } else {
//                    move(0);
//                }
//            }, 4000);
//        }
//
//        $.each($slide, function() {
//            var $buttonLeft = $('.slider .icon-circle-left');
//            var $buttonRight = $('.slider .icon-circle-right');
//            $buttonRight.on('click', function() {
//                if (currentIndex < $slide.length - 1) {
//                    move(currentIndex + 1);
//                } else {
//                    move(0);
//                }
//            });
//
//            $buttonLeft.on('click', function() {
//                if (currentIndex > 0) {
//                    move(currentIndex - 1);
//                } else {
//                    move(0);
//                }
//            });
//            slideSlider();
//        });
//    });
//});
//
//$(function() {
//    $('div.add-person').on('click', '#addPersonButton', function(e) {
//        e.preventDefault();
//        var newPerson = $('input:text').val();
//        if (newPerson.length > 0) {
//            $('div.add-person').append('<strong>' + newPerson + '</strong>');
//        } 
//    });
//});
angular.module('bandApp', [
		'ngRoute',
		'myBandAppAnimations',
		'myBandAppControllers',
		'myBandAppFilters',
		'myBandAppDirectives',
		'myBandAppServices',
		// 'templates'
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
angular.module('myBandAppControllers', ['myBandAppServices'])
    .controller('IndexController', [
        '$scope',
        '$location',
        // '$http',
        'GigsDataService',
        'StoreDataService',
        'TestimonialsDataService',
        'SocialLinksDataService',
        'callToActionDataService',
        function(
            $scope, 
            $location,
            // $http,
            GigsDataService, 
            StoreDataService, 
            TestimonialsDataService, 
            SocialLinksDataService, 
            callToActionDataService
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
                $scope.go = callToActionDataService.go;
                $scope.callToActionBoxes = callToActionDataService.callToActionBoxes.query();
            }
        ])
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
        ])
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
                $scope.map = $scope.maps[0];
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
        ])
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
        ])
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
// var suckData = function(itemId) {
//     $resource('data/:itemId.json', {}, {
//         query: {
//             method: 'GET',
//             params: {
//                 itemId: itemId
//             },
//             isArray: true
//         }
//     });
// };
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
                    maps: $resource('data/:itemId.json', {}, {
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
        ])
    .factory('GuestsDataService', [
        function() {
            var people = {
                guests: [{}],
                ticketPrice: 20
            };
            return people;
        }
    ])
    .factory('StoreDataService', [
        '$resource',
        function(
            $resource
            ) {
                var store = {
                    storeItems: $resource('data/store-items/:itemId.json', {}, {
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
        ])
    .factory('TestimonialsDataService', [
        '$resource',
        function(
            $resource
            ) {
                var testimonials = {
                    images: $resource('data/:itemId.json', {}, {
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
        ])
    .factory('SocialLinksDataService', [
        '$resource',
        function(
            $resource
            ) {
                var socialLinks = {
                    title: 'follow us!',
                    socialIcons: $resource('data/:itemId.json', {}, {
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
        ])
    .factory('callToActionDataService', [
        '$resource',
        function($resource) {
            var calls = {
                go: function(path) {
                    $location.path(path);
                },
                callToActionBoxes: $resource('data/:itemId.json', {}, {
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
    ])
    .factory('BlogPostsDataService', [
        '$resource',
        function(
            $resource
            ) {
                var posts = {
                    title: 'News',
                    blogPosts: $resource('data/:itemId.json', {}, {
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
        ])
    ;
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
    // .directive('photoSlider', function(){
    //     var photoSliderDirective = {
    //         restrict: 'EA',
    //         templateUrl: 'templates/directives/photo-slider.html',
    //         scope: {
    //             image: '='
    //         },
    //     };
    //     return photoSliderDirective;
    // });

    // .directive('photoSlider', [ '$timeout', function($timeout) {
    //         return {
    //             restrict: 'AE',
    //             replace: true,
    //             templateUrl: 'templates/directives/photo-slider.html',
    //             scope: {
    //                 images: '='
    //             },
    //             link: function(scope, elem, attrs) {
    //                 scope.currentIndex = 0;
    //                 scope.next = function() {
    //                     if (scope.currentIndex < scope.images.length - 1) {
    //                         scope.currentIndex++;
    //                     } else {
    //                         scope.currentIndex = 0;
    //                     }
    //                 };
    //                 scope.prev = function() {
    //                     if (scope.currentIndex > 0) {
    //                         scope.currentIndex--;
    //                     } else {
    //                         scope.currentIndex = scope.images.length - 1;
    //                     }
    //                 };
    //                 scope.$watch('currentIndex', function() {
    //                     scope.images.forEach(function(image) {
    //                         image.visible = false;
    //                     });
    //                     scope.images[scope.currentIndex].visible = true;
    //                 });
    
    //                 var timer;
    //                 var sliderFunc = function() {
    //                     timer = $timeout(function() {
    //                         scope.next();
    //                         timer = $timeout(sliderFunc, 5000);
    //                     }, 5000);
    //                 };
    //                 sliderFunc();
    //                 scope.$on('$destroy', function() {
    //                     $timeout.cancel(timer);
    //                 });
    //             },

    //         };
    //     }]);
angular.module('myBandAppAnimations',['ngAnimate']);
////no-js
//var elDocument = document.documentElement;
//elDocument.className=elDocument.className.replace(/(^|\s)no-js(\s|$)/, '$1');
//
////copyright-date
//var today = new Date();
//var year = today.getFullYear();
//var hourNow = today.getHours();
//var greeting;
//
//(function updateGreeting() {
//	if (hourNow > 18) {
//		greeting = 'Good evening stranger!';
//	} else if (hourNow > 12) {
//		greeting = 'Good afternoon stranger!';
//	} else if (hourNow > 0) {
//		greeting = 'Good morning stranger!';
//	} else {
//		greeting = 'Welcome stranger!';
//	}
//	var enterGreeting = document.getElementById('greeting');
//	enterGreeting.textContent = greeting;
//})();
//
//(function updateCopyrightYear() {
//	var enterYear = document.getElementById('copyYear');
//	enterYear.innerHTML = "&copy;" + " Monkees " + year;
//})();