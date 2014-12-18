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
  .controller('MainCtrl', function ($scope,$http,User) {
    $scope.login = function login() {
      $http.post('/api/login', {
        email: $scope.email,
        password: $scope.password
      })
      .success(function(user){
        User.details = user;
      });
    };
    $scope.signup = function signup() {
      $http.post('/api/signup', {
        email: $scope.email,
        password: $scope.password
      })
      .success(function(user){
        User.details = user;
      });
    };
  });
