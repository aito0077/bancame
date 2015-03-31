'use strict';

/* jshint -W098 */
angular.module('mean.resource').controller('ResourceController', ['$scope', '$stateParams', '$location', 'Global', 'Resource',
  function($scope, $stateParams, $location, Global, Resource) {
    $scope.global = Global;
    $scope.hasAuthorization = function(resource) {
      return $scope.global.isAdmin;
    };


    $scope.create = function(isValid) {
      if (isValid) {
        var resource = new Resource({
          name: this.name,
          description: this.description,
          resource_type: this.resource_type,
          picture_path: this.picture_path,
          organization_owner: this.organization_owner
        });
        resource.$save(function(response) {
          $location.path('resource/' + response._id);
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(resource) {
      if (resource) {
        resource.$remove(function(response) {
          for (var i in $scope.resource) {
            if ($scope.resource[i] === resource) {
	      $scope.resource.splice(i,1);
            }
          }
          $location.path('resource');
        });
      } else {
        $scope.resource.$remove(function(response) {
          $location.path('resource');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var resource = $scope.resource;
        if(!resource.updated) {
          resource.updated = [];
        }
        resource.updated.push(new Date().getTime());

        resource.$update(function() {
          $location.path('resource/' + resource._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Resource.query(function(resources) {
        $scope.resources = resources;
      });
    };

    $scope.findOne = function() {
      Resource.get({
        resourceId: $stateParams.resourceId
      }, function(resource) {
        $scope.resource = resource;
      });
    };
  }
]);
