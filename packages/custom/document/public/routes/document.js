'use strict';

angular.module('mean.document').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('document example page', {
      url: '/document/example',
      templateUrl: 'document/views/index.html'
    });
  }
]);
