'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Journal Schema
 */
var JournalScheme = new Schema({
	number: {
		type: Number,
		unique:true,
		required: 'Broj ne sme ostati prazan.'
	},
	year: {
		type: Number,
		validate: [
			function(year) {
				return year && (year < 2015);
			}, 'Godina ne sme biti manja od tekuce'
		],
		required: 'Godina ne sme ostati prazna.'
	},
	articles: {
		type: [Schema.ObjectId],
    	ref: 'ArticleDH',
		required: 'Morate uneti barem jedan clanak.'
	}
});

/**
 * Validations
 */
JournalScheme.path('number').validate(function(number) {
  return !!number;
}, 'Broj ne sme biti prazan.');

JournalScheme.path('year').validate(function(year) {
  return !!year;
}, 'Godina ne sme biti prazna.');

JournalScheme.path('articles').validate(function(articles) {
  return !!articles;
}, 'Morate uneti najmanje jedan clanak.');

/**
 * Statics
 */
JournalScheme.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Journal', JournalScheme);