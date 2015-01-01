'use strict';

var Session = require('../models/session'),
    User = require('../models/user'),
    Toolkit = require('../toolkit'),
    Sockets = require('../sockets/sockets');
    
module.exports = {
  findAllByUserId: function(req, res) {
    Session.find({
      'users.id': req.user._id
    })
    .exec(function(err,sessions){
      if(err){
        throw err;
      }
      return res.json(sessions);
    });
  },
  findOneBySlug: function(req, res){
    Session.findOne({slug:req.params.slug})
    .exec(function(err, session){
      if(err) {
        throw err;
      }
      return res.json(session);
    });
  },
  addOneByUserId: function(req, res){
    User.findOne(req.user._id)
    .exec(function(err, user){
      if(err) {
        throw err;
      }
      if(user) {
        Toolkit.findSlug(Session, req.body.name, '', function(slug){
          if(req.body._id) {
            console.log('updating');
            Session.findOne({_id:req.body._id})
            .exec(function(err, session){
              if(err){
                throw err;
              }
              if(session.name!=req.body.name) {
                session.slug = slug;
                session.name = req.body.name;
              }
              session.org = req.body.org;
              session.image = req.body.image;
              session.color = req.body.color;
              session.startDate = req.body.startDate;
              session.endDate = req.body.endDate;
              session.epochStart = new Date(req.body.startDate).getTime();
              session.epochEnd = new Date(req.body.endDate).getTime();
              session.totalDuration = req.body.totalDuration;
              session.units = [];
              req.body.units.forEach(function(unit){
                session.units.push({
                  type: unit.type,
                  name: unit.name,
                  duration: unit.duration
                });
              });
              session.units = req.body.units;
              session.save(function(err, session){
                Sockets.emitToUsers(session.users, 'bsession', session);
                res.json(err);
              });
            });
          }
          else {
            console.log('adding' + slug);
            Toolkit.randomImage(req.body.image, function(image){
              var newSession = new Session();
              newSession.name = req.body.name;
              newSession.slug = slug;
              newSession.org = req.body.org;
              newSession.image = image;
              newSession.color = req.body.color;
              newSession.startDate = req.body.startDate;
              newSession.endDate = req.body.endDate;
              newSession.epochStart = new Date(req.body.startDate).getTime();
              newSession.epochEnd = new Date(req.body.endDate).getTime();
              newSession.totalDuration = req.body.totalDuration;
              newSession.units= req.body.units;
              /*req.body.units.forEach(function(unit){
                newSession.units.push({
                  type: unit.type,
                  name: unit.name,
                  duration: unit.duration
                });
              });*/
              newSession.users.push({
                id: req.user._id,
                name: user.name,
                image: user.image,
                slug: user.slug,
                role: 0
              });
              newSession.save(function(err){
                res.json(err);
              });
            });
          }
        });
      }
    });
  },
  findAllSessionUsersById: function(req, res){
    Session.findOne({_id:req.params.id})
    .exec(function(err, session){
      if(err){
        throw err;
      }
      if(session) {
        return res.json(session.users);
      }
      return res.json([]);
    })
  }
};