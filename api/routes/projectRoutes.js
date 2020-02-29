'use strict';
module.exports = function (app) {
    var project = require('../controllers/projectController');

    app.route('/projects')
        .get(project.listAll)
        .post(project.add);

    app.route('/projects/:projectId')
        .put(project.update)
        .get(project.get);
};
