angular.module('myBandAppControllers', [])
    .controller('SocialIconsController', ['$scope',
        function($scope) {
            $scope.title = 'follow us!';
            $scope.socialIcons = [
                'facebook',
                'twitter',
                'instagram',
                'youtube'
            ];
        }
    ])
    .controller('GigsController', ['$scope',
        function($scope) {
            $scope.title = 'GIGS';
            $scope.subtitles = ['where', 'when'];
            $scope.maps = [{
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
            }];
            $scope.map = $scope.maps[0];
        }
    ])
    .controller('StoreItemsController', ['$scope',
        function($scope) {
            $scope.sortByCategories = ['popular', 'best selling', 'price'];
            $scope.storeItemsList = [{
                itemName: 'music album',
                price: 10,
                stock: 5
            }, {
                itemName: 'cup',
                price: 3,
                stock: 2
            }, {
                itemName: 'hat',
                price: 4,
                stock: 8
            }, {
                itemName: 'discography',
                price: 40,
                stock: 2
            }, {
                itemName: 'scarf',
                price: 10,
                stock: 0
            }, {
                itemName: 't-shirt',
                price: 20,
                stock: 10
            }, {
                itemName: 'gift coupon',
                price: 'choose value',
                stock: 100
            }, {
                itemName: 'dvd',
                price: 15,
                stock: 5
            }, {
                itemName: 'sticker',
                price: 2,
                stock: 100
            }, {
                itemName: 'usb',
                price: 8,
                stock: 20
            }];
            $scope.sortByCategory = $scope.sortByCategories[0];
            $scope.getSaleAll = function(percentOff) {
                for (var i = 0; i < $scope.storeItemsList.length; i++) {
                    return ($scope.storeItemsList[i].price / 100) * (100 - percentOff);
                }
            };
            $scope.getCategory = function() {

            };
            $scope.itemsStockMessage = function() {
                for (var i = 0; i < $scope.storeItemsList.length; i++) {
                    var message = '';
                    if ($scope.storeItemsList[i].stock === 0) {
                        return message += 'Out of stock';
                    } else {
                        return message += 'In stock';
                    }
                }
            };
        }
    ])
    .controller('PhotoSliderController', ['$scope',
        function($scope) {
            $scope.images = [{
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
            }];

        }
    ])
    .controller('ButtonBoxController', ['$scope', '$location',
        function($scope, $location) {
            $scope.go = function(path) {
                $location.path(path);
            };
            $scope.buttonBox = [{
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

            }];
        }
    ])
    .controller('BlogPostsController', ['$scope',
        function($scope) {
            $scope.title = 'news';
            $scope.blogPosts = [{
                heading: 'Blog post 1',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '01/02/2015'
            }, {
                heading: 'Blog post 2',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '24/12/2015'
            }, {
                heading: 'Blog post 3',
                imageSrc: 'images/album.jpg',
                introContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam omnis reiciendis id voluptas libero praesentium, molestias porro alias reprehenderit quidem dolores fuga quod inventore tempora commodi odio, delectus voluptates similique...',
                date: '08/02/2016'
            }];
        }
    ]);