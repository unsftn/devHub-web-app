'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Seminars = new Module('seminars');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Seminars.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Seminars.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Seminars.menus.add({
    title: 'Seminari',
    link: 'all seminars',
    roles: ['authenticated'],
    menu: 'main'
  });
  Seminars.menus.add({
    title: 'Create seminar',
    link: 'create seminar',
    roles: ['authenticated'],
    menu: 'main'
  });
  Seminars.menus.add({
    title: 'apply',
    link: 'application form',
    roles: ['authenticated'],
    menu: 'main'
  });
 
  
  
  
  Seminars.aggregateAsset('css', 'seminars.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Seminars.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Seminars.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Seminars.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Seminars;
});
