'use strict';

var User = require('../models/user'),
    Team = require('../models/team'),
    Org = require('../models/organisation'),
    Idea = require('../models/idea'),
    Toolkit = require('../toolkit'),
    Invite = require('../models/invite'),
    Message = require('../models/message'),
    Resource = require('../models/resource'),
    Session = require('../models/session'),
    Sockets = require('../sockets/sockets');

module.exports = {
  findOneById: function(req, res) {
    User.findOne({_id:req.params.userId.toString()})
    .exec(function(err, user){
      if(err) {
        throw err;
      }
      res.json(user);
    });
  },
  updateProfile: function(req, res) {
    //get slug if neccesarry
    //update profile
    //update linked records
    //update socket user details
    //emit roster event
    Toolkit.findSlug(User, req.body.name, '', function(slug){
      if(!req.body._id) {
        return res.send('bad');
      }
      if(req.body.name!==req.user.name) {
        req.body.slug = slug;
      }
      User.update({_id:req.body._id},{
          name: req.body.name,
          slug: req.body.slug,
          email: req.body.email || '',
          color: req.body.color || '',
          side: req.body.side,
          image: req.body.image || ''
        }
      ).exec();
      Team.update({
        'users.id':req.body._id
      }, {
        'users.name': req.body.name,
        'users.image': req.body.image
      }, {
        multi: true
      }).exec();
      Org.update({
        'users.id':req.body._id
      }, {
        'users.name': req.body.name,
        'users.image': req.body.image
      }, {
        multi: true
      }).exec();
      Session.update({
        'users.id':req.body._id
      }, {
        'users.name': req.body.name,
        'users.image': req.body.image
      }, {
        multi: true
      }).exec();
      Idea.update({
        userId: req.body._id
      },{
        username: req.body.name,
        userimage: req.body.image
      }, {
        multi: true
      }).exec();
      Invite.update({
        senderId: req.body._id
      },{
        senderName: req.body.name,
        senderImage: req.body.image
      }, {
        multi: true
      }).exec();
      Invite.update({
        recipientId: req.body._id
      },{
        recipientName: req.body.name,
        recipientImage: req.body.image,
        recipientEmail: req.body.email || ''
      }, {
        multi: true
      }).exec();
      Message.update({
        userId: req.body._id
      },{
        username: req.body.name,
        userimage: req.body.image,
        color: req.body.color,
        side: req.body.side
      }, {
        multi: true
      }).exec();
      Resource.update({
        userId: req.body._id
      },{
        username: req.body.name,
        userimage: req.body.image
      }, {
        multi: true
      }).exec();
      Sockets.updateUser(req.body);
      res.send('ok');
    });
  }
};