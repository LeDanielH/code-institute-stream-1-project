;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('GigsDataService', [
            // '$rootScope',
            '$resource',
            function (
				// $rootScope,
				$resource
            ) {
				var gigs = {
					title: 'gigs',
					locationTitle: 'where',
					timeTitle: 'when',
					maps: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'gigs'
							},
							isArray: true
						}
					}),
				};
				return gigs;
            }
        ]);
}());