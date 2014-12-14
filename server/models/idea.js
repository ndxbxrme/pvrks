'use strict';

var mongoose = require('mongoose');

var ideaSchema = mongoose.Schema({
    name: String,
    content: String,
    type: String,
    device: String,
    slug: String,
    tags: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    ideas: [mongoose.Schema.Types.ObjectId],
    resources: [mongoose.Schema.Types.ObjectId],
    userId: mongoose.Schema.Types.ObjectId,
    orgId: mongoose.Schema.Types.ObjectId,
    teamId: mongoose.Schema.Types.ObjectId,
    sessionId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Idea', ideaSchema);