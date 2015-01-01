'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('TeamCtrl', function ($scope,$route,$http,$timeout,Alert,Socket,Team,Nav,Resource,Invite) {
    $scope.slug = $route.current.params.slug;
    $scope.Team = Team;
    $scope.Invite = Invite;
    Team.fetchTeamBySlug($route.current.params.slug)
    .then(function(team){
      Socket.setIds({
        org:undefined,
        team: team._id,
        session: undefined
      });
      Nav.pageTitle = 'Team ' + team.name;
      Nav.titleUrl = '/team/' + team.slug + '/edit';
      Nav.color = team.color;
      Nav.canInvite = true;
      Nav.inviteName = team.name;
      Resource.currentType = 'team';
      Resource.currentId = team._id;
      Resource.orgId = team.org;
      Resource.fetchResources({team:team._id}, 'team');
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
