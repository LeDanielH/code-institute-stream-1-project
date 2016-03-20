;(function () {
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
		.factory('IndexDataService', [
            '$resource',
            function (
				$resource
            ) {
				var navbar = {
					nav: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'navbar'
							},
							isArray: true
						}
					}),
				};
				return navbar;
            }
        ]);
}());