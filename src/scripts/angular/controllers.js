angular.module('myBandAppControllers', ['myBandAppServices'])
    .controller('IndexController', [
        '$scope',
        '$location',
        '$http',
        'GigsDataService',
        'StoreDataService',
        'PhotoSliderDataService',
        'SocialLinksDataService',
        'ButtonBoxDataService',
        function(
            $scope, 
            $location,
            $http,
            GigsDataService, 
            StoreDataService, 
            PhotoSliderDataService, 
            SocialLinksDataService, 
            ButtonBoxDataService
            ) {
            //GIGS
                $scope.subtitles = GigsDataService.subtitles;
                $scope.maps = GigsDataService.maps;

            // STORE
                // $http.get('data/store-items.json').success(function(data) {
                //     $scope.storeItemsList = data.splice(0, 5);
                // });
                $scope.storeItemsList = StoreDataService.resource.query();
                $scope.sortByCategory = StoreDataService.sortByCategory;
                $scope.sortByCategories = StoreDataService.sortByCategories;
                $scope.getSaleAll = StoreDataService.getSaleAll;
                // $scope.getDocumentWidth = window.matchMedia(width);

            //PHOTO SLIDER
                $scope.images = PhotoSliderDataService.images;

            //SOCIAL LINKS
                $scope.socialLinkstitle = SocialLinksDataService.title;
                $scope.socialIcons = SocialLinksDataService.socialIcons;

            //BUTTON BOXES
                $scope.go = ButtonBoxDataService.go;
                $scope.buttonBox = ButtonBoxDataService.buttonBox;
            }
        ])
    .controller('HomeController', [
        '$scope',
        'BlogPostsDataService', 
        function(
            $scope,
            BlogPostsDataService
            ) {
                 $scope.title = BlogPostsDataService.title;
                 $scope.blogPosts = BlogPostsDataService.blogPosts;  
            }
        ])
    .controller('GigsController', [
        '$scope',
        'GigsDataService',
        'GuestsDataService',
        function(
            $scope, 
            GigsDataService, 
            GuestsDataService
            ) {
                $scope.title = 'GIGS';
                $scope.map = $scope.maps[0];
                $scope.guests = GuestsDataService.guests;
                $scope.ticketPrice = GuestsDataService.ticketPrice;
                $scope.addGuest = function() {
                    if (!$scope.guestsName || $scope.guestsName === '') {
                        return;
                    }
                    $scope.guests.push({ 
                        guestsName: $scope.guestsName
                    });
                };
            }
        ])
    .controller('StoreController', [
        '$scope',
        'StoreDataService', 
        function(
            $scope, 
            StoreDataService
            ) {
                // $http.get('data/store-items/store-items.json').success(function(data) {
                //     $scope.storeItemsList = data.splice(0, 5);
                // });
                $scope.storeItemsList = StoreDataService.resource.query();
                $scope.sortByCategory = StoreDataService.sortByCategory;
            }
        ])
    .controller('StoreItemDetailController', [
        '$scope',
        // '$http',
        '$routeParams', 
        function(
            $scope,
            // $http,
            $routeParams
            ) {
                // $http.get('data/store-items/' + $routeParams + '.json')
                //     .success(function(data) {
                //         $scope.item = data;
                //         $scope.mainImageUrl = data.images[0];
                //     });
                $scope.item = StoreDataService.get({itemId: $routeParams.itemId}, function(item) {
                    $scope.mainImageUrl = item.images[0];
                });
                $scope.setMainImage = function(imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                };
            }]);