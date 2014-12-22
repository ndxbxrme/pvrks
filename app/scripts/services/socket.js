'use strict';
/*global angular:false, io:false*/
angular.module('workspaceApp')
  .factory('Socket', function (Alert, Roster, Message, Resource, Idea) {
    var socket = io();
    socket.on('rosters', function(data){
      Roster.setRoster(data);
    });
    socket.on('message', function(message){
      Message.addMessage(message);
    });
    socket.on('resource', function(resource){
      console.log('resource socket event');
      Resource.addResource(resource);
    });
    socket.on('idea', function(idea){
      Idea.addIdea(idea);
    });
    socket.on('connect', function(){
      Alert.log('connected');
    });
    socket.on('disconnect', function(){
      Alert.log('disconnected');
    });
    return {
      emit: function(message, data) {
        return socket.emit(message, data);
      }
    };
  });
