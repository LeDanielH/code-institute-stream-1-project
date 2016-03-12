;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('CallToActionDataService', [
        '$resource',
        function ($resource) {
				var calls = {
					go: function (path) {
						$location.path(path);
					},
					callToActionBoxes: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'calls-to-action'
							},
							isArray: false
						}
					})
				};
				return calls;
        }
    ]);
}());