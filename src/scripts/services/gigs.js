;(function() {
    'use strict';
    angular.module('myBandAppServices')
        .factory('GigsDataService', [
            '$rootScope',
            '$resource',
            function(
                $rootScope,
                $resource
            ) {
                var gigs = {
                    subtitles: ['where', 'when'],
                    maps: $resource('data/json/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'gigs'
                            },
                            isArray: true
                        }
                    }),
                    getYears: function() {
                        var today = new Date();
                        var year = today.getFullYear();
                        var years = [];
                        for (var i = year; i < year + 50; i++) {
                            years.push(i);
                        }
                        return years;
                    },
                    getMonths: function() {
                        var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                        var months = numberArray.map(function(month) {
                            if (month < 10) {
                                return '0' + month;
                            } else {
                                return month.toString();
                            }
                        });
                        return months;

                    },
                    actions: ['let\'s party!', 'book us!']
                };
                return gigs;
            }
        ]);
}());