'use strict';

//Setting up route
angular.module('mean.article').config(['$stateProvider',
  function($stateProvider) {
    console.log("registruje se state provider!!!");
    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles/',
        templateUrl: '/article/views/list.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            console.log("!!!!!");
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('create article', {
        url: '/articles/create/',
        templateUrl: '/article/views/create.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('edit article', {
        url: '/articles/:articleId/edit/',
        templateUrl: '/article/views/edit.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('article by id', {
        url: '/articles/:articleId/',
        templateUrl: '/article/views/view.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      });
  }
]);
