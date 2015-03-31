'use strict';

var calls = require('../controllers/calls');

var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.call.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Calls, app, auth) {

  app.route('/calls')
    .get(calls.all)
    .post(auth.requiresLogin, calls.create);
  app.route('/calls/:callId')
    .get(auth.isMongoId, calls.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, calls.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, calls.destroy);

    app.param('callId', calls.call);
};
