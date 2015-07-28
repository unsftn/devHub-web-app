'use strict';

angular.module('mean.osoba').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('lista osoba', {
      url: '/osoba/lista',
      templateUrl: 'osoba/views/lista.html'
    })
    .state('dodaj osobu', {
      url: '/osoba/dodaj',
      templateUrl: 'osoba/views/dodaj.html'
    })
    .state('izmeni osobu', {
      url: '/osoba/izmeni/:osobaId',
      templateUrl: 'osoba/views/izmeni.html'
    });
  }
]);
