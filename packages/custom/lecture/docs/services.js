'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Lectures operations',
      path: '/lectures',
      method: 'GET',
      summary: 'Get all Lectures',
      notes: '',
      type: 'Lecture',
      nickname: 'getLectures',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/lectures',
      method: 'POST',
      summary: 'Create lecture',
      notes: '',
      type: 'Lecture',
      nickname: 'createLecture',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Lecture to create.',
        required: true,
        type: 'Lecture',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};