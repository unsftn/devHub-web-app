'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Journal Schema
 */
var FileDHSchema = new Schema({
	filePath: {
		type: String, 
		required: 'Morate odabrati fajl.' 
	},
	date: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		unique: true,
		required: 'Morate uneti ime i ono mora biti jedinstveno!'
	}
});

/**
 * Validations
 */
FileDHSchema.path('filePath').validate(function(filePath) {
  return !!filePath;
}, 'Fajl mora biti uploadovan.');

FileDHSchema.path('name').validate(function(name) {
  return !!name;
}, 'Naziv mora biti unet i mora biti jedinstven.');


/**
 * Statics
 */
FileDHSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('FileDH', FileDHSchema);