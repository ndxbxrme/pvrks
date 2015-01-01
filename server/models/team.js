'use strict';

var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    name: String,
    image: String,
    color: String,
    slug: String,
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
    org: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Team', teamSchema);