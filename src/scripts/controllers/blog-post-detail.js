;(function () {
	'use strict';
	angular.module('myBandAppControllers')
		.controller('BlogPostDetailController', [
            '$scope',
            'BlogPostsDataService',
            '$routeParams',
            function (
				$scope,
				BlogPostsDataService,
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
				$scope.comments = BlogPostsDataService.comments;
				$scope.getDateTime = new Date();
				$scope.addComment = function () {
					if (!$scope.content || $scope.content === '') {
						return;
					}
					$scope.comments.push({
						userName: $scope.userName,
						content: $scope.content,
						upVotes: 0,
						dateTime: $scope.getDateTime
					});
					$scope.userName = '';
					$scope.content = '';
					$scope.dateTime = '';
				};
				$scope.upVote = BlogPostsDataService.upVote;
            }
        ]);

}());