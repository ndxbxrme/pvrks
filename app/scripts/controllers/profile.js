'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('ProfileCtrl', function ($scope, $http, User, Alert) {
    var load = function load(){
      $http.get('/api/user/' + User.details._id)
      .success(function(profileUser){
        $scope.profileUser = profileUser;
      });
    };
    load();
    
    $scope.submit = function() {
      if($scope.profileForm.$valid && $scope.profileUser) {
        $http.post('/api/user/', $scope.profileUser)
        .success(function(res){
          console.log(res);
          User.details = $scope.profileUser;
          Alert.log('Profile updated')
        });
      }
    };
  });
