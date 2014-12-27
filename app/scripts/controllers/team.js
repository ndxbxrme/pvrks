'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('TeamCtrl', function ($scope,$route,$http,Alert,Socket) {
    $scope.slug = $route.current.params.slug;
    $scope.team = undefined;
    $http.get('/api/team/' + $route.current.params.slug)
    .success(function(team){
      $scope.team = team;
      Socket.setIds({
        org: undefined,
        team: team._id,
        session: undefined
      });
    });
    
    $scope.sendInvite = function sendInvite(){
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my team',
          ids: {
            team:{
              id:$scope.team._id,
              name:$scope.team.name,
              image:$scope.team.image
            },
            org:{
              id:$scope.team.org
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
