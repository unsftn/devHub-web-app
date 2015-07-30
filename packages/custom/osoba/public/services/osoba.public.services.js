'use strict';

angular.module('mean.osoba').factory('Osobe', ['$resource',
  function($resource) {
    return $resource('api/osoba/:osobaId', {
      osobaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
