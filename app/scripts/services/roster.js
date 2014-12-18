'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Roster', function ($timeout) {
    var rosters = {
      'org': [],
      'team': [],
      'session': []
    };
    return {
      setRoster: function (data) {
        $timeout(function(){
          rosters[data.type] = data.users;
        });
      },
      getRoster: function(type) {
        return rosters[type];
      }
    };
  });
