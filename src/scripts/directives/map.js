;(function () {
	'use strict';
	angular.module('myBandAppDirectives')
		.directive('makeMap', function () {
			var mapDirective = {
				restrict: 'EA',
				templateUrl: 'templates/directives/maps.html',
				scope: {
					map: '='
				},
				link: function (scope, element, attrs) {
					console.log('in map directive link');
				},
				controller: ['$scope',
                function mapController($scope) {

						$scope.$watch('map', function () {
							console.log("map directive controller watching map change", $scope.map);
						});

						$scope.zoomIn = function () {
							$scope.map.zoom++;
						};
						$scope.zoomOut = function () {
							$scope.map.zoom--;
						};
						$scope.mapDimensions = function () {
							if (!$scope.map.width) {
								// if (angular.isDefined(!$scope.map.width)) {
								var width = 200;
							} else {
								width = $scope.map.width;
							}
							if (!$scope.map.height) {
								// if (angular.isDefined(!$scope.map.height)) {
								var height = 200;
							} else {
								height = $scope.map.height;
							}
							return width + 'x' + height;
						};
						$scope.returnAddressOrNot = function () {
							console.log("address: " + $scope.map.address);
							if (!$scope.map.address)
							// if (angular.isDefined(!$scope.map.address))
								return true;
							else
								return false;
						};
						$scope.mapAddress = function () {
							var street = $scope.map.address[0].street;
							var city = $scope.map.address[0].city;
							var country = $scope.map.address[0].country;
							return street + ', ' + city + ', ' + country;
						};
                }
            ]
			};
			return mapDirective;
		});
}());
// http://stackoverflow.com/questions/20432127/angularjs-interpolation-error