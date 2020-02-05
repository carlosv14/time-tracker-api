'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeamSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter a name for the team'
  },
  users: [
    {type: mongoose.Schema.Types.ObjectId, ref:'User'}
  ],
  projects: [
    {type: mongoose.Schema.Types.ObjectId, ref:'Project'}
  ]
});

module.exports = mongoose.model('Team', TeamSchema);