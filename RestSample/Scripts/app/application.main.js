var eagleRest = angular.module('eagleRest', ['ngRoute', 'ngCookies', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.pinning', 'ui.bootstrap', 'utilities', 'authentication']).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer templates domain.
      'http://kmcnamee/**'
    ]);
});


// Configure routes
eagleRest.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.        
        when('/about', { templateUrl: './scripts/app/about.view.html', controller: 'AboutCtrl' }).
        when('/', { templateUrl: './scripts/app/holding.view.html', controller: 'HoldingCtrl' }).
        when('/holding', { templateUrl: './scripts/app/holding.view.html', controller: 'HoldingCtrl' }).
        when('/trade', { templateUrl: './scripts/app/trade.view.html', controller: 'TradeCtrl' }).
        when('/login', { templateUrl: './scripts/app/login.view.html', controller: 'LoginCtrl' }).
        otherwise({ redirectTo: '/login' });
}]);


eagleRest.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['EagleSessionID'] =  $rootScope.globals.currentUser.sessionId; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);