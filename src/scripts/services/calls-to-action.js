;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('CallToActionDataService', [
        '$resource',
        function($resource) {
            var calls = {
                go: function(path) {
                    $location.path(path);
                },
                callToActionBoxes: $resource('data/:itemId.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                            itemId: 'calls-to-action'
                        },
                        isArray: true
                    }
                })
            };
            return calls;
        }
    ]);
}());