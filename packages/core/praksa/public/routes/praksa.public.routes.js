'use strict';

angular.module('mean.praksa').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('lista praksi', {
      url: '/praksa/lista',
      templateUrl: 'praksa/views/lista.html'
    })
    .state('dodaj praksu', {
      url: '/praksa/dodaj',
      templateUrl: 'praksa/views/dodaj.html'
    })
    .state('izmeni praksu', {
      url: '/praksa/izmeni/:praksaId',
      templateUrl: 'praksa/views/izmeni.html'
    });
  }
]);
