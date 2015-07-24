var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

exports.models = {

  Lecture: {
    id: 'Lecture',
    properties: {

      name: {
        type: 'string',
        description: 'Name of the lecture'
      },

      description: {
        type: 'string'
      },

      link: {
        type: 'string'
      },

      keywords: {
        type: ['string'],
      },
      accepted: {
        type: 'boolean'
      }

      speakers: {
        type: ['string']
      }

    }
  }
};