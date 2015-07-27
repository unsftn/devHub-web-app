'use strict';

//Setting up route
angular.module('mean.tags').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all tags', {
        url: '/tags',
        templateUrl: '/tags/views/list.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('create tag', {
        url: '/tags/create',
        templateUrl: '/tags/views/create.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('edit tag', {
        url: '/tags/:tagId/edit',
        templateUrl: '/tags/views/edit.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      })
      .state('tag by id', {
        url: '/tags/:tagId',
        templateUrl: '/tags/views/view.html'/*,
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }*/
      });
  }
]);
