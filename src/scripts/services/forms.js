;(function() {
    'use strict';
    angular.module('myBandAppServices')
        .factory('FormsDataService', [
            // '$rootScope',
            '$resource',
            function(
                // $rootScope,
                $resource
            ) {
                var f = {
                    formsData: $resource('data/json/forms/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'forms-data'
                            },
                            isArray: false
                        }
                    }),
                    patterns: {
                        email: "/^\b\w{1,30}\b(\.\b\w{1,30}\b)?@\b[a-zA-Z0-9]{1,30}\b\.\b[a-zA-Z]{1,10}\b(\.\b[a-zA-Z]{1,10}\b)?(\s)?$/",
                        card: "/^\b(\d{4}(\s|-)?){3}\d{4}\b(\s)?$/",
                        cvv: "/^\b\d{3}\b(\s{0,1})?$/",
                        name: "/^(\b[a-zA-Z]{1,20}\b\s{0,2}){2,4}$/",
                        street: "/^(\b[a-zA-Z]{1,20}\b\s){1,3}\b\d{1,5}\b(\/\b\d{1,5}\b)?(\s{0,2})$/",
                        city: "/^(\b[a-zA-Z]{1,20}\b\s{0,2}){1,3}$/",
                        postCode: "/^\b[a-zA-Z0-9]{2,12}\b$/",
                        username: "/^\b\w{2,30}\b$/"
                    },
                    getYears: function() {
                        var today = new Date();
                        var year = today.getFullYear();
                        var years = [];
                        var yearsSpan = 50;
                        for (var i = year; i < year + yearsSpan; i++) {
                            years.push(i);
                        }
                        return years;
                    },

                    getMonths: function() {
                        var generatedMonths = [];
                        for (var month = 1; month < 13; month++) {
                            generatedMonths.push(month);
                        }
                        return generatedMonths.map(function(month) {
                            if (month < 10) {
                                return '0' + month;
                            } else {
                                return month.toString();
                            }
                        });
                    },
                    getDateTime: function() {
                        var today = new Date();
                        var day = today.getDate();
                        var month = ('0' + (today.getMonth() + 1)).slice(-2);
                        var year = today.getFullYear();
                        var hour = ('0' + today.getHours()).slice(-2);
                        var minute = ('0' + today.getMinutes()).slice(-2);
                        var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
                        return dateTime;
                    }
                };
                return f;
            }
        ]);
}());