;(function () {
	'use strict';
	angular.module('myBandAppServices')
		.factory('BlogPostsDataService', [
            '$resource',
            function (
				$resource
            ) {
				var posts = {
					title: 'News',
					blogPosts: $resource('data/json/posts/:postId.json', {}, {
						query: {
							method: 'GET',
							params: {
								postId: 'blog-posts'
							},
							isArray: true
						}
					}),
					upVote: function (post) {
						post.upVotes += 1;
					},
					comments: [{
							userName: 'Adela',
							content: 'This is an amazing post!',
							upVotes: 2
                        }, {
							userName: 'Daniel',
							content: 'This website sucks!',
							upVotes: 10
                        }, {
							userName: 'Oliver',
							content: 'This is so cool!',
							upVotes: 3
                        }

                    ]
				};
				return posts;
            }
        ]);
}());