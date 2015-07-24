'use strict';

/* jshint -W098 */
angular.module('mean.document').controller('DocumentController', ['$scope', 'Global', 'Document',
  function($scope, Global, Document) {
    $scope.global = Global;
    $scope.package = {
      name: 'document'
    };
  }
]);
