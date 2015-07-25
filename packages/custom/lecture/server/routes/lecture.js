'use strict';

// Article authorization helpers

module.exports = function(Lectures, app, auth) {

  var lectures = require('../controllers/lecture')(Lectures);

  app.route('/api/lectures')
    .get(lectures.all)
    .post(lectures.create);

  app.route('/api/lectures/:lectureId')
    .get(lectures.show)
    .put(lectures.update)
    .delete(lectures.destroy);

  // Finish with setting up the articleId param
  app.param('lectureId', lectures.lecture);
};