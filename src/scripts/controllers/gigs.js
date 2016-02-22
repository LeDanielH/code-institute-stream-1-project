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
                $scope.guests = GuestsDataService.guests;
                $scope.ticketPrice = GuestsDataService.ticketPrice;
                $scope.addGuest = function() {
                    if (!$scope.guestsName || $scope.guestsName === '') {
                        return;
                    }
                    $scope.guests.push({
                        guestsName: $scope.guestsName
                    });
                };
            }
        ]);
}());