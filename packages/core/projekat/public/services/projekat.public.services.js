'use strict';

angular.module('mean.projekat').factory('Projekti', ['$resource',
  function($resource) {
    return $resource('api/projekat/:projekatId', {
      projekatId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
