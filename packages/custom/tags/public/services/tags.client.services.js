'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.tags').factory('Tags', ['$resource',
  function($resource) {
    return $resource('api/tags/:tagId', {
      tagId: '@_id'
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
