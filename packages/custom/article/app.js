'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Article = new Module('article');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Article.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Article.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Article.menus.add({
    title: 'article example page',
    link: 'article example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  Article.menus.add({
    title: 'Lista clanaka',
    link: 'all articles',
    roles: ['authenticated'],
    menu: 'main'
  });
  Article.menus.add({
    title: 'Dodaj clanak',
    link: 'create article',
    roles: ['authenticated'],
    menu: 'main'
  });
  //Article.angularDependencies(['angular-redactor']);
  
  Article.aggregateAsset('css', 'article.css');
  Article.aggregateAsset('js', '../lib/angular-redactor/angular-redactor.js', {
        absolute: false,
        global: true
    });
  Article.aggregateAsset('js', '../lib/angular-redactor/angular-redactor-9.x.js', {
        absolute: false,
        global: true
    });


  Article.aggregateAsset('js', '../lib/ng-file-upload/ng-file-upload.min.js', {
        absolute: false,
        global: true
    });
     Article.aggregateAsset('js', '../lib/ng-file-upload/ng-file-upload-shim.js', {
        absolute: false,
        global: true
    });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Article.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Article.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Article.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Article;
});
