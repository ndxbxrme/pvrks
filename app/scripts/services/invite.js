'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Invite', function ($http) {
    
    return {
      parseInvite: function(inviteId){
        return $http.get('/api/invite/parse/' + inviteId.replace('?',''));
      },
      rememberInvite: function(inviteId){
        if(inviteId) {
          $http.get('/api/invite/remember/' + inviteId.replace('?',''));
        }
      }
    };
  });
