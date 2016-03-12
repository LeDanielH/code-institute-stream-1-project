;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('SocialLinksDataService', [
        '$resource',
        function (
				$resource
            ) {
				var socialLinks = {
					title: 'follow us!',
					socialIcons: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'social-links'
							},
							isArray: true
						}
					})
				};
				return socialLinks;
            }
        ]);
}());