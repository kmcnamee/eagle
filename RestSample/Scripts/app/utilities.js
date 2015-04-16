window.utilities = angular.module('utilities', [])

utilities.directive('siteMenu', function () {
    return {
        restrict: 'E',
        templateUrl: './scripts/app/menu.html'
    };
});

utilities.controller('HeaderCtrl', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {                
        $scope.metadataTypes = [];

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        loadMetadataTypes();

        function loadMetadataTypes() {
            $scope.metadataTypes.push({ name: "Codes", action: "codes" });
            $scope.metadataTypes.push({ name: "Date Rules", action: "daterules" });
        }
    }
]);