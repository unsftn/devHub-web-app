'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.meetup').factory('Meetups', ['$resource',
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
