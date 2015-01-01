'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('AuthCtrl', function ($scope, $http, $location, User, Socket, Team, Org, Session, Nav) {
    $scope.user = User;
    $scope.Nav = Nav;
    $scope.logout = function logout(){
      User.details = undefined;
      Socket.emit('ids', {
        org: undefined,
        team: undefined,
        session: undefined
      });
      Team.clearData();
      Org.clearData();
      Session.clearData();
      $http.get('/api/logout')
      .success(function(){
        $location.path('/');
      })
      .error(function(){
        $location.path('/');
      });
    };
  });
