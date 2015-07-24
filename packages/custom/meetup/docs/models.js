var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

exports.models = {

  Meetup: {
    id: 'Meetup',
    properties: {

      name: {
        type: 'string',
        description: 'Name of the meetup'
      },

      comments: {
        type: ['string']
      },

      date:{
        type: 'string'
      },

      location: {
        type: 'string',
      },
      lectures: {
        type: Schema,
        ref: 'Lecture'
      }

    }
  }
};