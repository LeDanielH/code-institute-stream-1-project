;(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('GigsController', [
            '$scope',
            'GigsDataService',
            'FormsDataService',
            function(
                $scope,
                GigsDataService,
                FormsDataService
            ) {
                $scope.title = GigsDataService.title;
                $scope.maps = [];
                $scope.map = null;
                function load(maps){
                    $scope.maps = maps;
                    $scope.map = maps[0];
                }
                GigsDataService.maps.query().$promise.then(load);

                // UNIVERSAL VALUES FOR FORMS
                $scope.formHeaders = FormsDataService.formHeaders;
                $scope.introWarning = FormsDataService.introWarning;
                $scope.formsData = FormsDataService.formsData.query();
                $scope.patterns = FormsDataService.patterns;

                // GET DATES FOR DROPDOWN
                $scope.getYears = FormsDataService.getYears();
                $scope.getMonths = FormsDataService.getMonths();
                
                // BUY TICKET FORM - TAB 1 - VALUES TO SUBMIT
                $scope.companions = [];
                $scope.addCompanion = function() {
                    if (!$scope.companion || $scope.companion === '') {
                        return;
                    }
                    $scope.companions.push($scope.companion);
                    $scope.companion = '';
                };
                $scope.removeCompanion = function(companion) {
                    var selectedCompanion = $scope.companions.indexOf(companion);
                    $scope.companions.splice(selectedCompanion, 1);
                };
                $scope.finalPrice = function(ticketPrice, companions) {
                    return ticketPrice + (ticketPrice * companions);
                };
                $scope.guest = [];
                $scope.submitGuest = function(buyTicket) {
                    if ($scope.buyTicketForm.$valid) {
                        $scope.guest.push({
                            location: $scope.map,
                            name: $scope.buyTicket.name,
                            email: $scope.buyTicket.email,
                            companions: $scope.companions,
                            finalPrice: $scope.finalPrice,
                            card: {
                                name: $scope.card.name,
                                number: $scope.card.email,
                                cvv: $scope.card.cvv,
                                month: $scope.card.month,
                                year: $scope.card.year
                            },
                            billingAddress: {
                                street: $scope.billingAddress.street,
                                city: $scope.billingAddress.city,
                                postCode: $scope.billingAddress.postCode,
                                country: $scope.billingAddress.country
                            }
                        });
                        alert('Go to your email to see your purchase confirmation.');
                    } else {
                        alert('You\'ve made a mistake somewhere, please check your form again.');
                    }
                };
                $scope.request = [];
                $scope.submitRequest = function() {
                    if ($scope.bookUsForm.$valid) {
                        $scope.request.push({
                            name: $scope.bookUs.name,
                            email: $scope.bookUs.email,
                            gigType: $scope.gigType,
                            gigAddress: {
                                street: $scope.gigAddress.street,
                                city: $scope.gigAddress.city,
                                postCode: $scope.gigAddress.postCode,
                                country: $scope.gigAddress.country
                            },
                            moreInfo: $scope.moreInfo,
                            setHonorarium: $scope.honorarium
                        });
                        alert('Please check your email for request confirmation.');
                    } else {
                        alert('You\'ve made a mistake somewhere, please check your form again.');
                    }
                };

                // BOOK US FORM - TAB 2
                $scope.honorarium = 0;
                $scope.setHonorarium = function() {
                    return $scope.honorarium;
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