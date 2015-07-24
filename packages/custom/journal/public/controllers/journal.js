'use strict';

/* jshint -W098 */
angular.module('mean.journal').controller('JournalController', ['$scope', 'Global', 'Journal',
  function($scope, Global, Journal) {
    $scope.global = Global;
    $scope.package = {
      name: 'journal'
    };
  }
]);
