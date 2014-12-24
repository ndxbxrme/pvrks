'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, $window, Socket, User, Alert) {
    User.setIds({
      org:undefined,
      team:undefined,
      session:undefined
    });
    var loadData = function loadData(){
      $http.get('/api/organisations/user')
      .success(function(orgs){
        $scope.orgs = orgs;
      });
      $http.get('/api/teams/user')
      .success(function(teams){
        $scope.teams = teams;
      });
      $http.post('/api/invites/user', {
        userId:User.details._id,
        inviteId:$window.location.search.replace('?','')
      })
      .success(function(invites) {
        $scope.invites = invites;
      })
    };
    loadData();


    $scope.acceptInvite = function(invite){
      $http.post('/api/invite/accept', invite).success(function(){
        $scope.inviteToken = undefined;
        loadData();
        Alert.log('Invite accepted');
      });
    };
    $scope.declineInvite = function(invite){
      $http.post('/api/invite/decline', invite).success(function(){
        $scope.inviteToken = undefined;
        loadData();
        Alert.log('Invite declined');
      })
    }
  });
