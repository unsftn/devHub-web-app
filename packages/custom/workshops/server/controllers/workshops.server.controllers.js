'use strict';

var mongoose = require('mongoose'),
	Workshop = mongoose.model('Workshop'),
	_ = require('lodash');

module.exports = function(Workshops) {

	return {

		workshop: function(req,res,next,id) {
			Workshop.load(id, function(err,workshop){
				if (err) return next(err);
				if (!workshop) return next(new Error('Nemoguće je pokrenuti radionicu ' + id));
				req.workshop = workshop;
				next();
			});
		},

		create: function(req,res) {
			var workshop = new Workshop(req.body);
		//	workshop.user = req.user;
			console.log("\n\n\n\n");
			workshop.save(function(err){
				if(err) {
					return res.status(500).json({
						error: 'Nemoguće je sačuvati radionicu'
					});
				}
				res.json(workshop);
			});
		},

		update: function(req,res) {
			var workshop = req.workshop;

			workshop = _.extend(workshop, req.body);

			workshop.save(function(err) {
				if(err) {
					return res.status(500).json({
						error: 'Nemoguće je ažurirati radionicu!'
					});
				}
				res.json(workshop);

			});
		},

		destroy: function(req,res) {
			var workshop = req.workshop;

			workshop.remove(function(err){
				if (err) {
					return res.status(500).json({
						error: 'Nemoguće je obrisati radionicu!'
					});
				}
				res.json(workshop);
			});
		},

		show: function(req, res) {
			res.json(req.workshop);
		},

		all: function(req,res) {
        
            Workshop.find({}, function(err, data) {
			console.log(err);
                if (err) {
                    return res.status(500).json({
                        error: 'Nemoguće je izlistati seminare'
                    });
                }

                res.json(data)
            });

		}
	};
} 