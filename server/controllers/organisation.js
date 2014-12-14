'use strict';

var Org = require('../models/organisation'),
  User = require('../models/user'),
  Toolkit = require('../toolkit');

module.exports = {
  findAllByUserId: function(req, res) {
    Org.find({
        'users.userId': req.user._id
      })
      .exec(function(err, orgs) {
        if (err) {
          throw err;
        }
        if (orgs) {
          return res.json(orgs);
        }
      })
  },
  addOneByUserId: function(req, res) {
    console.log('add one');
    User.findOne(req.user._id)
      .exec(function(err, user) {
        if (err) {
          throw err;
        }
        if(user) {
          console.log('got user');
          Toolkit.findSlug(Org,req.body.orgName,user.slug,function(slug){
            var newOrg = new Org();
            newOrg.name = req.body.orgName;
            newOrg.slug = slug;
            newOrg.users.push({
              userId: req.user._id,
              name: user.name,
              image: user.image,
              role: 0
            });
            newOrg.save(function(err){
              if(err) {
                throw err;
              }
              res.json(err);
            });
          });
        }
        else {
          res.json({error:'no user'});
        }
      });
  },
  getOneById: function(req, res) {
    Org.findOne(req.body.orgId)
    .exec(function(err, org){
      if(err){
        throw err;
      }
      return res.json(org);
    })
  }
};