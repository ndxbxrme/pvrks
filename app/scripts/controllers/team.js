'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('TeamCtrl', function ($scope,$route,$http,Alert,Socket,Message,Roster) {
    $scope.slug = $route.current.params.slug;
    $scope.roster = Roster;
    $scope.message = Message;
    $http.get('/api/team/' + $route.current.params.slug)
    .success(function(team){
      $scope.team = team;
      Socket.emit('ids', {
        org: team.org,
        team: team._id
      });
      Message.fetchMessages({team:team._id},'team');
    });
    
    $scope.sendInvite = function sendInvite(){
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my team',
          team:{
            id:$scope.team._id,
            name:$scope.team.name,
            image:$scope.team.image
          }
        }
      })
      .success(function(invite){
        $scope.inviteToken = invite._id;
        Alert.log('Invite sent ' + invite._id);
      });
    };
    
    $scope.sendMessage = function sendMessage() {
      Message.sendMessage({
        content:$scope.messageContent,
        team:$scope.team._id,
        type:'team'
      });
      $scope.messageContent = undefined;
    };
    
  });
