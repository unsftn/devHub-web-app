'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tags = new Module('tags');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tags.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Tags.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Tags.menus.add({
    title: 'tags example page',
    link: 'tags example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Tags.aggregateAsset('css', 'tags.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tags.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tags.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Tags.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Tags;
});
