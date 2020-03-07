'use strict';

var mongoose = require('mongoose'),
    Users = mongoose.model('User');

exports.listAll = function (req, res, next) {
    console.log(req.isAdmin);
    Users.find({},  { password: 0 }, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
};