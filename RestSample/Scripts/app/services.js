'use strict';

angular.module('authentication', [])

.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope',
    function ($http, $cookieStore, $rootScope) {
        var service = {};

        service.login = function (username, password, callback) {

            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post('http://localhost/eagle.rest/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    callback(response);
                });

        };

        service.SetCredentials = function (username, password, sessionId) {
                        
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    sessionId: sessionId
                }
            };

            $http.defaults.headers.common['EagleSessionID'] = sessionId; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common['EagleSessionID'] = ' ';
        };

        return service;
    }]);