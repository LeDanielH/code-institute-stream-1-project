;(function(){
	'use strict';
	angular.module('myBandAppServices')
    .factory('GuestsDataService', [
        function() {
            var people = {
                guests: [{}],
                ticketPrice: 20
            };
            return people;
        }
    ]);
}());