'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('ResourceCtrl', function ($scope, $route, Resource, User, Nav, Alert) {
    $scope.User = User;
    Nav.pageTitle = 'Resource';
    Nav.titleUrl = '';
    Nav.canInvite = false;
    Resource.fetchResourceById($route.current.params.resourceId)
    .then(function(resource){
      $scope.resource = resource;
    });
    
    $scope.update = function update(){
      Resource.sendResource($scope.resource);
      Alert.log('Resource updated');
    };
  });
