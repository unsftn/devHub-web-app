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
    })
    .state('izmeni projekat', {
      url: '/projekat/izmeni/:projekatId',
      templateUrl: 'projekat/views/izmeni.html'
    })
    .state('dodaj mentore ili ucesnike', {
      url: '/projekat/dodajMentoreIliUcesnike',
      templateUrl: 'projekat/views/dodajMenUce.html'
    });
  }
]);
