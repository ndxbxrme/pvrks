'use strict';
/*global angular:false, Please:false*/
angular.module('workspaceApp')
  .controller('SessionsetupCtrl', function ($scope, $route, $http, $filter, $timeout, User, Toolkit, Alert) {
    var basicSession = [
      {
        type:'destination',
        name:'Set destination',
        duration: 3 * 60 * 1000
      },
      {
        type:'gather',
        name:'Gather resources',
        duration: 3 * 60 * 1000
      },
      {
        type:'generate',
        name:'Generate ideas',
        duration: 3 * 60 * 1000
      },
      {
        type:'filter',
        name:'Sort and filter',
        duration: 3 * 60 * 1000
      },
      {
        type:'action',
        name:'Plan of action',
        duration: 3 * 60 * 1000
      }
    ];  
       $scope.times = [];
        $scope.newUnit = {};
    $scope.slug = $route.current.params.slug;
    function load() {
      if($scope.slug){
        $http.get('/api/session/' + $scope.slug)
        .success(function(session){
          if(session) {
            $scope.session = session;
            Toolkit.calcTimes($scope);
            angular.forEach(session.users, function(user){
              if(user.id===User.details._id) {
                $scope.role = user.role;
              }
            });
          }
          else {
            $scope.session = {
              color: Please.make_color(),
              units: basicSession
            };
          }
        });
      }
      else {
        $scope.session = {
          color: Please.make_color(),
          units: basicSession
        };
      }
      $http.get('/api/organisations/user')
      .success(function(orgs){
        $scope.orgs = orgs;
      });
    }
    load();
  
    $scope.submit = function(create){
      if(create || $scope.session._id) {
        $http.post('/api/session/user', $scope.session).success(function(){
          Alert.log('Session updated');
        });
      }
    };
  });