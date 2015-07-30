'use strict';

//Document service used for articles REST endpoint
angular.module('mean.document').factory('Document', ['$resource',
  function($resource) {
    return $resource('api/documents/:documentId', {
      documentId: '@_id'
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
