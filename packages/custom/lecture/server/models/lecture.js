'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var LectureSchema = new Schema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	link: {
		type: String
	},
	keywords: {
		type: [String]
	},
	accepted: {
		type: Boolean
	},
	speakers: {
		type: [String]
	}

});


LectureSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Lecture', LectureSchema);