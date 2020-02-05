'use strict';

var mongoose = require('mongoose'),
    Users = mongoose.model('User'),
    config = require('../configs/config');

exports.listAll = function (req, res) {
    Users.find({}, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
};

exports.register = function (req, res) {
    let newUser = new Users(req.body);
    newUser.save(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.login = function (req, res) {
    Users.findOne({ username: req.body.username, password: req.body.password }, { _id: 1 }, function (err, user) {
        if (err) {
            res.send(err);
        }

        let id = JSON.stringify(user)._id;

        const token = jwt.sign({ id: id }, config.key, {
            expiresIn: 1440
        });

        res.json({
            mensaje: 'Successful Login',
            token: token
        });
    });
};
