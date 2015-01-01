'use strict';

var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
    name: String,
    image: String,
    type: String,
    resourceType: String,
    resourceId: String,
    secureUrl: String,
    url: String,
    content: String,
    slug: String,
    device: String,
    tags: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    userimage: String,
    userslug: String,
    org: mongoose.Schema.Types.ObjectId,
    team: mongoose.Schema.Types.ObjectId,
    session: mongoose.Schema.Types.ObjectId,
    unit: mongoose.Schema.Types.ObjectId,
    parentId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Resource', resourceSchema);