'use strict';

/* jshint -W098 */
angular.module('mean.workshops').controller('WorkshopsController', ['$scope', 'Global', 'Workshops',
  function($scope, Global, Workshops) {
    $scope.global = Global;
    $scope.package = {
      name: 'workshops'
    };
  }
]);
