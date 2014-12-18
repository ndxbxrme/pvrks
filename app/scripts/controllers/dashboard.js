'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, Socket) {
    Socket.emit('ids', {
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
    };
    loadData();
    
    $scope.submitOrg = function(){
      $http.post('/api/organisation/user', {
        name: $scope.org.name
      }).success(function(){
        $scope.org.name = undefined;
        loadData();
      });
    };
    $scope.submitTeam = function(){
      $http.post('/api/teams/user', {
        name: $scope.team.name,
        org: $scope.team.org
      }).success(function(){
        $scope.team.name = undefined;
        $scope.team.org = undefined;
        loadData();
      });
    };
    $scope.submitInvite = function(){
      $http.post('/api/invite/accept', {
        inviteToken: $scope.inviteToken
      }).success(function(){
        $scope.inviteToken = undefined;
        loadData();
      });
    };
  });
