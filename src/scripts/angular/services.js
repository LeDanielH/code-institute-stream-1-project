angular.module('myBandAppServices', ['ngResource'])
    .factory('GigsDataService', ['$rootScope',
        function($rootScope) {
            var gigs = {
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
    .factory('StoreDataService', ['$resource',
        function($resource) {
            var store = {
                resource: $resource('data/store-items/:itemId.json', {}, {
                    query: {method: 'GET', params:{itemId: 'store-items'}, isArray: true}
                }),
                sortByCategories: ['popular', 'best selling', 'price'],
                sortByCategory: 'price'
            };
            return store;
        }
    ])
    .factory('PhotoSliderDataService', [
        function() {
            var photoSlider = {
                images: [{
                    id: '1',
                    quote: 'This was the best party ever!',
                    cite: 'Elen from Vienna'
                }, {
                    id: '2',
                    quote: 'Unforgettable Experience!',
                    cite: 'The Music Magazine'
                }, {
                    id: '3',
                    quote: 'Redefinition of the word "FUN"!',
                    cite: 'WHY REST Magazine'
                }, {
                    id: '4',
                    quote: 'I felt in love on this party!',
                    cite: 'Barbie from Georgia'
                }]
            };
            return photoSlider;
        }
    ])
    .factory('SocialLinksDataService', [
        function() {
            var socialLinks = {
                title: 'follow us!',
                socialIcons: [{
                    icon: 'facebook',
                    link: 'facebook.com'
                }, {
                    icon: 'twitter',
                    link: 'twitter.com'
                }, {
                    icon: 'instagram',
                    link: 'instagram.com'
                }, {
                    icon: 'youtube',
                    link: 'youtube.com'
                }]
            };
            return socialLinks;
        }
    ])
    .factory('ButtonBoxDataService', [
        function() {
            var buttonBoxes = {
                go: function(path) {
                    $location.path(path);
                },
                buttonBox: [{
                    bookTicket: [{
                        heading: 'wanna party?',
                        content: '',
                        button: 'join the party!'
                    }],
                    bookBand: [{
                        heading: 'want a party?',
                        content: '',
                        button: 'book us now!'
                    }],
                    signUp: [{
                        heading: '',
                        content: 'for exclusive members only content and prices',
                        button: 'sign up!'
                    }]
                }]
            };
            return buttonBoxes;
        }
    ])
    .factory('BlogPostsDataService',[function() {
    	var posts = {
    		title: 'News',
    		blogPosts: [{
			    heading: 'Blog post 1',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '01/02/2015',
                upvotes: 2
    		}, {
    			heading: 'Blog post 2',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '24/12/2015',
                upvotes: 3
    		}, {
    			heading: 'Blog post 3',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '08/02/2016',
                upvotes: 1
    		}],
    		upVote: function(post) {
    			post.upvotes +=1;
    		}
    	};
    	return posts;
    }]);