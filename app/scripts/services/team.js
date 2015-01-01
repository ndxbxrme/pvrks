'use strict';
/*global angular:factory*/
angular.module('workspaceApp')
  .factory('Team', function ($http, $timeout,$q) {
    var _teams = [];
    var _team;
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
        if(_team && _team._id===team._id) {
          _team = team;
        }
      });
    };
    return {
      clearData: function(){
        _teams = [];
        _team = undefined;
      },
      fetchTeams: function(){
        $http.get('/api/teams/user')
        .success(function(teams){
          updateTeams(teams);
        });
      },
      fetchTeamBySlug: function(slug){
        var defer = $q.defer();
        $http.get('/api/team/' + slug)
        .success(function(team){
          $timeout(function(){
            _team = team;
            defer.resolve(team);
          })
        });
        return defer.promise;
      },
      updateTeams: updateTeams,
      getTeams: function() {
        return _teams;
      },
      updateTeam: updateTeam,
      getTeam: function() {
        return _team;
      }
    };
  });
