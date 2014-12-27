'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('OrgCtrl', function ($scope,$route,$http,Socket,Alert) {
    $scope.slug = $route.current.params.slug;
    $http.get('/api/organisation/' + $route.current.params.slug)
    .success(function(org){
      $scope.org = org;
      Socket.setIds({
        org: org._id,
        team: undefined,
        session: undefined
      });
    });
    
    $scope.sendInvite = function sendInvite(){
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my organization',
          ids:{
            org:{
              id:$scope.org._id,
              name:$scope.org.name,
              image:$scope.org.image
            }
          }
        }
      })
      .success(function(invite){
        $scope.inviteToken = invite._id;
        Alert.log('Invite sent ' + invite._id);
      });
    };
  });
