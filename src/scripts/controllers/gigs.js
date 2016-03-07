;
(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('GigsController', [
            '$scope',
            'GigsDataService',
            'GuestsDataService',
            // 'CallToActionDataService',
            function(
                $scope,
                GigsDataService,
                GuestsDataService
                // CallToActionDataService
            ) {
                $scope.title = 'GIGS';
                $scope.actions = GigsDataService.actions;
                $scope.warning = 'Please fill all the required information and follow displayed patterns.';
                $scope.subtitles = GigsDataService.subtitles;
                $scope.maps = GigsDataService.maps.query();
                $scope.getYears = GigsDataService.getYears();
                $scope.initYear = $scope.getYears[0];
                $scope.getMonths = GigsDataService.getMonths();
                $scope.initMonth = $scope.getMonths[0];
                $scope.guests = [];
                $scope.initName = 'Name Surname';
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
                $scope.removeGuest = function(guest) {
                    var selecetedGuest = $scope.guests.indexOf(guest);
                    $scope.guests.splice(selecetedGuest, 1);
                };
                $scope.submitted = false;
                $scope.buyStuff = function(buyStuff) {
                    if (buyStuff.$valid) {
                        $scope.submitted = true;
                    } else {
                        alert("Please check your form for mistakes.");
                        $scope.submitted = true;
                    }
                };
                $scope.rangeBase = 0;
                $scope.setHonorarium = function() {
                    return $scope.rangeBase;
                };
                // $scope.setHonorariumTwo = function() {
                //     this.__defineGetter__($scope.rangeBase, function() {
                //         return $scope.rangeBase;    
                //     });
                //     this.__defineSetter__($scope.rangeBase, function() {
                //         return $scope.rangeBase;
                //     });
                // };


            }
        ]);
}());