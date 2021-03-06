'use strict';

var mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
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
    }]
});

module.exports = mongoose.model('Org', orgSchema);