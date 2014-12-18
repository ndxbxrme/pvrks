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
    return {
      addMessage: function(message) {
        $timeout(function(){
          messages[message.type].unshift(message);
        });
      },
      sendMessage: function(message) {
        $http.post('/api/message/add', message);
      },
      fetchMessages: function(ids,type) {
        $http.post('/api/messages', {id:ids})
        .success(function(_messages) {
          $timeout(function(){
            messages[type] = _messages;
          })
        });
      },
      getMessages: function(type){
        return messages[type];
      }
    };
  });
