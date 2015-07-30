'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var DocumentSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		//unique:true,
		required: 'Ime ne sme ostati prazno'
	},
	description: {
		type: String,
		default: '',
		trim: true,
	},
	link: {
		type: String,
		default: '',
		trim: true,
	},
	file: {
		//type: Schema.ObjectId,
		type:String
    	//ref: 'FileDH',
	}
});

/**
 * Validations
 */
DocumentSchema.path('name').validate(function(name) {
  return !!name;
}, 'Naziv ne sme biti prazan.');

/**
 * Statics
 */
DocumentSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('DocumentSch', DocumentSchema);