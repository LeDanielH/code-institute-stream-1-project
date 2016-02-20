angular.module('myBandAppControllers', ['myBandAppServices'])
    .controller('IndexController', [
        '$scope',
        '$location',
        // '$http',
        'GigsDataService',
        'StoreDataService',
        'TestimonialsDataService',
        'SocialLinksDataService',
        'callToActionDataService',
        function(
            $scope, 
            $location,
            // $http,
            GigsDataService, 
            StoreDataService, 
            TestimonialsDataService, 
            SocialLinksDataService, 
            callToActionDataService
            ) {
            // $scope.getDocumentWidth = window.matchMedia(width);
            //GIGS
                $scope.subtitles = GigsDataService.subtitles;
                $scope.maps = GigsDataService.maps.query();

            // STORE
                // $http.get('data/store-items.json').success(function(data) {
                //     $scope.storeItemsList = data.splice(0, 5);
                // });
                $scope.storeItems = StoreDataService.storeItems.query();
                $scope.sortByCategory = StoreDataService.sortByCategory;
                $scope.sortByCategories = StoreDataService.sortByCategories;
                // $scope.getSaleAll = StoreDataService.getSaleAll;

            //TESTIMONIALS
                $scope.images = TestimonialsDataService.images.query();

            //SOCIAL LINKS
                $scope.socialLinkstitle = SocialLinksDataService.title;
                $scope.socialIcons = SocialLinksDataService.socialIcons.query();

            //BUTTON BOXES
                $scope.go = callToActionDataService.go;
                $scope.callToActionBoxes = callToActionDataService.callToActionBoxes.query();
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
                 $scope.blogPosts = BlogPostsDataService.blogPosts.query();
                 $scope.upVote = BlogPostsDataService.upVote;
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
                $scope.storeItemsList = StoreDataService.storeItems.query();
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