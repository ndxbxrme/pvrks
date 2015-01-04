'use strict';

var Message = require('../models/message'),
    Sockets = require('../sockets/sockets');

module.exports = {
  addMessage: function(req,res) {
    if(req.body.message._id) {
      console.log('updating');
      req.body.message.updatedAt = Date.now();
      Message.update({_id:req.body.message._id}, req.body.message)
      .exec(function(err){
        Sockets.emitToAll(req.body.message.type, req.body.message[req.body.message.type], 'message', [req.body.message]);
        res.json(err);
      });
    }
    else {
      var newMessage = new Message();
      newMessage.content = req.body.message.content;
      newMessage.userId = req.user._id;
      newMessage.username = req.user.name;
      newMessage.userimage = req.user.image;
      newMessage.userslug = req.user.slug;
      newMessage.color = req.user.color;
      newMessage.side = req.user.side;
      newMessage.pm = req.body.message.pm;
      newMessage.org = req.body.message.org;
      newMessage.team = req.body.message.team;
      newMessage.session = req.body.message.session;
      newMessage.type = req.body.message.type;
      newMessage.save(function(err, message){
        if(err) {
          throw err;
        }
        Sockets.emitToAll(req.body.message.type, req.body.message[req.body.message.type], 'message', [message]);
        res.send('ok');
      });
    }
  },
  findAllById: function(req, res) {
    Message.find()
    .where(req.body.id)
    .limit(50)
    .sort('createdAt')
    .exec(function(err, messages){
      if(err){
        throw err;
      }
      res.json(messages);
    });
  }
};