'use strict';

angular.module('mean.projekat').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('lista projekata', {
      url: '/projekat/lista',
      templateUrl: 'projekat/views/lista.html'
    })
    .state('dodaj projekat', {
      url: '/projekat/dodaj',
      templateUrl: 'projekat/views/dodaj.html'
    });
  }
]);
