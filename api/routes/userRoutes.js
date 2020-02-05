'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route("/login")
    .post(user.login);

  app.route('/users')
    .get(user.listAll)
    .post(user.register);
};
