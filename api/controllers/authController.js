'use strict';

var mongoose = require('mongoose'),
    Users = mongoose.model('User'),
    config = require('../configs/config');


exports.login = function (req, res) {
    Users.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        if(user == null){
            return res.json({
                auth: false,
                message: 'User or password is incorrect!',
                token: null
            });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.json({
                auth: false,
                message: 'User or password is incorrect!',
                token: null
            });
        }

        const token = jwt.sign({ id: user._id }, config.key, {
            expiresIn: 1440
        });

        return res.json({
            auth: true,
            message: 'Successful Login',
            token: token,
            isAdmin : user.type === "admin"
        });
    });
};

exports.register = function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let newUser = new Users(req.body);
    newUser.password = hashedPassword;
    newUser.save(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Registered user successfully'
        });
    });
};

exports.logout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};