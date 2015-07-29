'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var WorkshopSchema = new Schema({
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

  technology: {
    type: [String]
  },

  mentors: {
    type: [String]
  }
});

WorkshopSchema.statics.load = function(id,cb) {
	this.findOne({
		_id: id
	}).populate('user', 'name username').exec(cb);
};

mongoose.model('Workshop', WorkshopSchema);

