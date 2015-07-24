'use strict';

angular.module('mean.article').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('article example page', {
      url: '/article/example',
      templateUrl: 'article/views/index.html'
    });
  }
]);
