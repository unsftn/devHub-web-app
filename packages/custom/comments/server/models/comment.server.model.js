'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var CommentsSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		unique:true,
		required: 'Naslov ne sme ostati prazon'
	},
	text: {
		type: String,
		default: '',
		trim: true,
		required: 'Sadrzaj ne sme ostati prazan'
	},
	posted:{
		type: Date,
		default: Date.now
	},
	author: {
		type: Schema.ObjectId,
   		ref: 'User'
	}

});

/**
 * Validations
 */
CommentsSchema.path('title').validate(function(title) {
  return !!title;
}, 'Naslov ne sme biti prazan.');
CommentsSchema.path('text').validate(function(text) {
  return !!text;
}, 'Sadrzaj ne sme biti prazan.');

/**
 * Statics
 */
CommentsSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Comment', CommentsSchema);