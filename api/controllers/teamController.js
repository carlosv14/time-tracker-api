'use strict';
var mongoose = require('mongoose'),
    Teams = mongoose.model('Team');

exports.listAll = function (req, res) {
    Teams.find({}, function (err, teams) {
        if (err) {
            req.send(err);
        }
        res.json(teams);
    });
};

exports.add = function (req, res) {
    let newTeam = new Team(req.body);
    newTeam.save(function (err, team) {
        if (err) {
            res.send(err);
        }
        res.json(team);
    });
}

exports.get = function (req, res) {
    Teams.findById(req.params.teamId)
        .populate('users', { username: 1, name: 1, _id: 1 })
        .exec(function (err, team) {
            if (err) {
                res.send(err);
            }
            res.json(team);
        });;
}

exports.update = function (req, res) {
    Teams.findOneAndUpdate({ _id: req.params.teamId }, req.body, { new: true }, function (err, team) {
        if(err){
            res.send(err);
        }
        res.json(team);
    });
}