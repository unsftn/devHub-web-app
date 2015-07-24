'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var TagSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		unique:true,
		required: 'Naziv ne sme ostati prazan'
	},
	description: {
		type: String,
		default: '',
		trim: true,
	}
});

/**
 * Validations
 */
TagSchema.path('name').validate(function(name) {
  return !!name;
}, 'Naziv ne sme biti prazan.');

/**
 * Statics
 */
TagSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Tag', TagSchema);