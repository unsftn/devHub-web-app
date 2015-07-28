'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Ulogaosobe = new Module('ulogaosobe');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Ulogaosobe.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Ulogaosobe.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Ulogaosobe.menus.add({
    title: 'ulogaosobe example page',
    link: 'ulogaosobe example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Ulogaosobe.aggregateAsset('css', 'ulogaosobe.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Ulogaosobe.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Ulogaosobe.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Ulogaosobe.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Ulogaosobe;
});
