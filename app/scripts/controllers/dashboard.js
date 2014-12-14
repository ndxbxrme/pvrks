'use strict';
/*global angular:false, User:false*/
/**
 * @ngdoc function
 * @name workspaceApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    var loadData = function loadData(){
      $http.get('/api/organisations/user')
      .success(function(orgs){
        $scope.orgs = orgs;
      });
    };
    loadData();
    
    $scope.submitOrg = function(){
      $http.post('/api/organisation/user', {
        orgName: $scope.orgName
      }).success(function(){
        $scope.orgName = undefined;
        loadData();
      });
    };
  });
