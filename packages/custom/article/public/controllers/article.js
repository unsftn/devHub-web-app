'use strict';

/* jshint -W098 */
angular.module('mean.article').controller('ArticleController', ['$scope', 'Global', 'Article',
  function($scope, Global, Article) {
    $scope.global = Global;
    $scope.package = {
      name: 'article'
    };
  }
]);
