'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Seminar = mongoose.model('Seminar'),
    _ = require('lodash');

module.exports = function(Seminars) {

    return {
        
        seminar: function(req, res, next, id) {
            Seminar.load(id, function(err, seminar) {
                if (err) return next(err);
                if (!seminar) return next(new Error('Neuspesno učitavanje seminara ' + id));
                req.seminar = seminar;
                next();
            });
        },

        
        create: function(req, res) {
            var seminar = new Seminar(req.body);
            
	   
            seminar.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Seminar ne može da se sačuva'
                    });
                }

              

                res.json(seminar);
            });
        },
	  
        update: function(req, res) {
            
            var seminar = req.seminar;

            seminar = _.extend(seminar, req.body);


            seminar.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da ažurira seminar'
                    });
                }

                res.json(seminar);
            });
        },
       
        destroy: function(req, res) {
            var seminar = req.seminar;


            seminar.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obriše seminar'
                    });
                }


                res.json(seminar);
            });
        },
      
        show: function(req, res) {

          
            res.json(req.seminar);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
  	   
            Seminar.find({}, function(err, data) {
		
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista projekte'
                    });
                }

                res.json(data)
            });

        }
    };
}
