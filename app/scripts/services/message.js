'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Message', function ($http, $timeout) {
    var messages = {
      'org': [],
      'team': [],
      'session': [],
      'pm': []
    };
    function addMessage(message){
      var lastGroup = messages[message.type][messages[message.type].length-1];
      if(!lastGroup) {
        lastGroup = {
          userId:null
        };
      }
      if(message.userId!==lastGroup.userId) {
        lastGroup = {
          userId:message.userId,
          username:message.username,
          userimage:message.userimage,
          color:message.color,
          side:message.side,
          messages:[]
        };
        messages[message.type].push(lastGroup);
      }
      lastGroup.messages.push(message);
    }
    return {
      addMessage: function(message) {
        $timeout(function(){
          addMessage(message);
        });
      },
      sendMessage: function(message) {
        $http.post('/api/message/add', message);
      },
      fetchMessages: function(ids,type) {
        messages[type] = [];
        $http.post('/api/messages', {id:ids})
        .success(function(_messages) {
          $timeout(function(){
            _messages.forEach(function(message){
              addMessage(message);
            });
          });
        });
      },
      getMessages: function(type){
        return messages[type];
      }
    };
  });
