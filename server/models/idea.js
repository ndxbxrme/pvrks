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
    index: Number,
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    userimage: String,
    userslug: String,
    color: String,
    org: mongoose.Schema.Types.ObjectId,
    team: mongoose.Schema.Types.ObjectId,
    session: mongoose.Schema.Types.ObjectId,
    unit: mongoose.Schema.Types.ObjectId,
    parent: mongoose.Schema.Types.ObjectId,
    modResult: String,
    modUserId: mongoose.Schema.Types.ObjectId,
    modUsername: String,
    modUserimage: String,
    modUserslug: String,
    moddedAt: Date,
    deleted: Boolean
});

module.exports = mongoose.model('Idea', ideaSchema);