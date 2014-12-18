'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');
    
var userSchema = mongoose.Schema({
    name: String,
    image: String,
    slug: String,
    email: String,
    data: mongoose.Schema.Types.Mixed,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    local: {
        email: String,
        password: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
