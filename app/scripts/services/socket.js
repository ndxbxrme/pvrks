'use strict';
/*global angular:false, io:false*/
angular.module('workspaceApp')
  .factory('Socket', function (Alert, Roster, Message, Resource, Idea, Session, Team, Org, User) {
    var socket = io();
    var firstConnect = true;
    socket.on('rosters', function(data){
      Roster.setRoster(data);
    });
    socket.on('updateRoster', function(type){
      Roster.doReload(type);
    });
    socket.on('message', function(messages){
      Message.updateMessages(messages);
    });
    socket.on('resource', function(resources){
      Resource.updateResources(resources);
    });
    socket.on('idea', function(ideas){
      console.log('ey');
      Idea.updateIdeas(ideas);
    });
    socket.on('bsession', function(session){
      Session.updateSession(session);
    });
    socket.on('team', function(team){
      Team.updateTeam(team);
    });
    socket.on('org', function(org){
      Org.updateOrg(org);
    });
    socket.on('connect', function(){
      if(!firstConnect) {
        Alert.log('connected');
        socket.emit('user', User.details);
      }
      firstConnect = false;
    });
    socket.on('disconnect', function(){
      Alert.log('disconnected');
    });
    return {
      emit: function(message, data) {
        return socket.emit(message, data);
      },
      setIds: function(_ids) {
        User.ids = _ids;
        Roster.setIds(_ids);
        return socket.emit('ids', _ids);
      }
    };
  });
