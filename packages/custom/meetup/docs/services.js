'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Meetups operations',
      path: '/meetups',
      method: 'GET',
      summary: 'Get all Meetups',
      notes: '',
      type: 'Meetup',
      nickname: 'getMeetups',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/meetups',
      method: 'POST',
      summary: 'Create meetup',
      notes: '',
      type: 'Meetup',
      nickname: 'createMeetup',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Meetup to create.',
        required: true,
        type: 'Meetup',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
