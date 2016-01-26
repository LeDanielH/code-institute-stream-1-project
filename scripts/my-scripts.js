
//	var stickyNav = $('nav.main-navigation').offset().top;
//	$(window).scroll(function() {
//		if ($(window).scrollTop() > stickyNav) {
//			$('nav.main-navigation').addClass('main-navigation-fixed');
//			$('.sticky-alias').css('display', 'block');
//		} else {
//			$('nav.main-navigation').removeClass('main-navigation-fixed');
//			$('.sticky-alias').css('display', 'none');
//		}
//	});
//	// if ($(document).width() < 1116) {
//		$('#menu').on('click', function() {
//			$('.menu-item').toggle(300).css('display', 'flex');
//			$('#nav-down').toggle(300).css('display', 'flex');
//			$('#nav-up').toggle(300).css('display', 'flex');
//		});
//	// } else if ($(document).width() > 1116) {
//	// 	$('a.menu-item').removeAttr('style');
//	// 	$('#nav-down').removeAttr('style');		
//	// 	$('#nav-up').removeAttr('style');
//	// }
//});

// $(".menu-icon").click(function(){
// 	$("#navigation").toggle(500);
// 	($(".menu-icon span").text() === "MENU") ? $(".menu-icon span").text("HIDE") : $(".menu-icon span").text("MENU");
// });

// mobile menu
$(function() {
    $('.main-navigation').on('click', '.menu-item:first-child', function(e) {
        e.preventDefault();
        if ($(this).nextAll().slice(0, 7).is('.menu-item')) {
            $(this).nextAll().slice(0, 7).removeClass('menu-item').addClass('menu-item-mobile');
            $('#nav-down').css('display', 'none');
            $('#nav-up').css('display', 'flex');
        } else {
            $(this).nextAll().slice(0, 7).removeClass('menu-item-mobile').addClass('menu-item');
            $('#nav-down').css('display', 'flex');
            $('#nav-up').css('display', 'none');
        }
    });
});

//slider
// $(function() {
// 	$('.main-header').on('click', '.icon-circle-right', function() {
// 		$('.band-cover').addClass('slided');
// 	});
// });

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
            var $buttonLeft = $('.icon-circle-left');
            var $buttonRight = $('.icon-circle-right');
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









