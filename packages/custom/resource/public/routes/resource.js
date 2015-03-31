'use strict';

angular.module('mean.resource').config(['$stateProvider',
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
        .state('resource example page', {
            url: '/resource/example',
            templateUrl: 'resource/views/index.html'
        })
        .state('all resource', {
            url: '/resource',
            templateUrl: 'resource/views/list.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('create resource', {
            url: '/resource/create',
            templateUrl: 'resource/views/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('edit resource', {
            url: '/resource/:resourceId/edit',
            templateUrl: 'resource/views/edit.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('resource by id', {
            url: '/resource/:resourceId',
            templateUrl: 'resource/views/view.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });
    }
]);

