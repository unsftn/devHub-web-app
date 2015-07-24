'use strict';

angular.module('mean.seminars').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('seminars example page', {
      url: '/seminars/example',
      templateUrl: 'seminars/views/index.html'
    });
  }
]);
