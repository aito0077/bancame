'use strict';

/* jshint -W098 */
angular.module('mean.project').controller('ProjectController', ['$scope', 'Global', 'Project',
  function($scope, Global, Project) {
    $scope.global = Global;
    $scope.package = {
      name: 'project'
    };
  }
]);
