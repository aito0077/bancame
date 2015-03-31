'use strict';

var resources = require('../controllers/resources');

var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.resource.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Resources, app, auth) {

  app.route('/resources')
    .get(resources.all)
    .post(auth.requiresLogin, resources.create);
  app.route('/resources/:resourceId')
    .get(auth.isMongoId, resources.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, resources.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, resources.destroy);

    app.param('resourceId', resources.resource);
};



