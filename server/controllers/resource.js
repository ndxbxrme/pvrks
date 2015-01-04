'use strict';

var Resource = require('../models/resource'),
    Sockets = require('../sockets/sockets'),
    Toolkit = require('../toolkit');
    
module.exports = {
  addUpdateResource: function(req, res) {
    if(req.body.resource._id) {
      console.log('updating');
      req.body.resource.updatedAt = Date.now();
      Resource.update({_id:req.body.resource._id}, req.body.resource)
      .exec(function(err){
        Sockets.emitToAll(req.body.resource.type, req.body.resource[req.body.resource.type], 'resource', [req.body.resource]);
        res.json(err);
      });
    }
    else {
      Toolkit.findSlug(Resource, req.body.resource.name, '', function(slug){
        var newResource = new Resource();
        newResource.name = req.body.resource.name;
        newResource.image = req.body.resource.image;
        newResource.secureUrl = req.body.resource.secureUrl;
        newResource.type = req.body.resource.type;
        newResource.url = req.body.resource.url;
        newResource.resourceType = req.body.resource.resourceType;
        newResource.resourceId = req.body.resource.resourceId;
        newResource.slug = slug;
        newResource.device = req.body.resource.device;
        newResource.tags = req.body.resource.tags;
        newResource.userId = req.user._id;
        newResource.username = req.user.name;
        newResource.userimage = req.user.image;
        newResource.userslug = req.user.slug;
        newResource.org = req.body.resource.ids.org;
        newResource.team = req.body.resource.ids.team;
        newResource.session = req.body.resource.ids.session;
        newResource.save(function(err, resource){
          if(err) {
            throw err;
          }
          console.log('i want to emit');
          Sockets.emitToAll(req.body.resource.type, req.body.resource.ids[req.body.resource.type], 'resource', [resource]);
          res.send('ok');
        });
        
      });
    }
  },
  findAllById: function(req, res) {
    Resource.find()
    .where(req.body.id)
    .limit(req.body.limit || 50)
    .sort(req.body.sort || 'createdAt')
    .exec(function(err, resources){
      if(err){
        throw err;
      }
      res.json(resources);
    });
  },
  findOneById: function(req, res) {
    Resource.findOne({_id:req.params.resourceId})
    .exec(function(err, resource){
      if(err) {
        throw err;
      }
      res.json(resource);
    });
  }
};