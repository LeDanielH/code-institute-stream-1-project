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
				.otherwise({
					redirectTo: '/home'
				});
        }
    ]);
;(function() {
	'use strict';
	angular.module('myBandAppControllers', ['myBandAppServices'])
		.controller('IndexController', [
			'$scope',
			'$location',
			'$interval',
			'IndexDataService',
			'GigsDataService',
			'StoreDataService',
			'TestimonialsDataService',
			'SocialLinksDataService',
			'CallToActionDataService',
			'FamousQuotesDataService',
			function(
				$scope,
				$location,
				$interval,
				IndexDataService,
				GigsDataService,
				StoreDataService,
				TestimonialsDataService,
				SocialLinksDataService,
				CallToActionDataService,
				FamousQuotesDataService
			) {
				// $scope.getDocumentWidth = window.matchMedia(width);
				//NAVBAR

				$scope.navlinks = IndexDataService.nav.query();
				$scope.mobileIcon = {name: "menu",};

				//GIGS
				$scope.subtitles = GigsDataService.subtitles;
				$scope.maps = GigsDataService.maps.query();
				
				//STORE ITEMS FOOTER
				$scope.storeItems = StoreDataService.storeItems.query();
				$scope.sortByCategory = StoreDataService.sortByCategory;
				$scope.sortByCategories = StoreDataService.sortByCategories;

				//TESTIMONIALS
				$scope.images = TestimonialsDataService.images.query();
				
				//SOCIAL LINKS
				$scope.socialLinkstitle = SocialLinksDataService.title;
				$scope.socialIcons = SocialLinksDataService.socialIcons.query();

				//BUTTON BOXES
				$scope.go = CallToActionDataService.go;
				$scope.callToActionBoxes = CallToActionDataService.callToActionBoxes.query();

				//LEFT SIDEBAR FAMOUS QUOTES
				$scope.fQuotes = FamousQuotesDataService.quotes.query();
				$scope.randomQuotes = $scope.fQuotes[Math.floor(Math.random() * $scope.fQuotes.length)];


			}
		]);

}());
;(function () {
	'use strict';
	angular.module('myBandAppControllers')
		.controller('BlogPostDetailController', [
            '$scope',
            'BlogPostsDataService',
            'FormsDataService',
            '$routeParams',
            function (
				$scope,
				BlogPostsDataService,
				FormsDataService,
				$routeParams
            ) {
				$scope.post = BlogPostsDataService.blogPosts.get({
					postId: $routeParams.postId
				}, function (post) {
					$scope.mainImageUrl = post.images[0];
				});
				$scope.setMainImage = function (imageUrl) {
					$scope.mainImageUrl = imageUrl;
				};
				$scope.dateTime = FormsDataService.getDateTime();
				$scope.formsData = FormsDataService.formsData.query();
				$scope.addComment = function () {
					if (!$scope.content || $scope.content === '') {
						return;
					}
					$scope.post.comments.push({
						userName: $scope.userName,
						content: $scope.content,
						upVotes: 0,
						dateTime: $scope.dateTime
					});
					$scope.userName = '';
					$scope.content = '';
					$scope.dateTime = '';
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
            'FormsDataService',
            function(
                $scope,
                GigsDataService,
                FormsDataService
            ) {
                $scope.title = GigsDataService.title;
                $scope.maps = [];
                $scope.map = null;
                function load(maps){
                    $scope.maps = maps;
                    $scope.map = maps[0];
                }
                GigsDataService.maps.query().$promise.then(load);

                // UNIVERSAL VALUES FOR FORMS
                $scope.formHeaders = FormsDataService.formHeaders;
                $scope.introWarning = FormsDataService.introWarning;
                $scope.formsData = FormsDataService.formsData.query();
                $scope.patterns = FormsDataService.patterns;

                // GET DATES FOR DROPDOWN
                $scope.getYears = FormsDataService.getYears();
                $scope.getMonths = FormsDataService.getMonths();
                
                // BUY TICKET FORM - TAB 1 - VALUES TO SUBMIT
                $scope.companions = [];
                $scope.addCompanion = function() {
                    if (!$scope.companion || $scope.companion === '') {
                        return;
                    }
                    $scope.companions.push($scope.companion);
                    $scope.companion = '';
                };
                $scope.removeCompanion = function(companion) {
                    var selectedCompanion = $scope.companions.indexOf(companion);
                    $scope.companions.splice(selectedCompanion, 1);
                };
                $scope.finalPrice = function(ticketPrice, companions) {
                    return ticketPrice + (ticketPrice * companions);
                };
                $scope.guest = [];
                $scope.submitGuest = function(buyTicket) {
                    if ($scope.buyTicketForm.$valid) {
                        $scope.guest.push({
                            location: $scope.map,
                            name: $scope.buyTicket.name,
                            email: $scope.buyTicket.email,
                            companions: $scope.companions,
                            finalPrice: $scope.finalPrice,
                            card: {
                                name: $scope.card.name,
                                number: $scope.card.email,
                                cvv: $scope.card.cvv,
                                month: $scope.card.month,
                                year: $scope.card.year
                            },
                            billingAddress: {
                                street: $scope.billingAddress.street,
                                city: $scope.billingAddress.city,
                                postCode: $scope.billingAddress.postCode,
                                country: $scope.billingAddress.country
                            }
                        });
                        alert('Go to your email to see your purchase confirmation.');
                    } else {
                        alert('You\'ve made a mistake somewhere, please check your form again.');
                    }
                };
                $scope.request = [];
                $scope.submitRequest = function() {
                    if ($scope.bookUsForm.$valid) {
                        $scope.request.push({
                            name: $scope.bookUs.name,
                            email: $scope.bookUs.email,
                            gigType: $scope.gigType,
                            gigAddress: {
                                street: $scope.gigAddress.street,
                                city: $scope.gigAddress.city,
                                postCode: $scope.gigAddress.postCode,
                                country: $scope.gigAddress.country
                            },
                            moreInfo: $scope.moreInfo,
                            setHonorarium: $scope.honorarium
                        });
                        alert('Please check your email for request confirmation.');
                    } else {
                        alert('You\'ve made a mistake somewhere, please check your form again.');
                    }
                };

                // BOOK US FORM - TAB 2
                $scope.honorarium = 0;
                $scope.setHonorarium = function() {
                    return $scope.honorarium;
                };

                

                // $scope.setHonorariumTwo = function() {
                //     this.__defineGetter__($scope.rangeBase, function() {
                //         return $scope.rangeBase;    
                //     });
                //     this.__defineSetter__($scope.rangeBase, function() {
                //         return $scope.rangeBase;
                //     });
                // };

                
            }
        ]);
}());
;(function () {
	'use strict';

	angular.module('myBandAppControllers')
		.controller('HomeController', [
            '$scope',
            'BlogPostsDataService',
            function (
				$scope,
				BlogPostsDataService
            ) {
				$scope.title = BlogPostsDataService.title;
				$scope.blogPosts = BlogPostsDataService.blogPosts.query();
            }
        ]);
}());
//;(function() {
//    'use strict';
//    angular.module('myBandAppControllers')
//        .controller('SignUpController', [
//            '$scope',
//            function(
//                $scope
//            ) {
//
//                $scope.register = {};
//                $scope.submitted = false;
//                $scope.uniqueusername = true;
//                $scope.uniqueemail = true;
//
//
//                $scope.signUpForm = function(signUpForm) {
//                    if (signUpForm.$valid) {
//                        $scope.submitted = true;
//                        $scope.uniqueusername = false;
//                        $scope.uniqueemail = true;
//                        if ($scope.uniqueusername && $scope.uniqueemail) {
//                            // proceed to process form via backend service
//                        }
//                    } else {
//                        alert("Have you made a mistake somewhere? Please, check your details again.");
//                        $scope.submitted = true;
//                    }
//                };
//            }
//        ]);
//}());
;(function () {
	'use strict';
	angular.module('myBandAppControllers')
		.controller('StoreItemDetailController', [
            '$scope',
            'StoreDataService',
            '$routeParams',
            function (
				$scope,
				StoreDataService,
				$routeParams
            ) {
				$scope.item = StoreDataService.storeItems.get({
					itemId: $routeParams.itemId
				}, function (item) {
					$scope.mainImageUrl = item.images[0];
				});
				$scope.setMainImage = function (imageUrl) {
					$scope.mainImageUrl = imageUrl;
				};
            }
        ]);

}());
;(function () {
	'use strict';
	angular.module('myBandAppControllers')
		.controller('StoreController', [
        '$scope',
        'StoreDataService',
        function (
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

;(function () {
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
		.factory('IndexDataService', [
            '$resource',
            function (
				$resource
            ) {
				var navbar = {
					nav: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'navbar'
							},
							isArray: true
						}
					}),
				};
				return navbar;
            }
        ]);
}());
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('BlogPostsDataService', [
            '$resource',
            function (
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
					upVote: function (post) {
						post.upVotes += 1;
					}
				};
				return posts;
            }
        ]);
}());
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('CallToActionDataService', [
        '$resource',
        '$location',
        function ($resource, $location) {
			var calls = {
				go: function (path) {
					$location.path(path);
				},
				callToActionBoxes: $resource('data/json/:itemId.json', {}, {
					query: {
						method: 'GET',
						params: {
							itemId: 'calls-to-action'
						},
						isArray: false
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
        .factory('FormsDataService', [
            // '$rootScope',
            '$resource',
            function(
                // $rootScope,
                $resource
            ) {
                var f = {
                    formsData: $resource('data/json/forms/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'forms-data'
                            },
                            isArray: false
                        }
                    }),
                    patterns: {
                        email: "/^\b\w{1,30}\b(\.\b\w{1,30}\b)?@\b[a-zA-Z0-9]{1,30}\b\.\b[a-zA-Z]{1,10}\b(\.\b[a-zA-Z]{1,10}\b)?(\s)?$/",
                        card: "/^\b(\d{4}(\s|-)?){3}\d{4}\b(\s)?$/",
                        cvv: "/^\b\d{3}\b(\s{0,1})?$/",
                        name: "/^(\b[a-zA-Z]{1,20}\b\s{0,2}){2,4}$/",
                        street: "/^(\b[a-zA-Z]{1,20}\b\s){1,3}\b\d{1,5}\b(\/\b\d{1,5}\b)?(\s{0,2})$/",
                        city: "/^(\b[a-zA-Z]{1,20}\b\s{0,2}){1,3}$/",
                        postCode: "/^\b[a-zA-Z0-9]{2,12}\b$/",
                        username: "/^\b\w{2,30}\b$/"
                    },
                    getYears: function() {
                        var today = new Date();
                        var year = today.getFullYear();
                        var years = [];
                        var yearsSpan = 50;
                        for (var i = year; i < year + yearsSpan; i++) {
                            years.push(i);
                        }
                        return years;
                    },

                    getMonths: function() {
                        var generatedMonths = [];
                        for (var month = 1; month < 13; month++) {
                            generatedMonths.push(month);
                        }
                        return generatedMonths.map(function(month) {
                            if (month < 10) {
                                return '0' + month;
                            } else {
                                return month.toString();
                            }
                        });
                    },
                    getDateTime: function() {
                        var today = new Date();
                        var day = today.getDate();
                        var month = ('0' + (today.getMonth() + 1)).slice(-2);
                        var year = today.getFullYear();
                        var hour = ('0' + today.getHours()).slice(-2);
                        var minute = ('0' + today.getMinutes()).slice(-2);
                        var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
                        return dateTime;
                    }
                };
                return f;
            }
        ]);
}());
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('FamousQuotesDataService', [
			'$resource',
			function ($resource) {
				var f = {
					quotes: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'fquotes'
							},
							isArray: true
						}
					})
				};
				return f;
			}
		]);
}());
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('GigsDataService', [
            // '$rootScope',
            '$resource',
            function (
				// $rootScope,
				$resource
            ) {
				var gigs = {
					title: 'gigs',
					locationTitle: 'where',
					timeTitle: 'when',
					maps: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'gigs'
							},
							isArray: true
						}
					}),
				};
				return gigs;
            }
        ]);
}());
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('SocialLinksDataService', [
        '$resource',
        function (
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
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('StoreDataService', [
        '$resource',
        function (
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
;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('TestimonialsDataService', [
            '$resource',
            function (
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
;(function () {
	'use strict';
	angular.module('myBandAppDirectives', []);
}());
// ;(function () {
// 	'use strict';
// 	angular.module('myBandAppDirectives')
// 		.directive('formDirective', function() {
// 			var directive = {};
// 			directive.restrict = 'E';
// 			directive.template = '';
//  		});
// }());
;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('makeMap', function () {
			var mapDirective = {
				restrict: 'EA',
				templateUrl: 'templates/directives/maps.html',
				scope: {
					map: '='
				},
				link: function (scope, element, attrs) {
					console.log('in map directive link');
				},
				controller: ['$scope',
                function mapController($scope) {
                		/*
                		
                		GigsController
                			my-directive
                				{{map}}
                				<make-map>
                		
                		*/
                		

						$scope.$watch('map', function () {
							console.log("map directive controller watching map change", $scope.map);
						});

						$scope.zoomIn = function () {
							$scope.map.zoom++;
						};
						$scope.zoomOut = function () {
							$scope.map.zoom--;
						};
						$scope.mapDimensions = function () {
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
						$scope.returnAddressOrNot = function () {
							console.log("address: " + $scope.map.address);
							if (!$scope.map.address)
							// if (angular.isDefined(!$scope.map.address))
								return true;
							else
								return false;
						};
						$scope.mapAddress = function () {
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
;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('myDirective', function () {
			return {
				restrict: 'AE',
				templateUrl: function (ele, attrs) {
					return attrs.templatePath;
				}
			};
		});
}());

;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('testimonials', function($interval) {
			return {
				restrict: 'AE',
				replace: true,
				scope: {
					images: '=',
					delay: '=',
					startwith: '='
				},
				link: function(scope, elem, attrs) {
					console.log('>>elem:', elem);
					scope.direction = 'left';
					if(!angular.isNumber(scope.delay)){
						scope.delay = 5000;
					}
					if(angular.isNumber(scope.startwith)){
						scope.currentIndex = scope.startwith;
					} else {
						scope.currentIndex = 0;
					}
					scope.loopDelay = 5000;
					scope.loopCount = 12;
					scope.setCurrentSlideIndex = function(index) {
						scope.direction = (index > scope.currentIndex) ? 'left' : 'right';
						scope.currentIndex = index;
					};
					scope.isCurrentSlideIndex = function(index) {
						return scope.currentIndex === index;
					};

					scope.previous = function() {
						scope.direction = 'right';
						scope.currentIndex = (scope.currentIndex > 0) ? --scope.currentIndex : scope.images.length - 1;
					};
					scope.next = function() {
						scope.direction = 'left';
						scope.currentIndex = (scope.currentIndex < scope.images.length - 1) ? ++scope.currentIndex : 0;
					};
					// $interval(scope.next, scope.loopDelay, scope.loopCount);
					var promise;
					scope.loopSlider = function() {
						scope.stopSlider();
						promise = $interval(scope.next, scope.loopDelay, scope.loopCount);
					};

					scope.stopSlider = function() {
						$interval.cancel(promise);
					};

					scope.resetSlider = function() {
						$interval.cancel(promise);
						scope.loopSlider();
					};

					scope.loopSlider();
					scope.$on('$destroy', function() {
						$interval.cancel(promise);
					});
				},

				templateUrl: 'templates/directives/testimonials.html'
			};
		});
}());
;(function () {
	'use strict';
	angular.module('myBandAppFilters', []);
}());
;(function () {
	'use strict';
	angular.module('myBandAppFilters')
		.filter('StockFilter', function () {
			var trueMark = '\u2713';
			var falseMark = '\u2718';
			return function (stock) {
				if (stock > 0) {
					return trueMark;
				} else {
					return falseMark;
				}
			};
		});
}());
;(function () {
	'use strict';
	angular.module('myBandAppAnimations', []);
}());
;(function () {
	'use strict';
	angular.module('myBandAppAnimations')
		.animation('.store-items-slider-animation', function() {
			return {
				addClass: function(element, className, done) {
					var scope = element.scope();
					var itemWidth = angular.element(document.querySelectorAll(".slider-viewer"))[0].getBoundingClientRect().width;
					if (className === 'ng-hide') {
						var finishPoint = itemWidth;
						if (scope.direction !=='right') {
							finishPoint = -finishPoint;
						}
						TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
					} else {
						done();
					}
				},
				removeClass: function(element, className, done) {
					var scope = element.scope();
					var itemWidth = angular.element(document.querySelectorAll(".slider-viewer"))[0].getBoundingClientRect().width;
					if (className === 'ng-hide') {
						element.removeClass('ng-hide');
						var startPoint = itemWidth;
						if (scope.direction === 'right') {
							startPoint = -startPoint;
						}
						TweenMax.set(element, {left: startPoint});
						TweenMax.to(element, 0.5, {left: 0, onComplete: done});
					} else {
						done();
					}
				}
			};
		});
}());
;(function () {
	'use strict';
	angular.module('myBandAppAnimations')
		.animation('.testimonials-animation', function() {
			return {
				addClass: function(element, className, done) {
					var scope = element.scope();
					var parentWidth = angular.element(document.querySelectorAll(".slide-viewer"))[0].getBoundingClientRect().width;
					if (className === 'ng-hide') {
						var finishPoint = parentWidth;
						if (scope.direction !=='right') {
							finishPoint = -finishPoint;
						}
						TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
					} else {
						done();
					}
				},
				removeClass: function(element, className, done) {
					var scope = element.scope();
					var parentWidth = angular.element(document.querySelectorAll(".slide-viewer"))[0].getBoundingClientRect().width;
					if (className === 'ng-hide') {
						element.removeClass('ng-hide');
						var startPoint = parentWidth;
						if (scope.direction === 'right') {
							startPoint = -startPoint;
						}
						TweenMax.set(element, {left: startPoint});
						TweenMax.to(element, 0.5, {left: 0, onComplete: done});
					} else {
						done();
					}
				}
			};
		});
}());