'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a name for the proyect'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);