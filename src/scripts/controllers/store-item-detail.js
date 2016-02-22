;(function(){
	'use strict';
	angular.module('myBandAppControllers')
		.controller('StoreItemDetailController', [
        '$scope',
        // '$http',
        '$routeParams', 
        function(
            $scope,
            // $http,
            $routeParams
            ) {
                // $http.get('data/store-items/' + $routeParams + '.json')
                //     .success(function(data) {
                //         $scope.item = data;
                //         $scope.mainImageUrl = data.images[0];
                //     });
                $scope.item = StoreDataService.get({itemId: $routeParams.itemId}, function(item) {
                    $scope.mainImageUrl = item.images[0];
                });
                $scope.setMainImage = function(imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                };
            }]);

}());
