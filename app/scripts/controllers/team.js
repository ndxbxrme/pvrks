'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('TeamCtrl', function ($scope,$route,$http,Alert,Socket,Team) {
    $scope.slug = $route.current.params.slug;
    $scope.Team = Team;
    Team.fetchTeamBySlug($route.current.params.slug)
    .then(function(team){
      Socket.setIds({
        org:undefined,
        team: team._id,
        session: undefined
      });
    });
    
    $scope.sendInvite = function sendInvite(){
      var team = Team.getTeam();
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my team',
          ids: {
            team:{
              id:team._id,
              name:team.name,
              image:team.image
            },
            org:{
              id:team.org
            }
          }
        }
      })
      .success(function(invite){
        $scope.inviteToken = invite._id;
        Alert.log('Invite sent ' + invite._id);
      });
    };

    
  });
