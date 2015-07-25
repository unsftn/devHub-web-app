'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var MeetupSchema = new Schema({

	name: {
		type: String
	},
	comments: {
		type: [String] 
	},
	date: {
		type: String
	},
	location:{
		type: String
	},
	lectures:{
		type: [String]
		//type: [LectureSchema],
		//ref: 'Lecture'
	}

});

MeetupSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Meetup', MeetupSchema);
