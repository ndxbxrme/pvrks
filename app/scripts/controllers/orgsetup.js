'use strict';
/*global angular:false, Please:false*/
angular.module('workspaceApp')
  .controller('OrgsetupCtrl', function ($scope, $route, $http, User, Alert) {
    $scope.slug = $route.current.params.slug;
    function load() {
      $http.get('/api/organisation/' + $scope.slug)
      .success(function(org){
        if(org) {
          $scope.org = org;
          angular.forEach(org.users, function(user){
            if(user.id===User.details._id) {
              $scope.role = user.role;
            }
          });
        }
        else {
          $scope.org = {
            color: Please.make_color()
          };
        }
      });
    }
    load();
    
    $scope.submit = function(create){
      if(create || $scope.org._id) {
        $http.post('/api/organisation/user', $scope.org).success(function(){
          Alert.log('Organization updated');
        });
      }
    };
  });
