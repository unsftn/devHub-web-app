'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var SeminarSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  startDate: {
    type: Date,
    required: true,
   
  },

  endDate: {
    type: Date,
    required: true

  },

/* candidates: {
    type: [Schema.ObjectId],
    ref: 'Osoba'

  },*/

  candidates: {
    type: [String]
  },

  participants: {
    type: [String]
  },

  workshops: {
    type: [String]
  },

  location: {
    type: String
  }
 
});

/**
 * Validations
 */
SeminarSchema.path('title').validate(function(title) {
  return !!title;
}, 'Naziv ne sme biti prazan');

SeminarSchema.path('endDate').validate(function(endDate) {
  return !!endDate;
}, 'Datum kraja ne sme biti prazan');

SeminarSchema.path('startDate').validate(function(startDate) {
  return !!startDate;
}, 'Datum početka ne sme biti prazan');


SeminarSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Seminar', SeminarSchema);
