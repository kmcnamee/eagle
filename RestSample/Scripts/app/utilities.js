window.utilities = angular.module('utilities', ['ui.bootstrap'])

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
        scope: {
            fund: '='
        },
        controller: function ($scope,$http,$rootScope) {

            $scope.getFunds = function (val) {                
                 return $http.get($rootScope.baseUrl + 'api/core/fund/startsWith', {
                     params: {
                         startsWith: val
                     }
                 }).then(function (response) {
                     return response.data;
                 });
                 
            };
        },
        template: '<input type="text" ng-model="fund" placeholder="Portfolio" typeahead="fund as fund.Name for fund in getFunds($viewValue)" typeahead-loading="loadingLocations" class="form-control"  >' +
                    '<i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i>'             
    };
});

