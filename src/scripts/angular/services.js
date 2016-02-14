angular.module('myBandAppServices', [])
	.factory('GigsDataService', ['$rootScope', GigsDataService]);

function GigsDataService($rootScope) {
	return {
		subtitles: ['where', 'when'],
		maps: [{
			clubName: 'Club Matrix',
			date: '17/12/2016',
			time: '20:00',
			address: [{
				street: 'Tachovské nám. 7',
				city: 'Praha',
				country: 'Czech Republic'
			}],
			zoom: 14,
			width: 400

		}, {
			clubName: 'Club Holdudvar',
			date: '30/12/2016',
			time: '21:00',
			address: [{
				street: 'Margitsziget 1138',
				city: 'Budapest',
				country: 'Hungary'
			}],
			zoom: 14,
			width: 400
		}, {

			clubName: 'The Twisted Pepper',
			date: '02/01/2017',
			time: '19:00',
			address: [{
				street: '54 Middle Abbey Street',
				city: 'Dublin',
				country: 'Ireland'
			}],
			zoom: 14,
			width: 400
		}]
	};
}