'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(FileDHs, app, auth, database) {
  var filedhs = require('../controllers/files.server.controller')(FileDHs);

  app.route('/api/files')
    .get(filedhs.all)
    .post(filedhs.create);
  app.route('/api/files/:fileID')
    .get(filedhs.show)
    .put(filedhs.update)
    .delete(filedhs.destroy);

  // Finish with setting up the documentId param
  app.param('fileID', filedhs.filedh);
};