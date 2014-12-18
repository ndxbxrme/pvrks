'use strict';

var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
    name: String,
    image: String,
    type: String,
    slug: String,
    device: String,
    tags: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    user: mongoose.Schema.Types.ObjectId,
    org: mongoose.Schema.Types.ObjectId,
    team: mongoose.Schema.Types.ObjectId,
    session: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Resource', resourceSchema);