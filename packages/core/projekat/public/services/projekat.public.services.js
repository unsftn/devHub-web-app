'use strict';

angular.module('mean.projekti').factory('Projekti', [
  function($resource) {
    return $resource('api/projekti/:projekatId', {
      projekatId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
