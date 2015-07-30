'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.article').factory('Article', ['$resource',
  function($resource) {
    return $resource('api/jarticles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      remove: {
        method: 'DELETE'
      }
    });
  }
]);
