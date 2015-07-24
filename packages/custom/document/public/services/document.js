'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.document').factory('Document', ['$resource',
  function($resource) {
    return $resource('api/documents/:documentId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);