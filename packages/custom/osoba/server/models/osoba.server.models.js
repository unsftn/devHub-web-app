'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Osoba Schema
 */
var OsobaSchema = new Schema({
  ime: {
    type: String,
    required: true,
    trim: true
  },
  prezime: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  godinaStudija: {
    type: String
  },
  prosek: {
    type: Number
  },
  motivacionoPismo: {
    type: String
  }
});

/**
 * Validations
 */
OsobaSchema.path('ime').validate(function(ime) {
  return !!ime;
}, 'Ime ne sme biti prazno');

/*OsobaSchema.path('desc').validate(function(desc) {
  return !!desc;
}, 'Description cannot be blank');*/

/**
 * Statics
 */
OsobaSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })/*.populate('user', 'name username')*/.exec(cb);
};

mongoose.model('Osoba', OsobaSchema);

