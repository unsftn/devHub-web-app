'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Tags, app, auth, database) {
  var tags = require('../controllers/tags.server.controller')(Tags);

  app.route('/api/tags')
    .get(tags.all)
    .post(tags.create);
  app.route('/api/tags/:tagId')
    .get(tags.show)
    .put(tags.update)
    .delete(tags.destroy);

  // Finish with setting up the tagId param
  app.param('tagId', tags.tag);
};