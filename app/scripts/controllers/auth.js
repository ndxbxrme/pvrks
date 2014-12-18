'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('AuthCtrl', function ($scope, $http, $location, User, Socket) {
    $scope.user = User;
    $scope.logout = function logout(){
      User.details = undefined;
      Socket.emit('ids', {
        org: undefined,
        team: undefined,
        session: undefined
      });
      $http.get('/api/logout')
      .success(function(){
        $location.path('/');
      })
      .error(function(){
        $location.path('/');
      });
    };
  });
