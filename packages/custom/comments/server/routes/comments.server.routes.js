'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Comments, app, auth, database) {
  var comments = require('../controllers/comments.server.controller')(Comments);

  app.route('/api/comments')
    .get(comments.all)
    .post(comments.create);
  app.route('/api/comments/:commentId')
    .get(comments.show)
    .put(comments.update)
    .delete(comments.destroy);

  // Finish with setting up the documentId param
  app.param('commentId', comments.comment);
};