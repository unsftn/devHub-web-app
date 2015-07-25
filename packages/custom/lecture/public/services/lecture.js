'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.lecture').factory('Lectures', ['$resource',
  function($resource) {
    return $resource('api/lectures/:lectureId', {
      lectureId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
