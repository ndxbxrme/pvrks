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
    };
    var currentType,
        currentId,
        modalOpen,
        updated;
    function addUpdateMessages(_messages){
      angular.forEach(_messages, function(message){
        var foundIt;
        for(var g = 0; g<messages[message.type].length; g++) {
          for(var f=0; f<messages[message.type][g].length; f++) {
            if(messages[message.type][g][f]._id===message.id) {
              foundIt = true;
              messages[message.type][g][f] = message;
              break;
            }
          }
        }
        if(!foundIt) {
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
          console.log(modalOpen);
          if(!modalOpen) {
            hasNew[message.type] = true;         
          }
        }
        updated = Date.now();
      });

    }
    return {
      updateMessages: function(_messages) {
        $timeout(function(){
          addUpdateMessages(_messages);
        });
      },
      sendMessage: function(message) {
        $http.post('/api/message/add', {message:message});
      },
      fetchMessages: function(ids,type) {
        messages[type] = [];
        $http.post('/api/messages', {id:ids})
        .success(function(_messages) {
          $timeout(function(){
            addUpdateMessages(_messages);
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
      },
      updated: function() {
        return updated;
      },
      toggleOpen: function() {
        modalOpen = !modalOpen;
      },
      modalOpen: function() {
        return modalOpen;
      }
    };
  });
