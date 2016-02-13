angular.module('myBandAppDirectives', [])
    .directive('makeMap', function() {
        var mapDdirective = {
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
                    $scope.mapAddress = function() {
                        var street = $scope.map.address[0].street;
                        var city = $scope.map.address[0].city;
                        var country = $scope.map.address[0].country;
                        return street + ', ' + city + ', ' + country;
                    };
                }
            ]
        };
        return mapDdirective;
    });
    // .directive('photoSlider', function(){
    //     var photoSliderDirective = {
    //         restrict: 'EA',
    //         templateUrl: 'templates/directives/photo-slider.html',
    //         scope: {
    //             image: '='
    //         },
    //     };
    //     return photoSliderDirective;
    // });

    // .directive('photoSlider', [ '$timeout', function($timeout) {
    //         return {
    //             restrict: 'AE',
    //             replace: true,
    //             templateUrl: 'templates/directives/photo-slider.html',
    //             scope: {
    //                 images: '='
    //             },
    //             link: function(scope, elem, attrs) {
    //                 scope.currentIndex = 0;
    //                 scope.next = function() {
    //                     if (scope.currentIndex < scope.images.length - 1) {
    //                         scope.currentIndex++;
    //                     } else {
    //                         scope.currentIndex = 0;
    //                     }
    //                 };
    //                 scope.prev = function() {
    //                     if (scope.currentIndex > 0) {
    //                         scope.currentIndex--;
    //                     } else {
    //                         scope.currentIndex = scope.images.length - 1;
    //                     }
    //                 };
    //                 scope.$watch('currentIndex', function() {
    //                     scope.images.forEach(function(image) {
    //                         image.visible = false;
    //                     });
    //                     scope.images[scope.currentIndex].visible = true;
    //                 });
    
    //                 var timer;
    //                 var sliderFunc = function() {
    //                     timer = $timeout(function() {
    //                         scope.next();
    //                         timer = $timeout(sliderFunc, 5000);
    //                     }, 5000);
    //                 };
    //                 sliderFunc();
    //                 scope.$on('$destroy', function() {
    //                     $timeout.cancel(timer);
    //                 });
    //             },

    //         };
    //     }]);