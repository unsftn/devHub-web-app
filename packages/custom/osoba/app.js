'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Osoba = new Module('osoba');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Osoba.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Osoba.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Osoba.menus.add({
    title: 'Lista osoba',
    link: 'lista osoba',
    roles: ['authenticated'],
    menu: 'main'
  });
  Osoba.menus.add({
    title: 'Dodaj osobu',
    link: 'dodaj osobu',
    roles: ['authenticated'],
    menu: 'main'
  });

  Osoba.aggregateAsset('css', 'osoba.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Osoba.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Osoba.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Osoba.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Osoba;
});
