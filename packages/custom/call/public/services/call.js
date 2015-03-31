'use strict';

angular.module('mean.call').factory('Call', ['$resource',
  function($resource) {
    return $resource('calls/:callId', {
      callId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
