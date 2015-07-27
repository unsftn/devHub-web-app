'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Prakse, app, auth, database) {
  var prakse = require('../controllers/praksa.server.controllers')(Prakse);

  app.route('/api/praksa')
    .get(prakse.all)
    .post(/*auth.requiresLogin, */prakse.create);
  app.route('/api/praksa/:praksaId')
    .get(auth.isMongoId, prakse.show)
    .put(auth.isMongoId, /*auth.requiresLogin,*/ /*hasAuthorization, hasPermissions, */prakse.update)
    .delete(auth.isMongoId, /*auth.requiresLogin,*/ /*hasAuthorization, */prakse.destroy);

  // Finish with setting up the articleId param
  app.param('praksaId', prakse.praksa);
};
