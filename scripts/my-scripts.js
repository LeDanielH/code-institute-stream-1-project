angular.module('bandApp', ['ngRoute', 'myBandAppControllers', 'myBandAppDirectives', 'myBandAppServices'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider) {
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
				.otherwise({redirectTo: '/home'});
		}]);
angular.module('myBandAppControllers', [])
    .controller('SocialIconsController', ['$scope',
        function($scope) {
            $scope.title = 'follow us!';
            $scope.socialIcons = [
                'facebook',
                'twitter',
                'instagram',
                'youtube'
            ];
        }
    ])
    .controller('GigsController', ['$scope',
        function($scope) {
            $scope.title = 'GIGS';
            $scope.subtitles = ['where', 'when'];
            $scope.maps = [{
                clubName: 'Club Matrix',
                date: '17/12/2016',
                time: '20:00',
                address: [{
                    street: 'Tachovské nám. 7',
                    city: 'Praha',
                    country: 'Czech Republic'
                }],
                zoom: 14,
                width: 400

            }, {
                clubName: 'Club Holdudvar',
                date: '30/12/2016',
                time: '21:00',
                address: [{
                    street: 'Margitsziget 1138',
                    city: 'Budapest',
                    country: 'Hungary'
                }],
                zoom: 14,
                width: 400
            }, {

                clubName: 'The Twisted Pepper',
                date: '02/01/2017',
                time: '19:00',
                address: [{
                    street: '54 Middle Abbey Street',
                    city: 'Dublin',
                    country: 'Ireland'
                }],
                zoom: 14,
                width: 400
            }];
            $scope.map = $scope.maps[0];
        }
    ])
    .controller('StoreItemsController', ['$scope',
        function($scope) {
            $scope.sortByCategories = ['popular', 'best selling', 'price'];
            $scope.storeItemsList = [{
                itemName: 'music album',
                price: 10,
                stock: 5
            }, {
                itemName: 'cup',
                price: 3,
                stock: 2
            }, {
                itemName: 'hat',
                price: 4,
                stock: 8
            }, {
                itemName: 'discography',
                price: 40,
                stock: 2
            }, {
                itemName: 'scarf',
                price: 10,
                stock: 0
            }, {
                itemName: 't-shirt',
                price: 20,
                stock: 10
            }, {
                itemName: 'gift coupon',
                price: 'choose value',
                stock: 100
            }, {
                itemName: 'dvd',
                price: 15,
                stock: 5
            }, {
                itemName: 'sticker',
                price: 2,
                stock: 100
            }, {
                itemName: 'usb',
                price: 8,
                stock: 20
            }];
            $scope.sortByCategory = $scope.sortByCategories[0];
            $scope.getSaleAll = function(percentOff) {
                for (var i = 0; i < $scope.storeItemsList.length; i++) {
                    return ($scope.storeItemsList[i].price / 100) * (100 - percentOff);
                }
            };
            $scope.getCategory = function() {

            };
            $scope.itemsStockMessage = function() {
                for (var i = 0; i < $scope.storeItemsList.length; i++) {
                    var message = '';
                    if ($scope.storeItemsList[i].stock === 0) {
                        return message += 'Out of stock';
                    } else {
                        return message += 'In stock';
                    }
                }
            };
        }
    ])
    .controller('PhotoSliderController', ['$scope',
        function($scope) {
            $scope.images = [{
                id: '1',
                quote: 'This was the best party ever!',
                cite: 'Elen from Vienna'
            }, {
                id: '2',
                quote: 'Unforgettable Experience!',
                cite: 'The Music Magazine'
            }, {
                id: '3',
                quote: 'Redefinition of the word "FUN"!',
                cite: 'WHY REST Magazine'
            }, {
                id: '4',
                quote: 'I felt in love on this party!',
                cite: 'Barbie from Georgia'
            }];

        }
    ])
    .controller('ButtonBoxController', ['$scope', '$location',
        function($scope, $location) {
            $scope.go = function(path) {
                $location.path(path);
            };
            $scope.buttonBox = [{
                bookTicket: [{
                    heading: 'wanna party?',
                    content: '',
                    button: 'join the party!'
                }],
                bookBand: [{
                    heading: 'want a party?',
                    content: '',
                    button: 'book us now!'
                }],
                signUp: [{
                    heading: '',
                    content: 'for exclusive members only content and prices',
                    button: 'sign up!'
                }]

            }];
        }
    ])
    .controller('BlogPostsController', ['$scope',
        function($scope) {
            $scope.title = 'news';
            $scope.blogPosts = [{
                heading: 'Blog post 1',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '01/02/2015'
            }, {
                heading: 'Blog post 2',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '24/12/2015'
            }, {
                heading: 'Blog post 3',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '08/02/2016'
            }];
        }
    ]);
angular.module('myBandAppServices',[]);

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