'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Projekti, app, auth, database) {
  var projekti = require('../controllers/projekat.server.controllers')(Projekti);

  app.route('/api/projekat')
    .get(projekti.all)
    .post(/*auth.requiresLogin, */projekti.create);
  app.route('/api/projekat/:projekatId')
    .get(auth.isMongoId, projekti.show)
    .put(auth.isMongoId, auth.requiresLogin, /*hasAuthorization, hasPermissions, */projekti.update)
    .delete(auth.isMongoId, auth.requiresLogin, /*hasAuthorization, */projekti.destroy);

  // Finish with setting up the articleId param
  app.param('projekatId', projekti.projekat);
};
