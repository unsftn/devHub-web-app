'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Statuses = new Module('statuses');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Statuses.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Statuses.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Statuses.menus.add({
    title: 'statuses example page',
    link: 'statuses example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Statuses.aggregateAsset('css', 'statuses.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Statuses.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Statuses.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Statuses.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Statuses;
});
