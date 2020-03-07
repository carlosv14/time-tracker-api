'use strict';

var config = require('../configs/config'),
  Users = mongoose.model('User');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.key, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    User.findById(decoded.id,
      function (err, user) {
        if (err) return res.send(err);
        if (!user) return res.status(404).send("No user found.");
        let isAdmin = user.type === 'admin';
        req.userId = decoded.id;
        req.isAdmin = isAdmin;
        next();
      });
  });
}

module.exports = verifyToken;