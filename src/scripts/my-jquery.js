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