'use strict';
/*global angular:false, iD:false*/
angular.module('workspaceApp')
  .controller('SessionCtrl', function ($scope, $route, $http, User, Socket, $timeout, Idea, Alert, Session) {
    $scope.slug = $route.current.params.slug;
    $scope.Idea = Idea;
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
          }
        });
      }
    }
    $scope.$watch(function(){
      return Session.getSession();
    }, function(n){
      console.log(n);
      if(!n){
        return;
      }
      $scope.session = n;
      $scope.session.epochDate = Date.parse(n.startDate);
      checkUnit();
      angular.forEach(n.users, function(user){
        if(user.id===User.details._id) {
          $scope.role = user.role;
        }
      });
      tick();      
    });
    load();
    $scope.now = Date.now();
    function checkUnit() {
      var durationTally = 0;
      $scope.nextStartTime = undefined;
      $scope.lastStartTime = undefined;
      $scope.currentUnit = undefined;
      for(var f=0; f<$scope.session.units.length; f++){
        durationTally += $scope.session.units[f].duration;
        if($scope.session.epochDate + durationTally > Date.now()) {
          $scope.currentUnit = $scope.session.units[f];
          $scope.nextStartTime =new Date($scope.session.epochDate + durationTally);
          $scope.lastStartTime = new Date($scope.nextStartTime - $scope.currentUnit.duration);
          break;
        }
      }
      $scope.done = false;
      if(!$scope.nextStartTime) {
        $scope.nextStartTime = new Date($scope.session.epochDate + durationTally);
        $scope.done = true;
      }
    }
    function tick() {
      $scope.now = Date.now();
      if($scope.now > $scope.session.epochDate && !$scope.done) {
        $scope.inprogress = true;
        $scope.finished = false;
        $scope.waitingToStart = false;
        $scope.percentage = ($scope.now - $scope.lastStartTime.getTime()) / ($scope.nextStartTime.getTime() - $scope.lastStartTime.getTime()) * 100;
        if($scope.percentage > 100) {
          checkUnit();
        }
      }
      else {
        if($scope.nextStartTime.getTime() < $scope.now){
          $scope.finished = true;
          $scope.countdown = iD.formatDuration($scope.now - $scope.nextStartTime.getTime());
        }
        else {
          $scope.waitingToStart = true;
          $scope.countdown = iD.formatDuration($scope.session.epochDate - $scope.now)
        }
        $scope.inprogress = false;
      }
      $timeout(tick, 50);
    }
    
    $scope.sendInvite = function sendInvite(){
      $http.post('/api/invite/send', {
        invite:{
          name:'yo there',
          content:'join my session',
          ids: {
            session: {
              id:$scope.session._id,
              name:$scope.session.name,
              image:$scope.session.image
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
