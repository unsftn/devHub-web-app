'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ArticleDH = mongoose.model('ArticleDH'),
    _ = require('lodash');

module.exports = function(ArticleDHs) {

    return {
        /**
         * Find articledh by id
         */
        articledh: function(req, res, next, id) {
            ArticleDH.load(id, function(err, articledh) {
                if (err) return next(err);
                if (!articledh) return next(new Error('Neuspesno citanje clanka: ' + id));
                req.articledh = articledh;
                next();
            });
        },

        /**
         * Create an articledh
         */
        create: function(req, res) {
            var articledh = new ArticleDH(req.body);
            console.log(articledh);
            articledh.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Ne moze da sacuva clanak'
                    });
                }

                res.json(articledh);
            });
        },
    
        /**
         * Update an articledh
         */
        update: function(req, res) {
            var articledh = req.articledh;

            articledh = _.extend(articledh, req.body);


            articledh.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva clanak'
                    });
                }

                res.json(articledh);
            });
        },
        /**
         * Delete an articledh
         */
        destroy: function(req, res) {
            var articledh = req.articledh;


            articledh.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise clanak'
                    });
                }

                res.json(articledh);
            });
        },
        /**
         * Show an articledh
         */
        show: function(req, res) {

            res.json(req.articledh);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
            ArticleDH.find({}, function(err, data) {
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
