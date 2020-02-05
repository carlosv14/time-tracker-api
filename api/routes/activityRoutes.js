'use strict';
module.exports = function (app) {
    var activity = require('../controllers/activityController');

    app.route("/activities")
        .post(activity.add)
        .get(activity.listAll);

    app.route("/activities/:activityId")
        .put(activity.update)
        .get(activity.get);

};
