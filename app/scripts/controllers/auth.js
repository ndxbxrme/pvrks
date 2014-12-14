'use strict';
/*global angular:false*/
/**
 * @ngdoc function
 * @name workspaceApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('AuthCtrl', function ($scope, User) {
    $scope.user = User;
  });
