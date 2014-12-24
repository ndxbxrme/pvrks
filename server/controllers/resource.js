'use strict';

var Resource = require('../models/resource'),
    Sockets = require('../sockets/sockets'),
    Toolkit = require('../toolkit');
    
module.exports = {
  addResource: function(req, res) {
    Toolkit.findSlug(Resource, req.body.name, '', function(slug){
      var newResource = new Resource();
      newResource.name = req.body.name;
      newResource.image = req.body.image;
      newResource.secureUrl = req.body.secureUrl;
      newResource.type = req.body.type;
      newResource.resourceType = req.body.resourceType;
      newResource.resourceId = req.body.resourceId;
      newResource.slug = slug;
      newResource.device = req.body.device;
      newResource.tags = req.body.tags;
      newResource.userId = req.user._id;
      newResource.username = req.user.name;
      newResource.userimage = req.user.image;
      newResource.org = req.body.ids.org;
      newResource.team = req.body.ids.team;
      newResource.session = req.body.ids.session;
      newResource.save(function(err, resource){
        if(err) {
          throw err;
        }
        console.log('i want to emit');
        Sockets.emitToAll(req.body.type, req.body.ids[req.body.type], 'resource', resource);
        res.send('ok');
      })
      
    });
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
    })
  }
}