'use strict';
module.exports = function (app) {
    var team = require('../controllers/projectController');

    app.route('/projects')
        .get(team.listAll)
        .post(team.add);

    app.route('/projects/:projectId')
        .put(team.update)
        .get(team.get);
};
