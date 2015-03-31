'use strict';

angular.module('mean.resource').factory('Resource', ['$resource',
  function($resource) {
    return $resource('resources/:resourceId', {
      resourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
