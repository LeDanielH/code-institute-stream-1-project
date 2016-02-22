;(function() {
	'use strict';
	angular.module('myBandAppControllers')
	.controller('StoreController', [
        '$scope',
        'StoreDataService', 
        function(
            $scope, 
            StoreDataService
            ) {
                // $http.get('data/store-items/store-items.json').success(function(data) {
                //     $scope.storeItemsList = data.splice(0, 5);
                // });
                $scope.storeItemsList = StoreDataService.storeItems.query();
                $scope.sortByCategory = StoreDataService.sortByCategory;
            }
        ]);
}());
