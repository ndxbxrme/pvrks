'use strict';

var Idea = require('../models/idea'),
    Sockets = require('../sockets/sockets');
    
module.exports = {
  addIdea: function(req, res){
    var newIdea = new Idea();
    newIdea.content = req.body.content;
    newIdea.userId = req.user._id;
    newIdea.username = req.user.name;
    newIdea.userimage = req.user.image;
    newIdea.color = req.user.color;
    newIdea.org = req.body.org;
    newIdea.team = req.body.team;
    newIdea.session = req.body.session;
    newIdea.unit = req.body.unit;
    newIdea.save(function(err, idea){
      if(err){
        throw err;
      }
      Sockets.emitToAll('session', req.body.session, 'idea', idea);
      res.send('ok');
    })
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
    })
  }
};