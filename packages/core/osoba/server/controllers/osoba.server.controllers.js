'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Osoba = mongoose.model('Osoba'),
    _ = require('lodash');

module.exports = function(Osobe) {

    return {
        /**
         * Find osoba by id
         */
        osoba: function(req, res, next, id) {
            Osoba.load(id, function(err, osoba) {
                if (err) return next(err);
                if (!osoba) return next(new Error('Neuspesno citanje Osobe ' + id));
                req.osoba = osoba;
                next();
            });
        },

        /**
         * Create an osoba
         */
        create: function(req, res) {
            var osoba = new Osoba(req.body);
            console.log("opis: "+req.body.opis);
            console.log("body: "+req.body);
            //osoba.user = req.user;
	    console.log("CREATE");

            osoba.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva osobu'
                    });
                }

                /*Osobe.events.publish('create', {
                    //description: req.user.name + ' created ' + req.body.naziv + ' osoba.'
                });*/

                res.json(osoba);
            });
        },
	     /**
         * Create an items
         */
	/*addItem: function(req,res) {
	 var items=[];
	$scope.addItem.push(&scope.osoba);
	 
	},*/

       /* addItem: function(req, res) {
            var items = new osoba(req.body);
            items.user = req.user;
	    console.log("CREATE");

            /*osoba.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the osoba'
                    });
                }

                Osobe.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.name + ' osoba.'
                });

                res.json(osoba);
            });*/
        //},
	
        /**
         * Update an osoba
         */
        update: function(req, res) {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@user - "+req.user.name);
            var osoba = req.osoba;

            osoba = _.extend(osoba, req.body);


            osoba.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva osobu'
                    });
                }

                Osobe.events.publish('update', {
                    description: "update osobe sa imenom " + osoba.ime    
                    //description: req.user.name + ' updated ' + req.body.naziv + ' osoba.'
                });

                res.json(osoba);
            });
        },
        /**
         * Delete an osoba
         */
        destroy: function(req, res) {
            var osoba = req.osoba;


            osoba.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise osobu'
                    });
                }

                Osobe.events.publish('remove', {
                    description: "remove osobe sa imenom " + osoba.ime
                    //description: req.user.name + ' deleted ' + osoba.naziv + ' osoba.'
                });

                res.json(osoba);
            });
        },
        /**
         * Show an osoba
         */
        show: function(req, res) {

            Osobe.events.publish('view', {
                description: "prikaz jedne osobe"
                //description: req.user.name + ' read ' + req.osoba.naziv + ' osoba.'
            });

            res.json(req.osoba);
        },
        /**
         * List of Osobe
         */
        all: function(req, res) {
  	    console.log("FIND ALL");
         //   var query = req.acl.query('osoba');

	    //console.log(query.find({}));
            Osoba.find({}, function(err, data) {
		console.log(err);
		console.log("Osobe SIZE: " + data.length);
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista osobe'
                    });
                }

                res.json(data)
            });

        }
    };
}
