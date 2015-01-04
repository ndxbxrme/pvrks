'use strict';

var mongoose = require('mongoose');

var sessionUnitSchema = mongoose.Schema({
    type: String,
    name: String,
    duration: Number,
    isolate: Boolean,
    needsModeration: Boolean
});
var sessionSchema = mongoose.Schema({
    name: String,
    image: String,
    color: String,
    slug: String,
    startDate: Date,
    endDate: Date,
    epochStart: Number,
    epochEnd: Number,
    totalDuration: Number,
    org: mongoose.Schema.Types.ObjectId,
    data: mongoose.Schema.Types.Mixed,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    users: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        slug: String,
        role: Number
    }],
    units: [sessionUnitSchema]
});

module.exports = mongoose.model('BSession', sessionSchema);