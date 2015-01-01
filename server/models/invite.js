'use strict';

var mongoose = require('mongoose');

var inviteSchema = mongoose.Schema({
    name: String,
    content: String,
    image: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    validUntil: Date,
    acceptedAt: Date,
    declinedAt: Date,
    noTokens: Number,
    senderId: mongoose.Schema.Types.ObjectId,
    senderName: String,
    senderImage: String,
    recipientId: mongoose.Schema.Types.ObjectId,
    recipientName: String,
    recipientEmail: String,
    role: Number,
    org: {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String
    },
    team: {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String
    },
    session: {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String
    },
    acceptedBy: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        slug: String,
        role: Number,
        date: {type: Date, default: Date.now}
    }]
});

module.exports = mongoose.model('Invite', inviteSchema);