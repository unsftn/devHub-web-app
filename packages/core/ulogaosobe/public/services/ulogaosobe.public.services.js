'use strict';

angular.module('mean.ulogaosobe').factory('Ulogaosobe', ['$resource',
  function($resource) {
    return $resource('api/ulogaosobe/:ulogaosobeId', {
      ulogaOsobeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
