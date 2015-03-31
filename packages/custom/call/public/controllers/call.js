'use strict';

/* jshint -W098 */
angular.module('mean.call').controller('CallController', ['$scope', '$stateParams', '$location', 'Global', 'Call',
  function($scope, $stateParams, $location, Global, Call) {
    $scope.global = Global;
    $scope.hasAuthorization = function(call) {
      return $scope.global.isAdmin;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var call = new Call({
          name: this.name,
          context: this.context
        });
        call.$save(function(response) {
          $location.path('call/' + response._id);
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(call) {
      if (call) {
        call.$remove(function(response) {
          for (var i in $scope.call) {
            if ($scope.call[i] === call) {
	      $scope.call.splice(i,1);
            }
          }
          $location.path('call');
        });
      } else {
        $scope.call.$remove(function(response) {
          $location.path('call');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var call = $scope.call;
        if(!call.updated) {
          call.updated = [];
        }
        call.updated.push(new Date().getTime());

        call.$update(function() {
          $location.path('call/' + call._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Call.query(function(calls) {
        $scope.calls = calls;
      });
    };

    $scope.findOne = function() {
      Call.get({
        callId: $stateParams.callId
      }, function(call) {
        $scope.call = call;
      });
    };
  }
]);
