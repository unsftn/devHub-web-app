'use strict';

/* jshint -W098 */
angular.module('mean.ulogaosobe').controller('UlogaosobeController', ['$scope', 'Global', 'Ulogaosobe',
  function($scope, Global, Ulogaosobe) {
    $scope.global = Global;
    $scope.package = {
      name: 'ulogaosobe'
    };
  }
]);
