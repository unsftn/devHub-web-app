'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var StatusSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		unique:true,
		required: 'Naziv ne sme ostati prazno'
	},
	code: {
		type: Number,
		trim: true,
		unique:true,
		required: 'Oznaka statusa ne sme ostati prazna'
	}
});

/**
 * Validations
 */
StatusSchema.path('name').validate(function(name) {
  return !!name;
}, 'Naziv ne sme biti prazan.');
StatusSchema.path('code').validate(function(code) {
  return !!code;
}, 'Oznaka statusa ne sme ostati prazna.');

/**
 * Statics
 */
StatusSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Status', StatusSchema);