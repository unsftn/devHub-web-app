'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Praksa = new Module('praksa');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Praksa.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Praksa.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Praksa.menus.add({
    title: 'Lista praksi',
    link: 'lista praksi',
    roles: ['authenticated'],
    menu: 'main'
  });
  Praksa.menus.add({
    title: 'Dodaj novu praksu',
    link: 'dodaj praksu',
    roles: ['authenticated'],
    menu: 'main'
  });

  Praksa.aggregateAsset('css', 'praksa.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Praksa.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Praksa.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Praksa.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Praksa;
});
