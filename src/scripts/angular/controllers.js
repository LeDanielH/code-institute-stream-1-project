angular.module('myBandAppControllers', [])
    .controller('SocialIconsController', ['$scope',
        function($scope) {
            var socialIcons = [
                'fa-facebook',
                'fa-twitter',
                'fa-instagram',
                'fa-youtube'
            ];
            $scope.socialIcons = socialIcons;
        }
    ])
    .controller('HomeController', ['$scope',
        function($scope) {
            $scope.title = 'THE NEWS';

            //slider
            $scope.images = [{
                titleClass: 'slide-1',
                quote: 'This was the best party ever!',
                cite: 'Elen from Vienna'
            }, {
                titleClass: 'slide-2',
                quote: 'Unforgettable Experience!',
                cite: 'The Music Magazine'
            }, {
                titleClass: 'slide-3',
                quote: 'Redefinition of the word "FUN"!',
                cite: 'WHY REST Magazine'
            }, {
                titleClass: 'slide-4',
                quote: 'I felt in love on this party!',
                cite: 'Barbie from Georgia'
            }];
        }
    ])
    .controller('GigsController', ['$scope',
        function($scope) {
            $scope.title = 'GIGS';
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
    ]);
// .controller('BuyTicketController', ['$scope', function($scope) {
//     $cope.title = 'BUY A TICKET';
// }])
// .controller('BookUsController', ['$scope', function($scope) {
//     $cope.title = 'BOOK US NOW';
// }])
// .controller('StoreController', ['$scope',
//     function($scope) {
//         var store = {
//             items: [{
//                 name: 'Item1',
//                 price: 10,
//                 stock: 0
//             }, {
//                 name: 'Item2',
//                 price: 6,
//                 stock: 0
//             }, {
//                 name: 'Item3',
//                 price: 8,
//                 stock: 0
//             }, {
//                 name: 'Item4',
//                 price: 50,
//                 stock: 3
//             }, {
//                 name: 'Item5',
//                 price: 20,
//                 stock: 2
//             }],
//             //, getSalePrice: function(minusNum) {
//             // 	for(var i = 0; i < store.items.length; i++) {
//             // 		return store.items[i].price - minusNum;
//             // 	}
//             // }
//             itemsStock: function() {
//                 var msg = '';
//                 if (store.items.stock === 0) {
//                     msg += 'Out of stock';
//                     document.getElementById('stock').className(itemNotAvailable);
//                 } else {
//                     msg += 'In stock';
//                     document.getElementById('stock').className(itemAvailable);
//                 }
//             }
//         };
//     }
// ])