'use strict';
/*global angular:factory*/
angular.module('workspaceApp')
  .factory('Team', function ($http, $timeout) {
    var _teams = [];
    var updateTeams = function updateTeams(teams){
      $timeout(function(){
        _teams = teams;
      });
    };
    var updateTeam = function updateTeam(team){
      var updated = false;
      $timeout(function(){
        for(var f=0; f<_teams.length; f++){
          if(_teams[f]._id===team._id){
            _teams[f] = team;
            updated = true;
          }
        }
        if(!updated){
          _teams.push(team);
        }
      });
    };
    return {
      fetchTeams: function(){
        $http.get('/api/teams/user')
        .success(function(teams){
          updateTeams(teams);
        });
        return;
      },
      updateTeams: updateTeams,
      getTeams: function() {
        return _teams;
      },
      updateTeam: updateTeam
    };
  });
