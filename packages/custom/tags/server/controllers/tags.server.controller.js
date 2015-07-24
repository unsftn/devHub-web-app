'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tag = mongoose.model('Tag'),
    _ = require('lodash');

module.exports = function(Tags) {

    return {
        /**
         * Find Tag by id
         */
        tag: function(req, res, next, id) {
            Tag.load(id, function(err, tag) {
                if (err) return next(err);
                if (!tag) return next(new Error('Neuspesno citanje taga: ' + id));
                req.tag = tag;
                next();
            });
        },

        /**
         * Create an Tag
         */
        create: function(req, res) {
            var tag = new Tag(req.body);

            tag.save(function(err) {
                if (err) {

                    return res.status(500).json({
                        error: 'Ne moze da sacuva dokument'
                    });
                }

                res.json(tag);
            });
        },
    
        /**
         * Update an tag
         */
        update: function(req, res) {
            var tag = req.tag;

            tag = _.extend(tag, req.body);


            tag.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva dokument'
                    });
                }

                res.json(tag);
            });
        },
        /**
         * Delete an tag
         */
        destroy: function(req, res) {
            var tag = req.tag;


            tag.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise dokument'
                    });
                }

                res.json(tag);
            });
        },
        /**
         * Show an tag
         */
        show: function(req, res) {

            res.json(req.tag);
        },
        /**
         * List of tags
         */
        all: function(req, res) {
            Tag.find({}, function(err, data) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista dokmente'
                    });
                }

                res.json(data)
            });

        }
    };
}
