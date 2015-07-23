'use strict';


module.exports = function(Seminars, app, auth, database) {
  var seminars = require('../controllers/seminar.server.controller')(Seminars);

  app.route('/api/seminar')
    .get(seminars.all)
    .post(/*auth.requiresLogin, */seminars.create);
  app.route('/api/seminar/:seminarId')
    .get(auth.isMongoId, seminars.show)
    .put(auth.isMongoId, auth.requiresLogin, /*hasAuthorization, hasPermissions, */seminars.update)
    .delete(auth.isMongoId, auth.requiresLogin, /*hasAuthorization, */seminars.destroy);

  // Finish with setting up the articleId param
  app.param('seminarId', seminars.seminar);
};
