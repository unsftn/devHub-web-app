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
    //required: true,
   // unique: true,
    trim: true
  },
  
  startDate: {
    type: Date
    

  },
  endDate: {
    type: Date
    
  }
 
});

/**
 * Validations
 */
/*SeminarSchema.path('title').validate(function(title) {
  return !!title;
}, 'Naziv ne sme biti prazan');
*/

SeminarSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Seminar', SeminarSchema);
