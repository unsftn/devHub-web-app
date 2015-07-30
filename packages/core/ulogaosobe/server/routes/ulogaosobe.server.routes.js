'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Ulogaosobe, app, auth, database) {
  var ulogeosobe = require('../controllers/ulogaosobe.server.controllers')(ulogeosobe);

  app.route('/api/ulogaosobe')
    .get(ulogeosobe.all)
    .post(/*auth.requiresLogin, */ulogeosobe.create);
  app.route('/api/ulogaosobe/:ulogaosobeId')
    .get(auth.isMongoId, ulogeosobe.show)
    .put(auth.isMongoId, /*auth.requiresLogin,*/ /*hasAuthorization, hasPermissions, */ulogeosobe.update)
    .delete(auth.isMongoId, /*auth.requiresLogin,*/ /*hasAuthorization, */ulogeosobe.destroy);

  // Finish with setting up the articleId param
  app.param('ulogaosobeId', ulogeosobe.ulogaosobe);
};
