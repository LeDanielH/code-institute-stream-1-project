;(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('GigsController', [
            '$scope',
            'GigsDataService',
            'FormsDataService',
            // 'CallToActionDataService',
            function(
                $scope,
                GigsDataService,
                FormsDataService
                // CallToActionDataService
            ) {
                $scope.title = GigsDataService.title;
                $scope.maps = GigsDataService.maps.query();

                // UNIVERSAL VALUES FOR FORMS
                $scope.formHeaders = FormsDataService.formHeaders;
                $scope.introWarning = FormsDataService.introWarning;
                $scope.formsData = FormsDataService.formsData.query();
                $scope.patterns = FormsDataService.patterns;

                // GET DATES FOR DROPDOWN
                $scope.getYears = FormsDataService.getYears();
                $scope.getMonths = FormsDataService.getMonths();
                $scope.initYear = FormsDataService.initYear;
                $scope.initMonth = FormsDataService.initMonth;
                
                // BUY TICKET FORM - TAB 1 - VALUES TO SUBMIT
                $scope.ticketPrice = FormsDataService.ticketPrice;
                $scope.companions = [];
                $scope.addCompanion = function() {
                    if (!$scope.companion || $scope.companion === '' || $scope.companion === initName) {
                        return;
                    }
                    $scope.companions.push({ companion: $scope.companion });
                    $scope.companion = '';
                };
                $scope.removeCompanion = function(companion) {
                    var selectedCompanion = $scope.companions.indexOf(companion);
                    $scope.companions.splice(selectedCompanion, 1);
                };
                $scope.guest = [];
                $scope.submitGuests = function(buyTicket) {
                    if ($scope.buyTicketForm.$valid) {
                        $scope.guest.push({
                            location: $scope.map,
                            name: buyTicket.name,
                            email: buyTicket.email,
                            companions: $scope.companions,
                            ticketPrice: $scope.ticketPrice,
                            finalPrice: $scope.ticketPrice /*one buyer is for sure*/+ ($scope.ticketPrice * $scope.companions.length),
                            card: {
                                name: buyTicket.card.name,
                                number: buyTicket.card.number,
                                cvv: buyTicket.card.cvv,
                                month: buyTicket.card.month,
                                year: buyTicket.card.year
                            },
                            billingAddress: {
                                street: buyTicket.billingAddress.street,
                                city: buyTicket.billingAddress.city,
                                postCode: buyTicket.billingAddress.postCode,
                                country: buyTicket.billingAddress.country
                            }
                        });
                        alert('Please check your email for purchase confirmation.');
                    } else {
                        alert('You\'ve made a mistake somewhere, please check your form again.');
                    }
                };

                // BOOK US FORM - TAB 2
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