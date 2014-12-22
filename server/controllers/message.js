'use strict';

var Message = require('../models/message'),
    Sockets = require('../sockets/sockets');

module.exports = {
  addMessage: function(req,res) {
    var newMessage = new Message();
    newMessage.content = req.body.content;
    newMessage.userId = req.user._id;
    newMessage.username = req.user.name;
    newMessage.userimage = req.user.image;
    newMessage.color = req.user.color;
    newMessage.side = req.user.side;
    newMessage.pm = req.body.pm;
    newMessage.org = req.body.org;
    newMessage.team = req.body.team;
    newMessage.session = req.body.session;
    newMessage.type = req.body.type;
    newMessage.save(function(err, message){
      if(err) {
        throw err;
      }
      Sockets.emitToAll(req.body.type, req.body[req.body.type], 'message', message);
      res.send('ok');
    });
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