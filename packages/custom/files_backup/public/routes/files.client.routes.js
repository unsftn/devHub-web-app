'use strict';

//Setting up route
angular.module('mean.files').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('upload file', {
        url: '/upload-file',
        templateUrl: '/files/views/upload-file.html'
      });
  }
]);
