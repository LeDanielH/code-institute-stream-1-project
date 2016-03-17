;(function() {
	'use strict';
	angular.module('myBandAppControllers', ['myBandAppServices'])
		.controller('IndexController', [
			'$scope',
			'$location',
			'$interval',
			// '$http',
			'GigsDataService',
			'StoreDataService',
			'TestimonialsDataService',
			'SocialLinksDataService',
			'CallToActionDataService',
			'FamousQuotesDataService',
			function(
				$scope,
				$location,
				$interval,
				// $http,
				GigsDataService,
				StoreDataService,
				TestimonialsDataService,
				SocialLinksDataService,
				CallToActionDataService,
				FamousQuotesDataService
			) {
				// $scope.getDocumentWidth = window.matchMedia(width);
				//GIGS
				$scope.subtitles = GigsDataService.subtitles;
				$scope.maps = GigsDataService.maps.query();

				//STORE
				$scope.storeItems = StoreDataService.storeItems.query();
				$scope.sortByCategory = StoreDataService.sortByCategory;
				$scope.sortByCategories = StoreDataService.sortByCategories;

				//TESTIMONIALS
				$scope.images = TestimonialsDataService.images.query();
				
				//SOCIAL LINKS
				$scope.socialLinkstitle = SocialLinksDataService.title;
				$scope.socialIcons = SocialLinksDataService.socialIcons.query();

				//BUTTON BOXES
				$scope.go = CallToActionDataService.go;
				$scope.callToActionBoxes = CallToActionDataService.callToActionBoxes.query();

				//LEFT SIDEBAR FAMOUS QUOTES
				$scope.fQuotes = FamousQuotesDataService.quotes.query();
				$scope.randomQuotes = $scope.fQuotes[Math.floor(Math.random() * $scope.fQuotes.length)];
			}
		]);

}());