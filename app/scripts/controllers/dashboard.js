'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, $window, $timeout, Socket, User, Alert, Session, Team, Org, Nav) {
    Socket.setIds({
      org:undefined,
      team:undefined,
      session:undefined
    });
    $scope.Session = Session;
    $scope.Team = Team;
    $scope.Org = Org;
    Nav.pageTitle = 'PɅRKS';
    var loadData = function loadData(){
      $http.post('/api/invites/user', {
        userId:User.details._id,
        inviteId:$window.location.search.replace('?','')
      })
      .success(function(invites) {
        $scope.invites = invites;
      });
    };
    loadData();

    function tick(){
      $scope.now = Date.now();
      $timeout(tick, 1000);
    }
    tick();

    $scope.acceptInvite = function(invite){
      if(!invite) {
        invite = {
          _id:$scope.inviteToken
        }
      }
      $http.post('/api/invite/accept', invite).success(function(){
        $scope.inviteToken = undefined;
        loadData();
        Session.fetchSessions();
        Team.fetchTeams();
        Org.fetchOrgs();
        Alert.log('Invite accepted');
      });
    };
    $scope.declineInvite = function(invite){
      $http.post('/api/invite/decline', invite).success(function(){
        $scope.inviteToken = undefined;
        loadData();
        Alert.log('Invite declined');
      })
    }
  });
