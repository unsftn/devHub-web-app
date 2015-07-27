'use strict';

//Setting up route
angular.module('mean.document').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all documents', {
        url: '/documents',
        templateUrl: '/document/views/list.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('create document', {
        url: '/documents/create',
        templateUrl: '/document/views/create.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('edit document', {
        url: '/documents/:documentId/edit',
        templateUrl: '/document/views/edit.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('document by id', {
        url: '/documents/:documentId',
        templateUrl: '/document/views/view.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      });
  }
]);
