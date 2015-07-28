'use strict';

//Document service used for articles REST endpoint
angular.module('mean.files').factory('Files', ['$resource',
  function($resource) {
    return $resource('api/files/:fileId', {
      fileId: '@_id'
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
