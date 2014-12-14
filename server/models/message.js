'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    content: String,
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    userimage: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    pmId: mongoose.Schema.Types.ObjectId,
    orgId: mongoose.Schema.Types.ObjectId,
    teamId: mongoose.Schema.Types.ObjectId,
    sessionId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Message', messageSchema);