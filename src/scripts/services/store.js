;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('StoreDataService', [
        '$resource',
        function(
            $resource
            ) {
                var store = {
                    storeItems: $resource('data/json/store-items/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'store-items'
                            },
                            isArray: true
                        }
                    }),
                    sortByCategories: ['popular', 'best selling', 'price'],
                    sortByCategory: 'price'
                };
                return store;
            }
        ]);
}());