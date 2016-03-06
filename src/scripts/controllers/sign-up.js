;(function() {
    'use strict';
    angular.module('myBandAppControllers')
        .controller('SignUpController', [
            '$scope',
            function(
                $scope
            ) {

                scope.register = {};
                $scope.submitted = false;
                $scope.uniqueusername = true;
                $scope.uniqueemail = true;


                $scope.signUpForm = function(signUpForm) {
                    if (signUpForm.$valid) {
                        $scope.submitted = true;
                        $scope.uniqueusername = false;
                        $scope.uniqueemail = true;
                        if ($scope.uniqueusername && $scope.uniqueemail) {
                            // proceed to process form via backend service
                        }
                    } else {
                        alert("Have you made a mistake somewhere? Please, check your details again.");
                        $scope.submitted = true;
                    }
                };
            }
        ]);
})();