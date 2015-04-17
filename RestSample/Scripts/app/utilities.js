window.utilities = angular.module('utilities', [])

utilities.directive('siteMenu', function () {
    return {
        restrict: 'E',
        templateUrl: './scripts/app/menu.html'
    };
});

utilities.controller('HeaderCtrl', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {                
        
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
]);


utilities.directive('fundSelector', function () {
    return {
        restrict: 'E',
        templateUrl: './scripts/app/fund.html'
    };
});

utilities.controller('FundSelectorCtrl', ['$scope', '$location', '$http', '$rootScope',
    function ($scope, $location, $http, $rootScope) {
        $scope.getFunds = function (val) {
            return $http.get($rootScope.baseUrl + 'api/core/fund/startsWith', {
                params: {
                    startsWith: val
                }
            }).then(function (response) {
                return response.data;
            });

        };
        
    }
]);