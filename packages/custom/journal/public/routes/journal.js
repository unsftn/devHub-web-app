'use strict';

angular.module('mean.journal').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('journal example page', {
      url: '/journal/example',
      templateUrl: 'journal/views/index.html'
    });
  }
]);
