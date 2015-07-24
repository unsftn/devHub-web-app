'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(ArticleDHs, app, auth, database) {
  var articledhs = require('../controllers/articles.server.controller')(ArticleDHs);

  app.route('/api/jarticles')
    .get(articledhs.all)
    .post(articledhs.create);
  app.route('/api/jarticles/:articleId')
    .get(articledhs.show)
    .put(articledhs.update)
    .delete(articledhs.destroy);

  // Finish with setting up the documentId param
  app.param('articleId', articledhs.articledh);
};