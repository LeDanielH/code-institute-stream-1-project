// var suckData = function(itemId) {
//     $resource('data/:itemId.json', {}, {
//         query: {
//             method: 'GET',
//             params: {
//                 itemId: itemId
//             },
//             isArray: true
//         }
//     });
// };
angular.module('myBandAppServices', ['ngResource'])
    .factory('GigsDataService', [
        '$rootScope', 
        '$resource',
        function(
            $rootScope, 
            $resource
            ) {
                var gigs = {
                    subtitles: ['where', 'when'],
                    maps: $resource('data/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'gigs'
                            },
                            isArray: true
                        }
                    })
                };
                return gigs;
            }
        ])
    .factory('GuestsDataService', [
        function() {
            var people = {
                guests: [{}],
                ticketPrice: 20
            };
            return people;
        }
    ])
    .factory('StoreDataService', [
        '$resource',
        function(
            $resource
            ) {
                var store = {
                    storeItems: $resource('data/store-items/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'store-items'
                            },
                            isArray: true
                        }
                    }),
                    sortByCategories: ['popular', 'best selling', 'price'],
                    sortByCategory: 'price'
                };
                return store;
            }
        ])
    .factory('TestimonialsDataService', [
        '$resource',
        function(
            $resource
            ) {
                var testimonials = {
                    images: $resource('data/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'testimonials'
                            },
                            isArray: true
                        }
                    })
                };
                return testimonials;
            }
        ])
    .factory('SocialLinksDataService', [
        '$resource',
        function(
            $resource
            ) {
                var socialLinks = {
                    title: 'follow us!',
                    socialIcons: $resource('data/:itemId.json', {}, {
                        query: {
                            method: 'GET',
                            params: {
                                itemId: 'social-links'
                            },
                            isArray: true
                        }
                    })
                };
                return socialLinks;
            }
        ])
    .factory('callToActionDataService', [
        '$resource',
        function($resource) {
            var calls = {
                go: function(path) {
                    $location.path(path);
                },
                callToActionBoxes: $resource('data/:itemId.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                            itemId: 'calls-to-action'
                        },
                        isArray: true
                    }
                })
            };
            return calls;
        }
    ])
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
                        post.upvotes += 1;
                    }
                };
                return posts;
            }
        ])
    ;