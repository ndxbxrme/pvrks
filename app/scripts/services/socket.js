'use strict';
/*global angular:false, io:false*/
angular.module('workspaceApp')
  .factory('Socket', function (Alert, Roster, Message) {
    var socket = io();
    socket.on('rosters', function(data){
      Roster.setRoster(data);
    });
    socket.on('message', function(message){
      Message.addMessage(message);
    });
    return {
      emit: function(message, data) {
        return socket.emit(message, data);
      }
    };
  });
