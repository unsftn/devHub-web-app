'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Lecture = new Module('lecture');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Lecture.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Lecture.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Lecture.menus.add({
    title: 'lecture example page',
    link: 'lecture example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Lecture.aggregateAsset('css', 'lecture.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Lecture.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Lecture.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Lecture.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Lecture;
});
