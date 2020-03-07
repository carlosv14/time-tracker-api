'use strict';
var mongoose = require('mongoose'),
    Activities = mongoose.model('Activity');

exports.listAll = function (req, res) {
    Activities.find({ user: req.userId })
        .populate('project', { name: 1, _id: 1 })
        .exec(function (err, activity) {
            if (err) {
                res.send(err);
            }
            res.json(activity);
        });;
};

exports.add = function (req, res) {
    let newActivity = new Activity(req.body);
    newActivity.user = req.userId;
    newActivity.save(function (err, activity) {
        if (err) {
            res.send(err);
        }
        res.json(activity);
    });
}

exports.get = function (req, res) {
    Activities.findOne({ _id: req.params.activityId, user: req.userId })
        .populate('project', { name: 1, _id: 1 })
        .populate('user', { username: 1, _id: 1 })
        .exec(function (err, activity) {
            if (err) {
                res.send(err);
            }
            res.json(activity);
        });;
}

exports.update = function (req, res) {
    let activity = req.body;
    activity.time = 0;
    Activities.findOneAndUpdate({ _id: req.params.activityId }, activity, { new: true }, function (err, activity) {
        if (err) {
            res.send(err);
        }
        res.json(activity);
    });
}