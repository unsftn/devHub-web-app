'use strict';

module.exports = function(Workshops, app, auth, database) {
  
  var workshops = require('../controllers/workshops.server.controllers')(Workshops);

  app.route('/api/workshops')
    .get(workshops.all)
    .post(workshops.create);
  app.route('/api/workshops/:workshopId')
    .get(auth.isMongoId, workshops.show)
    .put(auth.isMongoId, workshops.update)
    .delete(auth.isMongoId, workshops.destroy);

  // Finish with setting up the articleId param
  app.param('workshopId', workshops.workshop);
};
