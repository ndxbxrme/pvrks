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
    var hasNew = {
      'org': false,
      'team': false,
      'session': false,
      'pm': false
    }
    function addMessage(message){
      var lastGroup = messages[message.type][messages[message.type].length-1];
      if(!lastGroup) {
        lastGroup = {
          userId:null,
          createdAt:null,
          messages:[]
        };
      }
      if(message.userId!==lastGroup.userId || Date.parse(message.createdAt) > Date.parse(lastGroup.messages[lastGroup.messages.length-1].createdAt) + (5 * 60 * 1000)) {
        lastGroup = {
          userId:message.userId,
          username:message.username,
          userimage:message.userimage,
          color:message.color,
          side:message.side,
          createdAt:message.createdAt,
          messages:[]
        };
        messages[message.type].push(lastGroup);
      }
      lastGroup.messages.push(message);
      hasNew[message.type] = true;
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
            hasNew[type] = false;
          });
        });
      },
      getMessages: function(type){
        return messages[type];
      },
      hasNew: function(type){
        return hasNew[type];
      },
      resetNew: function(type){
        hasNew[type] = false;
      }
    };
  });
