'use strict';
module.exports = function (app) {
    var auth = require('../controllers/authController');

    app.route("/login")
        .post(auth.login);

    app.route("/register")
        .post(auth.register);

    app.route("/logout")
        .get(auth.logout);
};
