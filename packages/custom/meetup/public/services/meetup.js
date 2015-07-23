'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.meetups').factory('Meetups', ['$resource',
  function($resource) {
    return $resource('api/meetups/:meetupId', {
      meetupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);