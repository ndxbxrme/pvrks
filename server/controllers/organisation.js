'use strict';

var Org = require('../models/organisation'),
  User = require('../models/user'),
  Toolkit = require('../toolkit'),
  Sockets = require('../sockets/sockets');

module.exports = {
  findAllByUserId: function(req, res) {
    Org.find({
        'users.id': req.user._id
      })
      .exec(function(err, orgs) {
        if (err) {
          throw err;
        }
        return res.json(orgs);
      })
  },
  addOneByUserId: function(req, res) {
    User.findOne(req.user._id)
      .exec(function(err, user) {
        if (err) {
          throw err;
        }
        if(user) {
          Toolkit.findSlug(Org,req.body.name,user.slug,function(slug){
            if(req.body._id) {
              Org.findOne({_id:req.body._id}) //todo check user is allowed to do this
              .exec(function(err, org){
                if(err) {
                  throw err;
                }
                if(org.name!==req.body.name) {
                  org.slug = slug;
                  org.name = req.body.name;
                }
                org.image = req.body.image;
                org.color = req.body.color;
                org.save(function(err, org){
                  Sockets.emitToUsers(org.users, 'org', org);
                  res.json(err);
                });
              });
            }
            else {
              var newOrg = new Org();
              newOrg.name = req.body.name;
              newOrg.slug = slug;
              newOrg.image = req.body.image;
              newOrg.color = req.body.color;
              newOrg.users.push({
                id: req.user._id,
                name: user.name,
                image: user.image,
                role: 0
              });
              newOrg.save(function(err){
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
  findOneBySlug: function(req, res) {
    Org.findOne({slug:req.params.slug})
    .exec(function(err, org){
      if(err){
        throw err;
      }
      return res.json(org);
    })
  },
  findAllOrgUsersById: function(req, res) {
    Org.findOne({_id:req.params.id})
    .exec(function(err, org){
      if(err) {
        throw err;
      }
      if(org) {
        return res.json(org.users);
      }
      return res.json([]);
    });
  }
};