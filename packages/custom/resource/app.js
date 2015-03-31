'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Resource = new Module('resource');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Resource.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Resource.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Resource.menus.add({
    title: 'Recursos',
    link: 'resource example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Resource.aggregateAsset('css', 'resource.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Resource.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Resource.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Resource.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Resource;
});
