'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Statuses, app, auth, database) {
  var statuses = require('../controllers/statuses.server.controller')(Statuses);

  app.route('/api/statuses')
    .get(statuses.all)
    .post(statuses.create);
  app.route('/api/statuses/:statusId')
    .get(statuses.show)
    .put(statuses.update)
    .delete(statuses.destroy);

  // Finish with setting up the tagId param
  app.param('statusId', statuses.status);
};