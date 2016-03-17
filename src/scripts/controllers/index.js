;(function () {
	'use strict';
	angular.module('myBandAppControllers', ['myBandAppServices'])
		.controller('IndexController', [
            '$scope',
            '$location',
            // '$http',
            'GigsDataService',
            'StoreDataService',
            'TestimonialsDataService',
            'SocialLinksDataService',
            'CallToActionDataService',
            'FamousQuotesDataService',
            function (
				$scope,
				$location,
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
				// $scope.images = [];
				// $scope.image = null;
				// function load(images) {
				// 	$scope.images = images;
				// 	$scope.image = images[0];
				// }
				// TestimonialsDataService.images.query().$promise.then(load);
				$scope.images = TestimonialsDataService.images.query();
				// $scope.currentIndex = 0;
				// $scope.imagesLength = $scope.images.length - 1;
				// $scope.next = function() {
				// 	if ($scope.currentIndex < $scope.imagesLength) {
				// 		$scope.currentIndex++;
				// 	} else {
				// 		$scope.currentIndex = 0;
				// 	}
				// };
				// $scope.previous = function() {
				// 	if ($scope.currentIndex > 0) {
				// 		$scope.currentIndex--;
				// 	} else {
				// 		$scope.currentIndex = $scope.imagesLength;
				// 	}
				// };
				// $scope.$watch('currentIndex', function() {
				// 	$scope.images.forEach(function(image) {
				// 		image.visible = false;
				// 	});
				// 	$scope.images[$scope.currentIndex].visible = true;
				// });

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