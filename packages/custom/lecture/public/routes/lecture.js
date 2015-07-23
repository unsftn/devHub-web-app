'use strict';

angular.module('mean.lecture').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('lecture example page', {
      url: '/lecture/example',
      templateUrl: 'lecture/views/index.html'
    });
  }
]);
