'use strict';
var mongoose = require('mongoose'),
    Activities = mongoose.model('Activity');

exports.listAll = function (req, res) {
    Activities.find({}, function (err, projects) {
        if (err) {
            req.send(err);
        }
        res.json(projects);
    });
};

exports.add = function (req, res) {
    let newActivity = new Activity(req.body);
    newActivity.save(function (err, activity) {
        if (err) {
            res.send(err);
        }
        res.json(activity);
    });
}

exports.get = function (req, res) {
    Activities.findById(req.params.activityId)
        .populate('project', { name: 1, _id: 1 })
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
        if(err){
            res.send(err);
        }
        res.json(activity);
    });
}