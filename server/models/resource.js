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
    userId: mongoose.Schema.Types.ObjectId,
    orgId: mongoose.Schema.Types.ObjectId,
    teamId: mongoose.Schema.Types.ObjectId,
    sessionId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Resource', resourceSchema);