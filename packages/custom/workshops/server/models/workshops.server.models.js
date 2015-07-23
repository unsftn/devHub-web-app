'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var WorkshopSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		//required: 'Morate uneti naziv radionice',
		trim: true
	}
});

WorkshopSchema.statics.load = function(id,cb) {
	this.findOne({
		_id: id
	}).populate('user', 'name username').exec(cb);
};

mongoose.model('Workshop', WorkshopSchema);

