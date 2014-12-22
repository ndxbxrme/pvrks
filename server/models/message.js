'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    content: String,
    type: String,
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    userimage: String,
    color: String,
    side: Boolean,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    pm: mongoose.Schema.Types.ObjectId,
    org: mongoose.Schema.Types.ObjectId,
    team: mongoose.Schema.Types.ObjectId,
    session: mongoose.Schema.Types.ObjectId,
    deleted: Boolean,
    moderated: Boolean,
    modId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Message', messageSchema);