;(function () {
	'use strict';
	angular.module('myBandAppFilters', [])
		.filter('StockFilter', function () {
			var trueMark = '\u2713';
			var falseMark = '\u2718';
			return function (stock) {
				if (stock > 0) {
					return trueMark;
				} else {
					return falseMark;
				}
			};
		});
}());