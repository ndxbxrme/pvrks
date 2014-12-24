'use strict';
/*global angular:false, Please:false*/
angular.module('workspaceApp')
  .controller('SessionsetupCtrl', function ($scope, $route, $http, User, Alert) {
    $scope.slug = $route.current.params.slug;
    function load() {
      $http.get('/api/session/' + $scope.slug)
      .success(function(session){
        if(session) {
          $scope.session = session;
          angular.forEach(session.users, function(user){
            if(user.id===User.details._id) {
              $scope.role = user.role;
            }
          });
        }
        else {
          $scope.session = {
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

    $scope.units = [
      {
        type:'destination',
        name:'Set destination',
        startTime:'2:30pm',
        duration:'30mins'
      },
      {
        type:'gather',
        name:'Gather resources',
        startTime:'2:30pm',
        duration:'30mins'
      },
      {
        type:'generate',
        name:'Generate ideas',
        startTime:'2:30pm',
        duration:'30mins'
      },
      {
        type:'filter',
        name:'Sort and filter',
        startTime:'2:30pm',
        duration:'30mins'
      },
      {
        type:'action',
        name:'Plan of action',
        startTime:'2:30pm',
        duration:'30mins'
      }
    ];    
    $scope.submit = function(create){
      if(create || $scope.session._id) {
        $http.post('/api/teams/user', $scope.session).success(function(){
          Alert.log('Session updated');
        });
      }
    };
  });