'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    DocumentSch = mongoose.model('DocumentSch'),
    _ = require('lodash');

module.exports = function(DocumentSchs) {

    return {
        /**
         * Find Projekat by id
         */
        documentsch: function(req, res, next, id) {
            DocumentSch.load(id, function(err, documentsch) {
                if (err) return next(err);
                if (!documentsch) return next(new Error('Neuspesno citanje dokumenta: ' + id));
                req.documentsch = documentsch;
                next();
            });
        },

        /**
         * Create an Projekat
         */
        create: function(req, res) {
            var documentsch = new DocumentSch(req.body);
            console.log(documentsch);
            documentsch.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Ne moze da sacuva dokument'
                    });
                }

                res.json(documentsch);
            });
        },
    
        /**
         * Update an Projekat
         */
        update: function(req, res) {
            var documentsch = req.documentsch;

            documentsch = _.extend(documentsch, req.body);


            documentsch.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva dokument'
                    });
                }

                res.json(documentsch);
            });
        },
        /**
         * Delete an projekat
         */
        destroy: function(req, res) {
            var documentsch = req.documentsch;


            documentsch.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise dokument'
                    });
                }

                res.json(documentsch);
            });
        },
        /**
         * Show an projekat
         */
        show: function(req, res) {

            res.json(req.documentsch);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
            DocumentSch.find({}, function(err, data) {
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
