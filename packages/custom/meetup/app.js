'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Meetup = new Module('meetup');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Meetup.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Meetup.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Meetup.menus.add({
    title: 'meetup example page',
    link: 'all meetups',
    menu: 'main'
  });*/
  Meetup.menus.add({
    title: 'Lista meetup-a',
    link: 'all meetups',
    roles: ['authenticated'],
    menu: 'main'
  });  
  Meetup.menus.add({
    title: 'Dodaj meetup',
    link: 'create meetup',
    roles: ['authenticated'],
    menu: 'main'
  });  
  Meetup.aggregateAsset('css', 'meetup.css');
    Meetup.aggregateAsset('js', '../lib/ngmap/build/scripts/ng-map.js', {
      absolute: false,
      global: true
    });


  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Meetup.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Meetup.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Meetup.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Meetup;
});
