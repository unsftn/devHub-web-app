'use strict';


module.exports = function(Seminars, app, auth, database) {
  var seminars = require('../controllers/seminar.server.controller')(Seminars);

  app.route('/api/seminars')
    .get(seminars.all)
    .post(seminars.create);
  app.route('/api/seminars/:seminarId')
    .get(auth.isMongoId, seminars.show)
    .put(auth.isMongoId, seminars.update)
    .delete(auth.isMongoId,seminars.destroy);

  // Finish with setting up the articleId param
  app.param('seminarId', seminars.seminar);
};
