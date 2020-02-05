'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivitySchema = new Schema({
    description: {
        type: String,
        required: 'Please enter a description'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    startTime: {
        type: Date,
        required: 'Please enter start time'
    },
    endTime: {
        type: Date,
        required: 'Please enter end time'
    },
    time: {
        type: Number
    }
});

ActivitySchema.pre('save', function (next) {
    let diff = this.endTime - this.startTime
    this.time = diff / 60 / 60 / 1000;
    next();
});

ActivitySchema.pre('findOneAndUpdate', function(next){
    let diff = new Date(this.getUpdate().endTime) - new Date(this.getUpdate().startTime);
    console.log(diff);
    this.getUpdate().time = diff / 60 / 60 / 1000;
    console.log(this.getUpdate());
    next();
});


module.exports = mongoose.model('Activity', ActivitySchema);
