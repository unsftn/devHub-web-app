'use strict';

angular.module('mean.statuses').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('statuses example page', {
      url: '/statuses/example',
      templateUrl: 'statuses/views/index.html'
    });
  }
]);
