//no-js
var elDocument = document.documentElement;
elDocument.className=elDocument.className.replace(/(^|\s)no-js(\s|$)/, '$1');

//copyright-date
var today = new Date();
var year = today.getFullYear();
var enterYear = document.getElementById("copyYear");
enterYear.innerHTML = "&copy;" + " Monkees " + year;
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
	$('#menu').on('click', function() {
		$('.menu-item').toggle(300).css('display', 'flex');
	});
});

// $(".menu-icon").click(function(){
// 	$("#navigation").toggle(500);
// 	($(".menu-icon span").text() === "MENU") ? $(".menu-icon span").text("HIDE") : $(".menu-icon span").text("MENU");
// });






