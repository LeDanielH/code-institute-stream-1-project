;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('testimonials', ['$interval', function($interval) {
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
		}]);
}());