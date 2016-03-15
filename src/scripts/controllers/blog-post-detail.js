;(function () {
	'use strict';
	angular.module('myBandAppControllers')
		.controller('BlogPostDetailController', [
            '$scope',
            'BlogPostsDataService',
            'FormsDataService',
            '$routeParams',
            function (
				$scope,
				BlogPostsDataService,
				FormsDataService,
				$routeParams
            ) {
				$scope.post = BlogPostsDataService.blogPosts.get({
					postId: $routeParams.postId
				}, function (post) {
					$scope.mainImageUrl = post.images[0];
				});
				$scope.setMainImage = function (imageUrl) {
					$scope.mainImageUrl = imageUrl;
				};
				$scope.dateTime = FormsDataService.getDateTime();
				$scope.formsData = FormsDataService.formsData.query();
				$scope.addComment = function () {
					if (!$scope.content || $scope.content === '') {
						return;
					}
					$scope.post.comments.push({
						userName: $scope.userName,
						content: $scope.content,
						upVotes: 0,
						dateTime: $scope.dateTime
					});
					$scope.userName = '';
					$scope.content = '';
					$scope.dateTime = '';
				};
				$scope.upVote = BlogPostsDataService.upVote;
            }
        ]);

}());