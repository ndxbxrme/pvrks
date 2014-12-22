'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Invite', function ($http, $q) {
    
    return {
      sendInvite: function (name, content, ids) {
        var defer = $q.defer;
        
        return defer.promise;
      }
    };
  });
