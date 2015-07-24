'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Journals, app, auth, database) {
  var journals = require('../controllers/journals.server.controller')(Journals);

  app.route('/api/journals')
    .get(journals.all)
    .post(journals.create);
  app.route('/api/journals/:journalId')
    .get(journals.show)
    .put(journals.update)
    .delete(journals.destroy);

  // Finish with setting up the documentId param
  app.param('journalId', journals.journal);
};