;(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('GigsController', [
            '$scope',
            'GigsDataService',
            'GuestsDataService',
            function(
                $scope,
                GigsDataService,
                GuestsDataService
            ) {
                $scope.title = 'GIGS';
                $scope.subtitles = GigsDataService.subtitles;
                $scope.maps = GigsDataService.maps.query();
                $scope.getYears = GigsDataService.getYears();
                $scope.getMonths = GigsDataService.getMonths();
                $scope.guests = [];
                $scope.ticketPrice = GuestsDataService.ticketPrice;
                $scope.addGuest = function() {
                    if (!$scope.name || $scope.name === '') {
                        return;
                    }
                    $scope.guests.push({
                        name: $scope.name
                    });
                    $scope.name = '';

                };
            }
        ]);
}());