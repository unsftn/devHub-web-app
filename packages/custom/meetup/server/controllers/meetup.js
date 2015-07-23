'use strict';

var mongoose = require('mongoose'),
	Meetup = mongoose.model('Meetup'),
	_ = require('lodash');


module.exports = function(Meetups){


	return {

		recipe: function(req, res, next, id){
			Meetup.load(id, function(err, meetup) {
                if (err) return next(err);
                if (!meetup) return next(new Error('Failed to load meetup ' + id));
                req.meetup = meetup;
                next();
            });

		},

		 create: function(req, res) {
            var meetup = new Meetup(req.body);
            // recipe.user = req.user;

            meetup.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save meetup'
                    });
                }
                //console.log("DOS'O DOVDE.");
                Meetups.events.publish('create', {
                    description: 'Created ' + req.body.name + ' meetup.'
                });

                res.json(meetup);
            });
        },
        /**
         * Update an article
         */
        update: function(req, res) {
            var meetup = req.meetup;

            meetup = _.extend(meetup, req.body);


            meetup.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update meetup'
                    });
                }

                Recipes.events.publish('update', {
                   // description: req.user.name + ' updated ' + req.body.title + ' recipe.'
                });

                res.json(meetup);
            });
        },
        /**
         * Delete an article
         */
        destroy: function(req, res) {
            var meetup = req.meetup;


            meetup.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the meetup'
                    });
                }

                Meetups.events.publish('remove', {
                    //description: req.user.name + ' deleted ' + recipe.title + ' recipe.'
                });

                res.json(meetup);
            });
        },
        /**
         * Show an article
         */
        show: function(req, res) {

            Meetups.events.publish('view', {
               // description: req.user.name + ' read ' + req.recipe.title + ' recipe.'
            });

            res.json(req.meetup);
        },
        /**
         * List of Articles
         */
        all: function(req, res) {
            //var query = req.acl.query('Recipe');



            /*
            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, recipes) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the recipes'
                    });
                }

                res.json(recipes)
            });
            */

            Meetup.find({}).exec(function(err, meetups) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the meetups'
                    });
                }

                console.log("ovde sam");
                console.log(meetups);

                res.json(meetups);
            });
        }



	};

}