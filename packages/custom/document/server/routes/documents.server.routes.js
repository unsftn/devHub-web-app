'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Documents, app, auth, database) {
  var documents = require('../controllers/documents.server.controller')(Documents);

  app.route('/api/documents')
    .get(documents.all)
    .post(documents.create);
  app.route('/api/documents/:documentId')
    .get(documents.show)
    .put(documents.update)
    .delete(documents.destroy);

  // Finish with setting up the documentId param
  app.param('documentId', documents.documentsch);
};