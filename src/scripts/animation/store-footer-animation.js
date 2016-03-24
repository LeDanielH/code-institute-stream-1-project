// ;(function () {
// 	'use strict';
// 	angular.module('myBandAppAnimations')
// 		.animation('.store-items-slider-animation', function() {
// 			return {
// 				addClass: function(element, className, done) {
// 					var scope = element.scope();
// 					var itemWidth = angular.element(document.querySelectorAll(".slider-viewer"))[0].getBoundingClientRect().width;
// 					if (className === 'ng-hide') {
// 						var finishPoint = itemWidth;
// 						if (scope.direction !=='right') {
// 							finishPoint = -finishPoint;
// 						}
// 						TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
// 					} else {
// 						done();
// 					}
// 				},
// 				removeClass: function(element, className, done) {
// 					var scope = element.scope();
// 					var itemWidth = angular.element(document.querySelectorAll(".slider-viewer"))[0].getBoundingClientRect().width;
// 					if (className === 'ng-hide') {
// 						element.removeClass('ng-hide');
// 						var startPoint = itemWidth;
// 						if (scope.direction === 'right') {
// 							startPoint = -startPoint;
// 						}
// 						TweenMax.set(element, {left: startPoint});
// 						TweenMax.to(element, 0.5, {left: 0, onComplete: done});
// 					} else {
// 						done();
// 					}
// 				}
// 			};
// 		});
// }());