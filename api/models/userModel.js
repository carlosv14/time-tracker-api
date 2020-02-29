'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter a name for the user'
  },
  username: {
    type: String,
    required: 'Please enter a username'
  },
  password: {
    type: String,
    required: 'Please enter a password'
  },
  type: {
    type: String,
    enum: ['admin', 'non-admin'],
    default: 'non-admin'
  },
  team:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }
});

module.exports = mongoose.model('User', UserSchema);