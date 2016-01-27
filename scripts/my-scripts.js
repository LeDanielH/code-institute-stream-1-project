angular.module('bandApp', ['myBandAppControllers', 'myBandAppDirectives', 'myBandAppServices']);
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
    .controller('StoreController', ['$scope',
        function($scope) {
            var store = {
                items: [{
                    name: 'Item1',
                    price: 10,
                    stock: 0
                }, {
                    name: 'Item2',
                    price: 6,
                    stock: 0
                }, {
                    name: 'Item3',
                    price: 8,
                    stock: 0
                }, {
                    name: 'Item4',
                    price: 50,
                    stock: 3
                }, {
                    name: 'Item5',
                    price: 20,
                    stock: 2
                }],
                //, getSalePrice: function(minusNum) {
                // 	for(var i = 0; i < store.items.length; i++) {
                // 		return store.items[i].price - minusNum;
                // 	}
                // }
                itemsStock: function() {
                    var msg = '';
                    if (store.items.stock === 0) {
                        msg += 'Out of stock';
                        document.getElementById('stock').className(itemNotAvailable);
                    } else {
                        msg += 'In stock';
                        document.getElementById('stock').className(itemAvailable);
                    }
                }
            };
        }
    ]);
angular.module('myBandAppServices',[]);

angular.module('myBandAppDirectives',[]);
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

// mobile slider
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









