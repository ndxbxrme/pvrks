'use strict';

var Idea = require('../models/idea'),
    Sockets = require('../sockets/sockets');
    
module.exports = {
  addUpdateIdea: function(req, res){
    if(req.body.idea._id) {
      console.log('updating');
      req.body.idea.updatedAt = Date.now();
      Idea.update({_id:req.body.idea._id}, req.body.idea)
      .exec(function(err){
        Sockets.emitToAll('session', req.body.idea.session, 'idea', [req.body.idea]);
        res.json(err);
      });
    }
    else {
      console.log('adding');
      var newIdea = new Idea();
      newIdea.content = req.body.idea.content;
      newIdea.userId = req.user._id;
      newIdea.username = req.user.name;
      newIdea.userimage = req.user.image;
      newIdea.userslug = req.user.slug;
      newIdea.color = req.user.color;
      newIdea.org = req.body.idea.org;
      newIdea.team = req.body.idea.team;
      newIdea.session = req.body.idea.session;
      newIdea.unit = req.body.idea.unit;
      newIdea.type = req.body.idea.type;
      //role/moderation
      if(req.body.idea.role < 2) {
        newIdea.modResult = 'accepted';
        newIdea.modUserId = req.user._id;
        newIdea.modUsername = req.user.name;
        newIdea.modUserimage = req.user.image;
        newIdea.modUserslug = req.user.slug;
      }
      newIdea.save(function(err, idea){
        if(err){
          throw err;
        }
        Sockets.emitToAll('session', req.body.idea.session, 'idea', [idea]);
        res.send('ok');
      });
    }
  },
  acceptIdea: function(req, res) {
    Idea.findOne({_id:req.params.ideaId})
    .exec(function(err, idea){
      if(err) {
        throw err;
      }
      if(idea) {
        idea.modResult = 'accepted';
        idea.modUserId = req.user._id;
        idea.modUsername = req.user.name;
        idea.modUserimage = req.user.image;
        idea.modUserslug = req.user.slug;
        idea.moddedAt = Date.now();
        idea.updatedAt = Date.now();
        idea.save(function(err, uidea){
          Sockets.emitToAll('session', uidea.session.toString(), 'idea', [uidea]);
          res.send(err);
        });
      }
      else {
        res.send('not ok');
      }
    });
  },
  rejectIdea: function(req, res) {
    Idea.findOne({_id:req.params.ideaId})
    .exec(function(err, idea){
      if(err) {
        throw err;
      }
      if(idea) {
        idea.modResult = 'rejected';
        idea.modUserId = req.user._id;
        idea.modUsername = req.user.name;
        idea.modUserimage = req.user.image;
        idea.modUserslug = req.user.slug;
        idea.moddedAt = Date.now();
        idea.updatedAt = Date.now();
        idea.save(function(err, uidea){
          Sockets.emitToAll('session', uidea.session.toString(), 'idea', [uidea]);
          res.send(err);
        });
      }
      else {
        res.send('not ok');
      }
    });
  },
  findAllById: function(req, res) {
    Idea.find()
    .where(req.body.id)
    .sort('createdAt')
    .exec(function(err, ideas){
      if(err){
        throw err;
      }
      res.json(ideas);
    });
  },
  updateIdeas: function(req, res) {
     req.body.ideas.forEach(function(idea){
       Idea.update({_id:idea._id}, idea).exec();
     });
     Sockets.emitToAll('session', req.body.ideas[0].session.toString(), 'idea', req.body.ideas);
     res.send('ok');
  }
};