'use strict';

/* jshint -W098 */
angular.module('mean.statuses').controller('StatusesController', ['$scope', 'Global', 'Statuses',
  function($scope, Global, Statuses) {
    $scope.global = Global;
    $scope.package = {
      name: 'statuses'
    };
  }
]);
