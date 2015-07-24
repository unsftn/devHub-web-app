'use strict';

/* jshint -W098 */
angular.module('mean.tags').controller('TagsController', ['$scope', 'Global', 'Tags',
  function($scope, Global, Tags) {
    $scope.global = Global;
    $scope.package = {
      name: 'tags'
    };
  }
]);
