'use strict';

var mongoose = require('mongoose'),
	Lecture = mongoose.model('Lecture'),
	_ = require('lodash');


module.exports = function(Lectures){


	return {

		lecture: function(req, res, next, id){
			Lecture.load(id, function(err, lecture) {
                if (err) return next(err);
                if (!lecture) return next(new Error('Failed to load lecture ' + id));
                req.lecture = lecture;
                next();
            });

		},

		 create: function(req, res) {
            var lecture = new Lecture(req.body);
            // recipe.user = req.user;

            lecture.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save lecture'
                    });
                }
                //console.log("DOS'O DOVDE.");
                Lectures.events.publish('create', {
                    description: 'Created ' + req.body.name + ' lecture.'
                });

                res.json(lecture);
            });
        },
        /**
         * Update an article
         */
        update: function(req, res) {
            var lecture = req.lecture;

            lecture = _.extend(lecture, req.body);


            lecture.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update lecture'
                    });
                }

                Lectures.events.publish('update', {
                   // description: req.user.name + ' updated ' + req.body.title + ' recipe.'
                });

                res.json(lecture);
            });
        },
        /**
         * Delete an article
         */
        destroy: function(req, res) {
            var lecture = req.lecture;


            lecture.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the lecture'
                    });
                }

                Lectures.events.publish('remove', {
                    //description: req.user.name + ' deleted ' + recipe.title + ' recipe.'
                });

                res.json(lecture);
            });
        },
        /**
         * Show an article
         */
        show: function(req, res) {

            Lectures.events.publish('view', {
               // description: req.user.name + ' read ' + req.recipe.title + ' recipe.'
            });

            res.json(req.lecture);
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

            Lecture.find({}).exec(function(err, lectures) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the lectures'
                    });
                }

                console.log("ovde sam");
                console.log(lectures);

                res.json(lectures);
            });
        }



	};

}