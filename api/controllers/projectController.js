'use strict';
var mongoose = require('mongoose'),
    Projects = mongoose.model('Project');

exports.listAll = function (req, res) {
    Projects.find({}, function (err, projects) {
        if (err) {
            req.send(err);
        }
        res.json(projects);
    });
};

exports.add = function (req, res) {
    let newProject = new Project(req.body);
    newProject.save(function (err, project) {
        if (err) {
            res.send(err);
        }
        res.json(project);
    });
}

exports.get = function (req, res) {
    Projects.findById(req.params.projectId)
        .populate('team', { name: 1, _id: 1 })
        .exec(function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });;
}

exports.update = function (req, res) {
    Projects.findOneAndUpdate({ _id: req.params.projectId }, req.body, { new: true }, function (err, project) {
        if(err){
            res.send(err);
        }
        res.json(project);
    });
}