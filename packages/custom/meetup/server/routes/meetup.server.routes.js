'use strict';

// Article authorization helpers

module.exports = function(Meetups, app, auth) {
  
  var meetups = require('../controllers/meetup.server.controller')(Meetups);

  app.route('/api/meetups')
    .get(meetups.all)
    .post(meetups.create);

  app.route('/api/meetups/:meetupId')
    .get(meetups.show)
    .put(meetups.update)
    .delete(meetups.destroy);

  // Finish with setting up the articleId param
  //app.param('meetupId', meetups.meetup);
};

/*'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
/*
module.exports = function(Meetup, app, auth, database) {

  app.get('/api/meetup/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/meetup/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/meetup/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/meetup/example/render', function(req, res, next) {
    Meetup.render('index', {
      package: 'meetup'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};*/
