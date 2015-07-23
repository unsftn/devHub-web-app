'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Projekat = mongoose.model('Projekat'),
    _ = require('lodash');

module.exports = function(Projekti) {

    return {
        /**
         * Find Projekat by id
         */
        projekat: function(req, res, next, id) {
            Projekat.load(id, function(err, projekat) {
                if (err) return next(err);
                if (!projekat) return next(new Error('Neuspesno citanje Projekta ' + id));
                req.projekat = projekat;
                next();
            });
        },

        /**
         * Create an Projekat
         */
        create: function(req, res) {
            var projekat = new Projekat(req.body);
            console.log("opis: "+req.body.opis);
            console.log("body: "+req.body);
            //Projekat.user = req.user;
	    console.log("CREATE");

            projekat.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva projekat'
                    });
                }

                /*Projekti.events.publish('create', {
                    //description: req.user.name + ' created ' + req.body.naziv + ' Projekat.'
                });*/

                res.json(projekat);
            });
        },
	     /**
         * Create an items
         */
	/*addItem: function(req,res) {
	 var items=[];
	$scope.addItem.push(&scope.Projekat);
	 
	},*/

       /* addItem: function(req, res) {
            var items = new Projekat(req.body);
            items.user = req.user;
	    console.log("CREATE");

            /*Projekat.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the Projekat'
                    });
                }

                Projekti.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.name + ' Projekat.'
                });

                res.json(Projekat);
            });*/
        //},
	
        /**
         * Update an Projekat
         */
        update: function(req, res) {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@user - "+req.user.name);
            var projekat = req.projekat;

            projekat = _.extend(projekat, req.body);


            projekat.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva projekat'
                    });
                }

                Projekti.events.publish('update', {
                    description: req.user.name + ' updated ' + req.body.naziv + ' projekat.'
                });

                res.json(projekat);
            });
        },
        /**
         * Delete an projekat
         */
        destroy: function(req, res) {
            var projekat = req.projekat;


            projekat.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise projekat'
                    });
                }

                Projekti.events.publish('remove', {
                    description: req.user.name + ' deleted ' + projekat.naziv + ' projekat.'
                });

                res.json(projekat);
            });
        },
        /**
         * Show an projekat
         */
        show: function(req, res) {

            Projekti.events.publish('view', {
                description: req.user.name + ' read ' + req.projekat.naziv + ' projekat.'
            });

            res.json(req.projekat);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
  	    console.log("FIND ALL");
         //   var query = req.acl.query('projekat');

	    //console.log(query.find({}));
            Projekat.find({}, function(err, data) {
		console.log(err);
		console.log("Projekti SIZE: " + data.length);
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
