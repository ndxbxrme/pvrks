'use strict';
/*global angular:false*/
/**
 * @ngdoc function
 * @name workspaceApp.controller:OrgCtrl
 * @description
 * # OrgCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('OrgCtrl', function ($scope,$route,$http) {
    $scope.slug = $route.current.params.slug;
    $http.get('/api/organisation/' + $route.current.params.slug)
    .success(function(org){
      $scope.org = org;
    });
  });
