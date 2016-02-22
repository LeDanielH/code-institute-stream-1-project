;(function(){
	'use strict';
	angular.module('myBandAppServices', ['ngResource'])
    .factory('BlogPostsDataService', [
        '$resource',
        function(
            $resource
            ) {
                var posts = {
                    title: 'News',
                    blogPosts: $resource('data/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'blog-posts'
                            },
                            isArray: true
                        }
                    }),
                    upVote: function(post) {
                        post.upVotes += 1;
                    }
                };
                return posts;
            }
        ]);
}());