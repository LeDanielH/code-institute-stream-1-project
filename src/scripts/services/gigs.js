;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('GigsDataService', [
        '$rootScope', 
        '$resource',
        function(
            $rootScope, 
            $resource
            ) {
                var gigs = {
                    subtitles: ['where', 'when'],
                    maps: $resource('data/json/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'gigs'
                            },
                            isArray: true
                        }
                    })
                };
                return gigs;
            }
        ]);
}());