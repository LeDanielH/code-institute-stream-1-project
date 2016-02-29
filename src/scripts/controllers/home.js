;(function() {
    'use strict';

    angular.module('myBandAppControllers')
        .controller('HomeController', [
            '$scope',
            'BlogPostsDataService',
            function(
                $scope,
                BlogPostsDataService
            ) {
                $scope.title = BlogPostsDataService.title;
                $scope.blogPosts = BlogPostsDataService.blogPosts.query();
            }
        ]);
}());