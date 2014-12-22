'use strict';
/*global angular:false, Please:false*/
angular.module('workspaceApp')
  .controller('TeamsetupCtrl', function ($scope, $route, $http, User, Alert) {
    $scope.slug = $route.current.params.slug;
    function load() {
      $http.get('/api/team/' + $scope.slug)
      .success(function(team){
        if(team) {
          $scope.team = team;
          angular.forEach(team.users, function(user){
            if(user.id===User.details._id) {
              $scope.role = user.role;
            }
          });
        }
        else {
          $scope.team = {
            color: Please.make_color()
          };
        }
      });
      $http.get('/api/organisations/user')
      .success(function(orgs){
        $scope.orgs = orgs;
      });
    }
    load();
    
    $scope.submit = function(create){
      if(create || $scope.team._id) {
        $http.post('/api/teams/user', $scope.team).success(function(){
          Alert.log('Team updated');
        });
      }
    };
  });
