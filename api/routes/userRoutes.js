'use strict';

module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/users')
    .get(user.listAll);
};
