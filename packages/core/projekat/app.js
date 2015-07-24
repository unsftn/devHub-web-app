'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
//////////////////PROVERITI DA LI KAO MODULE PISATI 
//////////////////'projekat' ILI 'Projekti'!!!!!
var Projekti = new Module('projekat');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Projekti.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Projekti.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Projekti.menus.add({
    title: 'Lista projekata',
    link: 'lista projekata',
    roles: ['authenticated'],
    menu: 'main'
  });
  Projekti.menus.add({
    title: 'Dodaj novi projekat',
    link: 'dodaj projekat',
    roles: ['authenticated'],
    menu: 'main'
  });

  Projekti.aggregateAsset('css', 'projekat.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Projekti.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Projekti.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Projekti.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Projekti;
});
