'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Praksa Schema
 */
var PraksaSchema = new Schema({
  naziv: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  datumPocetka: {
    type: Date,
    default: Date.now
  },
  datumKraja: {
    type: Date,
    default: Date.now
  },
  tehnologije: {
    type: [String],
    trim: true,
    default: ""
  },
  projekti: {
    /*type: [Schema.ObjectId],
    ref: 'Projekat',*/
    type: [String],   //string mi predstavlja NAZIV projekta!!!
    //required: true,
    trim: true
  },
  //////////////////////////////////////
  //ODRADTI SLEDECE ATRIBUTE KOJI TREBA DA BUDU LISTE -->OSOBA<--
  
  //-----MENTORI
  mentori: {
    type: [String],
    trim: true,
    default: []
  },
  
  //-----UCESNICI
  ucesnici: {
    type: [String],
    trim: true,
    default: []
  },

  //-----KANDIDATI
  kandidati: {
    type: [String],
    trim: true,
    default: []
  },

  //////////////////////////////////////
  lokacija: {
    type: String,
    trim: true,
    default: ""
  }
});

/**
 * Validations
 */
PraksaSchema.path('naziv').validate(function(naziv) {
  return !!naziv;
}, 'Naziv ne sme biti prazan');

/*PraksaSchema.path('desc').validate(function(desc) {
  return !!desc;
}, 'Description cannot be blank');*/

/**
 * Statics
 */
PraksaSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })/*.populate('user', 'name username')*/.exec(cb);
};

mongoose.model('Praksa', PraksaSchema);
