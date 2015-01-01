'use strict';

var Invite = require('../models/invite'),
    User = require('../models/user'),
    Org = require('../models/organisation'),
    Team = require('../models/team'),
    Session = require('../models/session'),
    Sockets = require('../sockets/sockets');

module.exports = {
  sendInvite: function(req, res){
    User.findOne(req.user._id)
    .exec(function(err, user){
      if(err) {
        throw err;
      }
      var newInvite = new Invite();
      newInvite.name = req.body.invite.name;
      newInvite.content = req.body.invite.content;
      newInvite.image = req.body.invite.image;
      newInvite.senderId = user._id;
      newInvite.senderName = user.name;
      newInvite.senderImage = user.image;
      newInvite.role = req.body.invite.role || 2;
      newInvite.noTokens = req.body.invite.noTokens || 1;
      newInvite.validUntil = req.body.invite.validUntil || new Date().setDate(new Date().getDate() + 5);
      newInvite.recipientId = req.body.invite.recipientId;
      newInvite.recipientEmail = req.body.invite.recipientEmail;
      newInvite.org = req.body.invite.ids.org;
      newInvite.team = req.body.invite.ids.team;
      newInvite.session = req.body.invite.ids.session;
      newInvite.save(function(err,invite){
        if(err){
          throw err;
        }
        res.json(invite);
      });
    });
  },
  parseInvite: function(req, res){
    Invite.findOne({_id:req.params.inviteId})
    .exec(function(err,invite){
      if(err) {
        throw err;
      }
      res.json(invite);
    });
  },
  rememberInvite: function(req, res){
    res.cookie('invite', req.params.inviteId, {maxAge:60 * 60 * 1000});
    res.send('ok');
  },
  acceptInvite: function(req, res){
    User.findOne(req.user._id)
    .exec(function(err, user){
      Invite.findOne({
        _id:req.body._id.toString(),
        validUntil:{$gt:new Date()},
        noTokens:{$gt:0}
      })
      .exec(function(err,invite){
        if(!err)
        {
          if(invite){
            var newUser = {
              id:user._id,
              name:user.name,
              image:user.image,
              slug:user.slug,
              role:invite.role
            };
            invite.acceptedAt = Date.now();
            invite.noTokens--;
            invite.acceptedBy.push(newUser);
            invite.save();
            res.clearCookie('invite');
            if(invite.org.id) {
              Org.findOne(invite.org.id)
              .where({'users.id':{$ne:req.user._id}})
              .exec(function(err, org){
                if(err) {
                  throw err;
                }
                if(org) {
                  org.users.push(newUser);
                  org.updatedAt = Date.now();
                  org.save();
                  Sockets.emitToUsers(org.users, 'updateRoster', 'org');
                }
              });
            }
            if(invite.team.id) {
              Team.findOne(invite.team.id)
              .where({'users.id':{$ne:req.user._id}})
              .exec(function(err, team){
                if(err) {
                  throw err;
                }
                if(team) {
                  team.users.push(newUser);
                  team.updatedAt = Date.now();
                  team.save();
                  Sockets.emitToUsers(team.users, 'updateRoster', 'team');
                }
              });
            }
            if(invite.session.id) {
              Session.findOne(invite.session.id)
              .where({'users.id':{$ne:req.user._id}})
              .exec(function(err, session){
                if(err) {
                  throw err;
                }
                if(session) {
                  session.users.push(newUser);
                  session.updatedAt = Date.now();
                  session.save();
                  Sockets.emitToUsers(session.users, 'updateRoster', 'session');
                }
              });
            }
          }
          else {
            
          }
        }
        res.json(invite);
      });
    });
  },
  declineInvite: function(req, res){
    Invite.findOne({
      _id:req.body._id,
      validUntil:{$gt:new Date()}
    })
    .exec(function(err,invite){
      if(err) {
        throw err;
      }
      if(invite){   
        invite.declinedAt = Date.now();
        invite.save();
        res.clearCookie('invite');
      }
      res.json(invite);
    });
  },
  findAllByUserId: function(req, res){
    if(req.body.inviteId) {
      res.cookie('invite', req.body.inviteId, {maxAge:60 * 60 * 1000});
    }
    Invite.find({
      recipientId: req.body.userId,
      acceptedAt: {$exists:false},
      declinedAt: {$exists:false},
      validUntil:{$gt:new Date()},
      noTokens: {$gt:0}
    })
    .sort({createdAt:-1})
    .exec(function(err,invites){
      if(err) {
        throw err;
      }
      if(!invites) {
        invites = [];
      }
      if(req.cookies.invite || req.body.inviteId) {
        Invite.findOne({
          _id:req.cookies.invite || req.body.inviteId,
          acceptedAt: {$exists:false},
          declinedAt: {$exists:false},
          validUntil:{$gt:new Date()},
          noTokens: {$gt:0}
        })
        .exec(function(err, invite){
          if(err) {
            throw err;
          }
          if(invite) {
            invites.push(invite);
          }
          return res.json(invites);
        })
      }
      else {
        return res.json(invites);
      }
    })
  }
};