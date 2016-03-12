;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('FamousQuotesDataService', [
			'$resource',
			function ($resource) {
				var f = {
					quotes: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'fquotes'
							},
							isArray: true
						}
					})
				};
				return f;
			}
		]);
}());