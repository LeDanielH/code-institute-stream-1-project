;(function () {
	'use strict';
	angular.module('myBandAppControllers')
		.controller('StoreItemDetailController', [
            '$scope',
            'StoreDataService',
            '$routeParams',
            function (
				$scope,
				StoreDataService,
				$routeParams
            ) {
				$scope.item = StoreDataService.storeItems.get({
					itemId: $routeParams.itemId
				}, function (item) {
					$scope.mainImageUrl = item.images[0];
				});
				$scope.setMainImage = function (imageUrl) {
					$scope.mainImageUrl = imageUrl;
				};
            }
        ]);

}());