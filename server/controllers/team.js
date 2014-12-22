'use strict';

var Team = require('../models/team'),
    User = require('../models/user'),
    Toolkit = require('../toolkit');
    
module.exports = {
  findAllByUserId: function(req, res) {
    Team.find({
      'users.id': req.user._id
    })
    .exec(function(err,teams){
      if(err){
        throw err;
      }
      return res.json(teams);
    })
  },
  addOneByUserId: function(req, res) {
    User.findOne(req.user._id)
    .exec(function(err, user){
      if(err) {
        throw err;
      }
      if(user){
        Toolkit.findSlug(Team, req.body.name, user.slug, function(slug){
          if(req.body._id) {
            Team.findOne({_id:req.body._id}) //todo check user is allowed to do this
            .exec(function(err, team){
              if(err){
                throw err;
              }
              if(team.name!==req.body.name) {
                team.slug = slug;
                team.name = req.body.name;
              }
              team.org = req.body.org;
              team.image = req.body.image;
              team.color = req.body.color;
              team.save(function(err){
                res.json(err);
              });
            });
          }
          else {
            var newTeam = new Team();
            newTeam.name = req.body.name;
            newTeam.slug = slug;
            newTeam.org = req.body.org;
            newTeam.image = req.body.image;
            newTeam.color = req.body.color;
            newTeam.users.push({
              id: req.user._id,
              name: user.name,
              image: user.image,
              role: 0
            });
            newTeam.save(function(err){
              res.json(err);
            });
          }
        });
      }
      else {
        res.json({error:'no user'});
      }
    });
  },
  findOneBySlug: function(req, res){
    Team.findOne({slug:req.params.slug})
    .exec(function(err, team){
      if(err) {
        throw err;
      }
      return res.json(team);
    })
  }
};