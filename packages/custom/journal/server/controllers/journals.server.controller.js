'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Journal = mongoose.model('Journal'),
    _ = require('lodash');

module.exports = function(Journals) {

    return {
        /**
         * Find Projekat by id
         */
        journal: function(req, res, next, id) {
            Journal.load(id, function(err, journal) {
                if (err) return next(err);
                if (!journal) return next(new Error('Neuspesno citanje clanka: ' + id));
                req.journal = journal;
                next();
            });
        },

        /**
         * Create an Projekat
         */
        create: function(req, res) {
            var journal = new Journal(req.body);
            console.log(journal);
            journal.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Ne moze da sacuva clanak'
                    });
                }

                res.json(journal);
            });
        },
    
        /**
         * Update an Projekat
         */
        update: function(req, res) {
            var journal = req.journal;

            journal = _.extend(journal, req.body);


            journal.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva clanak'
                    });
                }

                res.json(journal);
            });
        },
        /**
         * Delete an projekat
         */
        destroy: function(req, res) {
            var journal = req.journal;


            journal.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise clanak'
                    });
                }

                res.json(journal);
            });
        },
        /**
         * Show an projekat
         */
        show: function(req, res) {

            res.json(req.journal);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
            Journal.find({}, function(err, data) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista clanke'
                    });
                }

                res.json(data)
            });

        }
    };
}
