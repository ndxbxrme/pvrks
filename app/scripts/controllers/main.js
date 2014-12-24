'use strict';
/*global angular:false*/
/**
 * @ngdoc function
 * @name workspaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope,$http,$window,User,Socket,Invite) {
    Invite.rememberInvite($window.location.search);
    $scope.login = function login() {
      $http.post('/api/login', {
        email: $scope.email,
        password: $scope.password
      })
      .success(function(user){
        User.details = user;
        console.log('emitting');
        console.dir(user);
        Socket.emit('user', user);
      });
    };
    $scope.signup = function signup() {
      $http.post('/api/signup', {
        email: $scope.email,
        password: $scope.password
      })
      .success(function(user){
        User.details = user;
        console.log('emitting');
        console.dir(user);
        Socket.emit('user', user);
      })
      .error(function(err){
        console.log(err);
      });
    };
  });
