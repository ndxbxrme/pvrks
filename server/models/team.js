'use strict';

var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    name: String,
    image: String,
    slug: String,
    data: mongoose.Schema.Types.Mixed,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    users: [{
        userId: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        role: Number
    }]
});

module.exports = mongoose.model('Team', teamSchema);