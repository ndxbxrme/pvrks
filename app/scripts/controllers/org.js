'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('OrgCtrl', function ($scope,$route,$http,Socket,Alert,Org,Nav,Resource) {
    $scope.slug = $route.current.params.slug;
    $scope.Org = Org;
    Org.fetchOrgBySlug($route.current.params.slug)
    .then(function(org){
      Socket.setIds({
        org: org._id,
        team: undefined,
        session: undefined
      });
      Nav.pageTitle = 'Organization ' + org.name;
      Nav.titleUrl = '/org/' + org.slug + '/edit';
      Nav.color = org.color;
      Resource.currentType = 'org';
      Resource.currentId = org._id;
      Resource.fetchResources({org:org._id}, 'org');
    });
    
    $scope.sendInvite = function sendInvite(){
      var org = Org.getOrg();
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my organization',
          ids:{
            org:{
              id:org._id,
              name:org.name,
              image:org.image
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
