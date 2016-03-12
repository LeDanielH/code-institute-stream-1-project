;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('TestimonialsDataService', [
            '$resource',
            function (
				$resource
            ) {
				var testimonials = {
					images: $resource('data/json/:itemId.json', {}, {
						query: {
							method: 'GET',
							params: {
								itemId: 'testimonials'
							},
							isArray: true
						}
					})
				};
				return testimonials;
            }
        ]);
}());