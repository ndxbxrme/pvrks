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


    $scope.submitInvite = function(){
      $http.post('/api/invite/accept', {
        inviteToken: $scope.inviteToken
      }).success(function(){
        $scope.inviteToken = undefined;
        loadData();
      });
    };
  });
