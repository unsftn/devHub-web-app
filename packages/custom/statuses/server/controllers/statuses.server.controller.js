'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Status = mongoose.model('Status'),
    _ = require('lodash');

module.exports = function(Statuses) {

    return {
        /**
         * Find status by id
         */
        status: function(req, res, next, id) {
            Status.load(id, function(err, status) {
                if (err) return next(err);
                if (!status) return next(new Error('Neuspesno citanje statusa: ' + id));
                req.status = status;
                next();
            });
        },

        /**
         * Create an status
         */
        create: function(req, res) {
            var status = new Status(req.body);

            status.save(function(err) {
                if (err) {

                    return res.status(500).json({
                        error: 'Ne moze da sacuva status'
                    });
                }

                res.json(status);
            });
        },
    
        /**
         * Update an status
         */
        update: function(req, res) {
            var status = req.status;

            status = _.extend(status, req.body);


            status.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva status'
                    });
                }

                res.json(status);
            });
        },
        /**
         * Delete an status
         */
        destroy: function(req, res) {
            var status = req.status;


            status.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise status'
                    });
                }

                res.json(status);
            });
        },
        /**
         * Show an status
         */
        show: function(req, res) {

            res.json(req.status);
        },
        /**
         * List of status
         */
        all: function(req, res) {
            Status.find({}, function(err, data) {
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
