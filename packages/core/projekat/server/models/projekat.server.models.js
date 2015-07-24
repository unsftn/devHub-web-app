'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Projekat Schema
 */
var ProjekatSchema = new Schema({
  naziv: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  opis: {
    type: String,
    required: true,
    trim: true
  },
  sadrzaj: {
    type: String,
    required: true,
    trim: true
  },
  //////////////////////////////////////
  //ODRADTI SLEDECE ATRIBUTE KOJI TREBA DA BUDU LISTE -->OSOBA<--
  
  //-----MENTORI
  
  //-----UCESNICI
  
  //////////////////////////////////////
  datumPocetka: {
    type: Date,
    default: Date.now
  },
  datumKraja: {
    type: Date,
    default: Date.now
  },
  linkRepozitorijuma: {
    type: String,
    trim: true,
    default: ""
  },
  komentari: {
    type: [String],
    trim: true,
    default: ""
  },
  status: {
    type: String,
    trim: true,
    default: ""
  }
});

/**
 * Validations
 */
ProjekatSchema.path('naziv').validate(function(naziv) {
  return !!naziv;
}, 'Naziv ne sme biti prazan');

/*ProjekatSchema.path('desc').validate(function(desc) {
  return !!desc;
}, 'Description cannot be blank');*/

/**
 * Statics
 */
ProjekatSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })/*.populate('user', 'name username')*/.exec(cb);
};

mongoose.model('Projekat', ProjekatSchema);
