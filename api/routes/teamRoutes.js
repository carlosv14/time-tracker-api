'use strict';
module.exports = function (app) {
    var team = require('../controllers/teamController');

    app.route('/teams')
        .get(team.listAll)
        .post(team.add);

    app.route('/teams/:teamId')
        .put(team.update)
        .get(team.get);
};
