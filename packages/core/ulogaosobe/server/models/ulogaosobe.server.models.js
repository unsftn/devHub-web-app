'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Ulogaosobe Schema
 */
var UlogaosobeSchema = new Schema({
  naziv: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

/**
 * Validations
 */
UlogaosobeSchema.path('naziv').validate(function(naziv) {
  return !!naziv;
}, 'Naziv ne sme biti prazan');

/*UlogaosobeSchema.path('desc').validate(function(desc) {
  return !!desc;
}, 'Description cannot be blank');*/

/**
 * Statics
 */
UlogaosobeSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })/*.populate('user', 'name username')*/.exec(cb);
};

mongoose.model('Ulogaosobe', UlogaosobeSchema);
