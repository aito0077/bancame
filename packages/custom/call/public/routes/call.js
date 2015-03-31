'use strict';

angular.module('mean.call').config(['$stateProvider',
    function($stateProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function(user) {
                if (user !== '0') {
                    $timeout(deferred.resolve);
                } else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
        .state('call example page', {
            url: '/call/example',
            templateUrl: 'call/views/index.html'
        })
        .state('all call', {
            url: '/call',
            templateUrl: 'call/views/list.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('create call', {
            url: '/call/create',
            templateUrl: 'call/views/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('edit call', {
            url: '/call/:callId/edit',
            templateUrl: 'call/views/edit.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('call by id', {
            url: '/call/:callId',
            templateUrl: 'call/views/view.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });
    }
]);
