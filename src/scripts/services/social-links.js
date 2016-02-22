;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('SocialLinksDataService', [
        '$resource',
        function(
            $resource
            ) {
                var socialLinks = {
                    title: 'follow us!',
                    socialIcons: $resource('data/:itemId.json', {}, {
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