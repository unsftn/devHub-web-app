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
     fieldname:{
		   type: String
	   },
     originalname:{
		   type: String
	   },
     name: {
		   type: String
	   },
     encoding:{
		   type: String
	   },
     mimetype: {
		   type: String
	   },
     path: {
		   type: String
	   },
     extension: {
		   type: String
	   },
     size: {
		   type: String
	   },
         date: {
                 type: Date,
                 default: Date.now()
         }
});


/**
 * Statics
 */
FileDHSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('FileDH', FileDHSchema);