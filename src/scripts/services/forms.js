;(function() {
    angular.module('myBandAppServices')
        .factory('FormsDataService', [
            '$resource'
        ], function(
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
                    email: "/\b\w{1,30}\b(\.\b\w{1,30}\b)?@\b[a-zA-Z0-9]{1,30}\b\.\b[a-zA-Z]{1,10}\b(\.\b[a-zA-Z]{1,10}\b)?(\s)?/",
                    card: "/\b(\d{4}(\s|-)?){3}\d{4}\b(\s)?/",
                    cvv: "/\b\d{3}\b(\s{0,1})?/",
                    name: "/^(\b[a-zA-Z]{1,20}\b\s{0,2}){2,4}$/m",
                    street: "/(\b[a-zA-Z]{1,20}\b\s){1,3}\b\d{1,5}\b(\/\b\d{1,5}\b)?(\s{0,2})/",
                    city: "/^(\b[a-zA-Z]{1,20}\b\s{0,2}){1,3}$/m",
                    postCode: "/b[a-zA-Z0-9]{2,12}\b/"
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
                initYear: years[0],
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
                initMonth: months[0],
            };
            return f;
        });
}());