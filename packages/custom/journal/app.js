'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Journal = new Module('journal');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Journal.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Journal.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Journal.menus.add({
    title: 'journal example page',
    link: 'journal example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Journal.aggregateAsset('css', 'journal.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Journal.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Journal.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Journal.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Journal;
});
