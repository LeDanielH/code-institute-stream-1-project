;(function() {
	'use strict';
	angular.module('myBandAppControllers', ['myBandAppServices'])
		.controller('IndexController', [
			'$scope',
			'$location',
			'$interval',
			'IndexDataService',
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
				IndexDataService,
				GigsDataService,
				StoreDataService,
				TestimonialsDataService,
				SocialLinksDataService,
				CallToActionDataService,
				FamousQuotesDataService
			) {
				// $scope.getDocumentWidth = window.matchMedia(width);
				//Explanation
				$scope.explanation = "Thank You for visiting my project! This project is meant to demonstrate my ability to work with AngularJs and I believe I already did so. I know there is still a lot to learn! I have decided to leave this one alone for now and continue my learning (D3, MongoDB, Django) as my main goal is to get a job first. See my completed projects at <a href=\"http://ledanielh.github.io\" target=\"_blank\">ledanielh.github.io.</a>";

				//NAVBAR
				$scope.navlinks = IndexDataService.nav.query();
				$scope.mobileIcon = {name: "menu",};

				//GIGS
				$scope.subtitles = GigsDataService.subtitles;
				$scope.maps = GigsDataService.maps.query();
				
				//STORE ITEMS FOOTER
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