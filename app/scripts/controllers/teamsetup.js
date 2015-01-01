'use strict';
/*global angular:false, Please:false*/
angular.module('workspaceApp')
  .controller('TeamsetupCtrl', function ($scope, $route, $http, User, Alert, Team, Nav) {
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
          Nav.pageTitle = 'Editing team ' + team.name;
          Nav.titleUrl = '/team/' + team.slug;
          Nav.color = team.color;
        }
        else {
          Nav.pageTitle = 'Add a team ';
          Nav.titleUrl = '/team/';
          $scope.team = {
            color: Please.make_color()
          };
          Nav.color = $scope.team.color;
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
          Team.fetchTeams();
          Alert.log('Team updated');
        });
      }
    };
  });
