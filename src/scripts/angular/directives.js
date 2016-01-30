angular.module('myBandAppDirectives', [])
    .directive('makeMap', function() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'templates/directives/maps.html',
            scope: {
                map: '='
            },
            link: function(scope, element, attrs) {
                console.log('in map directive link');
            },
            controller: ['$scope',
                function mapController($scope) {

                    $scope.$watch('map', function() {
                        console.log("map directive controller watching map change", $scope.map);
                    });

                    $scope.zoomIn = function() {
                        $scope.map.zoom++;
                    };
                    $scope.zoomOut = function() {
                        $scope.map.zoom--;
                    };
                    $scope.mapDimensions = function() {
                        if (!$scope.map.width) {
                            var width = 200;
                        } else {
                            width = $scope.map.width;
                        }
                        if (!$scope.map.height) {
                            var height = 200;
                        } else {
                            height = $scope.map.height;
                        }
                        return width + 'x' + height;
                    };
                    $scope.returnAddressOrNot = function() {
                        console.log("address: " + $scope.map.address);
                        if ($scope.map.address)
                            return true;
                        else
                            return false;
                    };
                }
            ]
        };
        return directive;
    });
// .directive('StoreItemsDirective', function() {
// 	return {
// 		templateUrl: 'directives/store-items.html',
// 		restrict: 'AE'
// 	};
// });