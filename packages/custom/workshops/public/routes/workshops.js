'use strict';

angular.module('mean.workshops').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('workshops example page', {
      url: '/workshops/example',
      templateUrl: 'workshops/views/index.html'
    });
  }
]);
