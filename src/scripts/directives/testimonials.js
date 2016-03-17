;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('testimonials', function($timeout) {
			return {
				restrict: 'AE',
				replace: true,
				scope: {
					images: '='
				},
				link: function(scope, elem, attrs) {

					scope.currentIndex = 0;

					scope.next = function() {
						scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
					};

					scope.previous = function() {
						scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
					};

					scope.$watch('currentIndex', function() {
						scope.images.forEach(function(image) {
							image.visible = false;
						});
						scope.images[scope.currentIndex].visible = true;
					});

					/* Start: For Automatic slideshow*/

					var timer;

					var sliderFunc = function() {
						timer = $timeout(function() {
							scope.next();
							timer = $timeout(sliderFunc, 2000);
						}, 2000);
					};

					sliderFunc();

					scope.$on('$destroy', function() {
						$timeout.cancel(timer);
					});

					/* End : For Automatic slideshow*/

				},
				templateUrl: 'templates/directives/testimonials.html'
			};
		});
}());