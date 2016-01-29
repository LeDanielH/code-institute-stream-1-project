angular.module('bandApp', ['ngRoute', 'myBandAppControllers', 'myBandAppDirectives', 'myBandAppServices'])
	.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/home', {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
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
            var socialIcons = [
                'fa-facebook',
                'fa-twitter',
                'fa-instagram',
                'fa-youtube'
            ];
            $scope.socialIcons = socialIcons;
        }
    ])
    .controller('HomeController', ['$scope',
        function($scope) {
            $scope.title = 'THE NEWS';
        }
    ])
    .controller('GigsController', ['$scope',
        function($scope) {
            $scope.title = 'GIGS';
            $scope.maps = [{
                clubName: 'Club Matrix',
                date: '17/12/2016',
                time: '20:00',
                address: 'Tachovské nám. 7, 130 00 Praha 3, Czech Republic',
                shortAddress: 'Prague, Czech Republic',
                zoom: 16,
                width: 1000
                
            }, {
                clubName: 'Club Holdudvar',
                date: '30/12/2016',
                time: '21:00',
                address: 'Budapest, Margitsziget, 1138 Hungary',
                shortAddress: 'Budapest, Hungary',
                zoom: 16,
                width: 1000
            }, {

                clubName: 'The Twisted Pepper',
                date: '02/01/2017',
                time: '19:00',
                address: '54 Middle Abbey Street, Dublin, Dublin 1',
                shortAddress: 'Dublin, Ireland',
                zoom: 16,
                width: 1000
            }];
            $scope.map = $scope.maps[0];
        }
    ])
// .controller('BuyTicketController', ['$scope', function($scope) {
//     $cope.title = 'BUY A TICKET';
// }])
// .controller('BookUsController', ['$scope', function($scope) {
//     $cope.title = 'BOOK US NOW';
// }])
;
// .controller('StoreController', ['$scope',
//     function($scope) {
//         var store = {
//             items: [{
//                 name: 'Item1',
//                 price: 10,
//                 stock: 0
//             }, {
//                 name: 'Item2',
//                 price: 6,
//                 stock: 0
//             }, {
//                 name: 'Item3',
//                 price: 8,
//                 stock: 0
//             }, {
//                 name: 'Item4',
//                 price: 50,
//                 stock: 3
//             }, {
//                 name: 'Item5',
//                 price: 20,
//                 stock: 2
//             }],
//             //, getSalePrice: function(minusNum) {
//             // 	for(var i = 0; i < store.items.length; i++) {
//             // 		return store.items[i].price - minusNum;
//             // 	}
//             // }
//             itemsStock: function() {
//                 var msg = '';
//                 if (store.items.stock === 0) {
//                     msg += 'Out of stock';
//                     document.getElementById('stock').className(itemNotAvailable);
//                 } else {
//                     msg += 'In stock';
//                     document.getElementById('stock').className(itemAvailable);
//                 }
//             }
//         };
//     }
// ])
angular.module('myBandAppServices',[]);

angular.module('myBandAppDirectives', [])
    .directive('makeMap', function() {
        var directive = {
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
                            var height = 250;
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
                }
            ]
        };
        return directive;
    });
// .directive('StoreItemsDirective', function() {
// 	return {
// 		templateUrl: 'directives/store-items.html',
// 		restrict: 'AE'
// 	};
// });
// sticky nav
$(function() {
    var stickyNav = $('nav.main-navigation').offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() > stickyNav) {
            $('nav.main-navigation').addClass('main-navigation-fixed');
            $('.sticky-alias').css('display', 'block');
        } else {
            $('nav.main-navigation').removeClass('main-navigation-fixed');
            $('.sticky-alias').css('display', 'none');
        }
    });
});

// mobile menu
$(function() {
    $('.main-navigation').on('click', '.menu-item:first-child', function(e) {
        e.preventDefault();
        if ($(this).nextAll().slice(0, 7).is('.menu-item')) {
            $(this).nextAll().slice(0, 7).removeClass('menu-item').addClass('menu-item-mobile');
            $('#nav-down').css('display', 'none');
            $('#nav-up').css('display', 'block');
        } else {
            $(this).nextAll().slice(0, 7).removeClass('menu-item-mobile').addClass('menu-item');
            $('#nav-down').css('display', 'block');
            $('#nav-up').css('display', 'none');
        }
    });
});

