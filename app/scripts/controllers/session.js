'use strict';
/*global angular:false, iD:false*/
angular.module('workspaceApp')
  .controller('SessionCtrl', function ($scope, $route, $http, User, Socket, $timeout, Idea, Alert, Session, Nav) {
    $scope.slug = $route.current.params.slug;
    $scope.Idea = Idea;
    $scope.Session = Session;
    function load() {
      if($scope.slug){
        Session.fetchSessionBySlug($route.current.params.slug)
        .then(function(session){
          if(session) {
            Socket.setIds({
              org: undefined,
              team: undefined,
              session: session._id
            });
            Nav.pageTitle =  session.name;
            Nav.titleUrl = '/session/' + session.slug + '/edit';
            Nav.color = session.color;
            Session.startChecking();
          }
        });
      }
    }
    load();
    
    $scope.sendInvite = function sendInvite(){
      var session = Session.getSession();
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my session',
          ids: {
            session: {
              id:session._id,
              name:session.name,
              image:session.image
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
