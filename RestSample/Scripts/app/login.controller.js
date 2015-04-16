eagleRest.controller('LoginCtrl',
    ['$scope', '$http', '$location','AuthenticationService',
    function ($scope, $http, $location, AuthenticationService) {

        AuthenticationService.ClearCredentials();

        $scope.username = "";
        $scope.password = "";
        $scope.sessionId = "";

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.username, $scope.password, function(response){
                if (response.success) {                    
                    AuthenticationService.SetCredentials($scope.username, $scope.password,response.sessionId);
                    $location.path('/holding');
                }
                else {
                    console.log(response);
                    $scope.error = response.message;                    
                    $scope.dataLoading = false;
                }
            })
        }
        
    }]);