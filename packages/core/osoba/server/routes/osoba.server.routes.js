'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Osobe, app, auth, database) {
  var osobe = require('../controllers/osoba.server.controllers')(osobe);

  app.route('/api/osoba')
    .get(osobe.all)
    .post(/*auth.requiresLogin, */osobe.create);
  app.route('/api/osoba/:osobaId')
    .get(auth.isMongoId, osobe.show)
    .put(auth.isMongoId, /*auth.requiresLogin,*/ /*hasAuthorization, hasPermissions, */osobe.update)
    .delete(auth.isMongoId, /*auth.requiresLogin,*/ /*hasAuthorization, */osobe.destroy);

  // Finish with setting up the articleId param
  app.param('osobaId', osobe.osoba);
};
