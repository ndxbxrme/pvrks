'use strict';

var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    name: String,
    image: String,
    color: String,
    slug: String,
    org: mongoose.Schema.Types.ObjectId,
    data: mongoose.Schema.Types.Mixed,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    users: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        role: Number
    }],
    units: [{
        type: String,
        startTime: Date,
        duration: Number
    }]
});

module.exports = mongoose.model('BSession', sessionSchema);