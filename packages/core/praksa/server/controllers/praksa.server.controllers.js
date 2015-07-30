'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Praksa = mongoose.model('Praksa'),
    _ = require('lodash');

module.exports = function(Prakse) {

    return {
        /**
         * Find Praksa by id
         */
        praksa: function(req, res, next, id) {
            Praksa.load(id, function(err, praksa) {
                if (err) return next(err);
                if (!praksa) return next(new Error('Neuspesno citanje Praksa ' + id));
                req.praksa = praksa;
                next();
            });
        },

        /**
         * Create an Praksa
         */
        create: function(req, res) {
            var praksa = new Praksa(req.body);
            console.log("opis: "+req.body.opis);
            console.log("body: "+req.body);
            //Praksa.user = req.user;
	    console.log("CREATE");

            praksa.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva praksu'
                    });
                }

                /*Projekti.events.publish('create', {
                    //description: req.user.name + ' created ' + req.body.naziv + ' Praksa.'
                });*/

                res.json(praksa);
            });
        },
	     /**
         * Create an items
         */
	/*addItem: function(req,res) {
	 var items=[];
	$scope.addItem.push(&scope.Praksa);
	 
	},*/

       /* addItem: function(req, res) {
            var items = new Praksa(req.body);
            items.user = req.user;
	    console.log("CREATE");

            /*Praksa.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the Praksa'
                    });
                }

                Projekti.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.name + ' Praksa.'
                });

                res.json(Praksa);
            });*/
        //},
	
        /**
         * Update an Praksa
         */
        update: function(req, res) {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@user - "+req.user.name);
            var praksa = req.praksa;

            praksa = _.extend(praksa, req.body);


            praksa.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva praksu'
                    });
                }

                Prakse.events.publish('update', {
                    description: "update prakse sa nazivom " + praksa.naziv    
                    //description: req.user.name + ' updated ' + req.body.naziv + ' Praksa.'
                });

                res.json(praksa);
            });
        },
        /**
         * Delete an Praksa
         */
        destroy: function(req, res) {
            var praksa = req.praksa;


            praksa.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise praksu'
                    });
                }

                Prakse.events.publish('remove', {
                    description: "remove prakse sa nazivom " + praksa.naziv
                    //description: req.user.name + ' deleted ' + Praksa.naziv + ' Praksa.'
                });

                res.json(praksa);
            });
        },
        /**
         * Show an Praksa
         */
        show: function(req, res) {

            Prakse.events.publish('view', {
                description: "prikaz jedne prakse"
                //description: req.user.name + ' read ' + req.Praksa.naziv + ' Praksa.'
            });

            res.json(req.praksa);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
  	    console.log("FIND ALL");
         //   var query = req.acl.query('Praksa');

	    //console.log(query.find({}));
            Praksa.find({}, function(err, data) {
		console.log(err);
		console.log("Prakse SIZE: " + data.length);
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista prakse'
                    });
                }

                res.json(data)
            });

        }
    };
}
