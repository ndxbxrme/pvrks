'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('SessionbreakCtrl', function ($scope, Session) {
    $scope.session = Session.getSession();
    $scope.times = [];
    $scope.now = new Date();
    $scope.insession = true;
  });
