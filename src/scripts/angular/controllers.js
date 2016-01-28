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
    .controller('HomeController', ['$scope', function($scope) {
        $scope.title = 'THE NEWS';
    }]);