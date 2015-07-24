'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    _ = require('lodash');

module.exports = function(Comments) {

    return {
        /**
         * Find comment by id
         */
        comment: function(req, res, next, id) {
            Comment.load(id, function(err, comment) {
                if (err) return next(err);
                if (!comment) return next(new Error('Neuspesno citanje komentara: ' + id));
                req.comment = comment;
                next();
            });
        },

        /**
         * Create an comment
         */
        create: function(req, res) {
            var comment = new Comment(req.body);
            console.log(documentsch);
            comment.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Ne moze da sacuva komentar'
                    });
                }

                res.json(comment);
            });
        },
    
        /**
         * Update an comment
         */
        update: function(req, res) {
            var comment = req.comment;

            comment = _.extend(comment, req.body);


            comment.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva komentar'
                    });
                }

                res.json(comment);
            });
        },
        /**
         * Delete an comment
         */
        destroy: function(req, res) {
            var comment = req.comment;


            comment.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise komentar'
                    });
                }

                res.json(comment);
            });
        },
        /**
         * Show an comment
         */
        show: function(req, res) {

            res.json(req.comment);
        },
        /**
         * List of comments
         */
        all: function(req, res) {
            Comment.find({}, function(err, data) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista comment'
                    });
                }

                res.json(data)
            });

        }
    };
}
