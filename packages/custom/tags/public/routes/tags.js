'use strict';

angular.module('mean.tags').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('tags example page', {
      url: '/tags/example',
      templateUrl: 'tags/views/index.html'
    });
  }
]);
