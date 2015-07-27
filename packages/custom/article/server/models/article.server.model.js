'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var ArticleDHSchema = new Schema({
	authors: {
	    //type: [Schema.ObjectId],
    	//ref: 'User',
    	type: String,
		required: 'Morate uneti barem jednog autora.'
	},
	editors: {
	    //type: [Schema.ObjectId],
	    type: String,
    	ref: 'User'
	},
	reviewers: {
	    //type: [Schema.ObjectId],
	    type: String,
    	ref: 'User'
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Morate uneti naslov.'
	},
	abstract: {
		type: String,
		default: '',
		trim: true,
		required: 'Ovo polje je obavezno.'
	},
	tags: {
		type: [Schema.ObjectId],
    	ref: 'Tag'
	},
	documents: {
		type: [Schema.ObjectId],
    	ref: 'DocumentSch'
	},
	comments: {
		type: [Schema.ObjectId],
    	ref: 'Comment'
	},
	grade: {
		type: Number,
		default: 0,
		validate: [
			function(grade) {
				return grade && (grade < 5 && grade >0 );
			}, 'Ocena ne sme biti manja od 0 i mora biti veca od 5'
		]
	}
});

/**
 * Validations
 */
ArticleDHSchema.path('authors').validate(function(authors) {
  return !!authors;
}, 'Morate uneti barem jednog autora.');

ArticleDHSchema.path('title').validate(function(title) {
  return !!title;
}, 'Morate uneti naslov.');

ArticleDHSchema.path('abstract').validate(function(abstract) {
  return !!abstract;
}, 'Morate uneti abstrakt.');

/**
 * Statics
 */
ArticleDHSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('ArticleDH', ArticleDHSchema);