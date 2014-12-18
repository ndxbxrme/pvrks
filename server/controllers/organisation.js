'use strict';

var Org = require('../models/organisation'),
  User = require('../models/user'),
  Toolkit = require('../toolkit');

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
            var newOrg = new Org();
            newOrg.name = req.body.name;
            newOrg.slug = slug;
            newOrg.users.push({
              id: req.user._id,
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
  findOneBySlug: function(req, res) {
    Org.findOne({slug:req.params.slug})
    .exec(function(err, org){
      if(err){
        throw err;
      }
      return res.json(org);
    })
  }
};