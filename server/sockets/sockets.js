'use strict';

var socketio = require('socket.io'),
    async = require('async');

var io;
var sockets = [];
var emitToAll = function emitToAll(idKey, id, message, data) {
  async.each(sockets, function(socket, callback){
    if(socket.ids && socket.ids[idKey]===id) {
      socket.emit(message, data);
    }
    callback();
  });
};
var emitToUsers = function emitToUsers(users, message, data) {
  console.dir(users);
  users.forEach(function(user){
    sockets.forEach(function(socket){
      if(socket.user && socket.user._id===user.id.toString()) {
        socket.emit(message, data);
      }
    });
  });
};
var updateRosters = function updateRosters(ids, prevs) {
  var rosters = {
    orgUsers: [],
    teamUsers: [],
    sessionUsers: []
  };
  sockets.forEach(function(socket){
    if(socket.ids && socket.user) {
      if(ids.org && ids.org != prevs.org && ids.org === socket.ids.org) {
        rosters.orgUsers.push(socket.user);
      }
      if(ids.team && ids.team != prevs.team && ids.team === socket.ids.team) {
        rosters.teamUsers.push(socket.user);
      }
      if(ids.session && ids.session != prevs.session && ids.session === socket.ids.session) {
        rosters.sessionUsers.push(socket.user);
      }
    }
  });
  if(ids.org !== prevs.org) {
    emitToAll('org', ids.org, 'rosters', {type:'org',users:rosters.orgUsers});
  }
  if(ids.team !== prevs.team) {
    emitToAll('team', ids.team, 'rosters', {type:'team',users:rosters.teamUsers});
  }
  if(ids.session !== prevs.session) {
    emitToAll('session', ids.session, 'rosters', {type:'session',users:rosters.sessionUsers});
  }
  if(prevs.org || prevs.team || prevs.session) {
    updateRosters(prevs, {});
  }
};
module.exports = {
  setup: function(server) {
    io = socketio.listen(server);
    
    io.on('connection', function(socket){
      sockets.push(socket);
      socket.on('disconnect', function(){
        sockets.splice(sockets.indexOf(socket),1);
        if(socket.ids) {
          updateRosters(socket.ids, {});
        }
      });
      socket.on('user', function(user){
        socket.user = user;
      });
      socket.on('ids', function(ids){
        var prevs = socket.ids || {};
        socket.ids = ids;
        updateRosters(ids,prevs);
      });
    });
  },
  emitToAll: function(idKey, id, message, data) {
    console.log('emitting ' + message);
    emitToAll(idKey, id, message, data);
  },
  emitToUsers: function(users, message, data) {
    console.log('emitting to users');
    emitToUsers(users, message, data);
  },
  updateUser: function(user) {
    for(var f=0; f<sockets.length; f++) {
      if(sockets[f].user && sockets[f].user._id === user._id) {
        sockets[f].user = user;
      }
    }
  }
};