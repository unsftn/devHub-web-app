'use strict';

angular.module('mean.ulogaosobe').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('ulogaosobe example page', {
      url: '/ulogaosobe/example',
      templateUrl: 'ulogaosobe/views/index.html'
    });
  }
]);
