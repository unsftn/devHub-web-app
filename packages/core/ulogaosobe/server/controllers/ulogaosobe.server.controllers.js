'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Ulogaosobe = mongoose.model('Ulogaosobe'),
    _ = require('lodash');

module.exports = function(UlogeOsobe) {

    return {
        /**
         * Find ulogaosobe by id
         */
        ulogaosobe: function(req, res, next, id) {
            Ulogaosobe.load(id, function(err, ulogaosobe) {
                if (err) return next(err);
                if (!ulogaosobe) return next(new Error('Neuspesno citanje Uloge osobe ' + id));
                req.ulogaosobe = ulogaosobe;
                next();
            });
        },

        /**
         * Create an ulogaosobe
         */
        create: function(req, res) {
            var ulogaosobe = new Ulogaosobe(req.body);
            console.log("opis: "+req.body.opis);
            console.log("body: "+req.body);
            //ulogaosobe.user = req.user;
	    console.log("CREATE");

            ulogaosobe.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva ulogu osobe'
                    });
                }

                /*Projekti.events.publish('create', {
                    //description: req.user.name + ' created ' + req.body.naziv + ' ulogaosobe.'
                });*/

                res.json(ulogaosobe);
            });
        },
	     /**
         * Create an items
         */
	/*addItem: function(req,res) {
	 var items=[];
	$scope.addItem.push(&scope.ulogaosobe);
	 
	},*/

       /* addItem: function(req, res) {
            var items = new ulogaosobe(req.body);
            items.user = req.user;
	    console.log("CREATE");

            /*ulogaosobe.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the ulogaosobe'
                    });
                }

                Projekti.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.name + ' ulogaosobe.'
                });

                res.json(ulogaosobe);
            });*/
        //},
	
        /**
         * Update an ulogaosobe
         */
        update: function(req, res) {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@user - "+req.user.name);
            var ulogaosobe = req.ulogaosobe;

            ulogaosobe = _.extend(ulogaosobe, req.body);


            ulogaosobe.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva ulogu osobe'
                    });
                }

                UlogeOsobe.events.publish('update', {
                    description: "update uloge osobe sa nazivom " + ulogaosobe.naziv    
                    //description: req.user.name + ' updated ' + req.body.naziv + ' ulogaosobe.'
                });

                res.json(ulogaosobe);
            });
        },
        /**
         * Delete an ulogaosobe
         */
        destroy: function(req, res) {
            var ulogaosobe = req.ulogaosobe;


            ulogaosobe.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise ulogaosobe'
                    });
                }

                UlogeOsobe.events.publish('remove', {
                    description: "remove uloge osobe sa nazivom " + ulogaosobe.naziv
                    //description: req.user.name + ' deleted ' + ulogaosobe.naziv + ' ulogaosobe.'
                });

                res.json(ulogaosobe);
            });
        },
        /**
         * Show an ulogaosobe
         */
        show: function(req, res) {

            UlogeOsobe.events.publish('view', {
                description: "prikaz jedne uloge osobe"
                //description: req.user.name + ' read ' + req.ulogaosobe.naziv + ' ulogaosobe.'
            });

            res.json(req.ulogaosobe);
        },
        /**
         * List of Projekti
         */
        all: function(req, res) {
  	    console.log("FIND ALL");
         //   var query = req.acl.query('ulogaosobe');

	    //console.log(query.find({}));
            Ulogaosobe.find({}, function(err, data) {
		console.log(err);
		console.log("UlogeOsobe SIZE: " + data.length);
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista uloge osobe'
                    });
                }

                res.json(data)
            });

        }
    };
}