// slider
$(function() {
    $('.slider').each(function() {
        var $this = $(this);
        var $slidersGroup = $this.find('.slide-viewer');
        var $slide = $this.find('.slide');
        var buttonArray = [];
        var currentIndex = 0;
        var timeout;

        function move(newIndex) {
            var animateLeft, slideLeft;
            slideSlider();
            if ($slidersGroup.is('animated') || currentIndex === newIndex) {
                return;
            }
            if (newIndex > currentIndex) {
                slideLeft = '100%';
                animateLeft = '-100%';
            } else {
                slideLeft = '-100%';
                animateLeft = '100%';
            }

            $slide.eq(newIndex).css({
                left: slideLeft,
                display: 'block'
            });

            $slidersGroup.animate({
                left: animateLeft
            }, function() {
                $slide.eq(currentIndex).css({
                    display: 'none'
                });
                $slide.eq(newIndex).css({
                    left: 0
                });
                $slidersGroup.css({
                    left: 0
                });
                currentIndex = newIndex;
            });
        }

        function slideSlider() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if (currentIndex < ($slide.length - 1)) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            }, 4000);
        }

        $.each($slide, function() {
            var $buttonLeft = $('.slider .icon-circle-left');
            var $buttonRight = $('.slider .icon-circle-right');
            $buttonRight.on('click', function() {
                if (currentIndex < $slide.length - 1) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            });

            $buttonLeft.on('click', function() {
                if (currentIndex > 0) {
                    move(currentIndex - 1);
                } else {
                    move(0);
                }
            });
            slideSlider();
        });
    });
});

$(function() {
    $('div.add-person').on('click', '#addPersonButton', function(e) {
        e.preventDefault();
        var newPerson = $('input:text').val();
        if (newPerson.length > 0) {
            $('div.add-person').append('<strong>' + newPerson + '</strong>');
        } 
    });
});
// tabs
// $(function() {
//     $('.tab-list').each(function() {
//         var $this = $(this);
//         var $tab = $this.find('h3.tab-active');
//         var $link = $tab.find('a');
//         var $panel = $($link.attr('href'));

//         $this.on('click', '.tab-control', function(e) {
//             e.preventDefault();
//             var $link = $(this);
//             var id = this.hash;
//             if (id && !$link.is('.tab-active')) {
//                 $panel.removeClass('tab-active');
//                 $tab.removeClass('tab-active');
//                 $panel = $(id).addClass('tab-active');
//                 $tab = $link.parent().addClass('tab-active');
//             }
//         });
//     });
// });

// tabs refills

// $(document).ready(function() {
//     $('.accordion-tabs').each(function(index) {
//         $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
//     });
//     $('.accordion-tabs').on('click', 'li > a.tab-link', function(event) {
//         if (!$(this).hasClass('is-active')) {
//             event.preventDefault();
//             var accordionTabs = $(this).closest('.accordion-tabs');
//             accordionTabs.find('.is-open').removeClass('is-open').hide();

//             $(this).next().toggleClass('is-open').toggle();
//             accordionTabs.find('.is-active').removeClass('is-active');
//             $(this).addClass('is-active');
//         } else {
//             event.preventDefault();
//         }
//     });
// });
////no-js
//var elDocument = document.documentElement;
//elDocument.className=elDocument.className.replace(/(^|\s)no-js(\s|$)/, '$1');
//
////copyright-date
var today = new Date();
var year = today.getFullYear();
var hourNow = today.getHours();
var greeting;

(function updateGreeting() {
    if (hourNow > 18) {
        greeting = 'Good evening stranger!';
    } else if (hourNow > 12) {
        greeting = 'Good afternoon stranger!';
    } else if (hourNow > 0) {
        greeting = 'Good morning stranger!';
    } else {
        greeting = 'Welcome stranger!';
    }
    var enterGreeting = document.getElementById('greeting');
    enterGreeting.textContent = greeting;
})();

(function updateCopyrightYear() {
    var enterYear = document.getElementById('copyYear');
    enterYear.innerHTML = "&copy;" + " Monkees " + year;
})();

