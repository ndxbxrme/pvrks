'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('ProfileCtrl', function ($scope, $http, $route, User, Alert) {
    $scope.slug = $route.current.params.slug;
    $scope.myProfile = false;
    var load = function load(){
      if(!$scope.slug) {
        $http.get('/api/user/' + User.details._id)
        .success(function(profileUser){
          $scope.profileUser = profileUser;
          $scope.myProfile = true;
        });
      }
      else {
        $http.get('/api/user/' + $scope.slug + '/slug')
        .success(function(profileUser){
          $scope.profileUser = profileUser
          if(profileUser._id===User.details._id) {
            $scope.myProfile = true;
          }
        });
      }
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
