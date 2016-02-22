;(function() {
    'use strict';
    angular.module('myBandAppServices', ['ngResource'])
        .factory('TestimonialsDataService', [
            '$resource',
            function(
                $resource
            ) {
                var testimonials = {
                    images: $resource('data/:itemId.json', {}, {
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