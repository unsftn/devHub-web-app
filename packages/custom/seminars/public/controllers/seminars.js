'use strict';

/* jshint -W098 */
angular.module('mean.seminars').controller('SeminarsController', ['$scope', 'Global', 'Seminars',
  function($scope, Global, Seminars) {
    $scope.global = Global;
    $scope.package = {
      name: 'seminars'
    };
  }
]);
