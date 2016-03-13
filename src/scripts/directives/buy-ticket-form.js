;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('buyTicketForm', function () {
			return {
				restrict: 'EA',
				scope: {
					map: '='
				},
				link: function (scope, element, attrs) {
					console.log('in map directive link');
				},
				templateUrl: 'templates/directives/gigs-directives/buy-ticket-form.html'
			};
		});
}());
// http://stackoverflow.com/questions/20432127/angularjs-interpolation-error