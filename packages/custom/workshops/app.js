'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Workshops = new Module('workshops');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Workshops.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Workshops.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Workshops.menus.add({
    title: 'Radionice',
    link: 'all workshops',
    roles: ['authenticated'],
    menu: 'main'
  });
  Workshops.menus.add({
    title: 'Kreiraj radionicu',
    link: 'create workshop',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Workshops.aggregateAsset('css', 'workshops.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Workshops.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Workshops.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Workshops.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Workshops;
});
