'use strict';

angular.module('mean.praksa').factory('Prakse', ['$resource',
  function($resource) {
    return $resource('api/praksa/:praksaId', {
      praksaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
