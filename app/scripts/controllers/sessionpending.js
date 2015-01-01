'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('SessionpendingCtrl', function ($scope, Session) {
    $scope.session = Session.getSession();
    $scope.times = [];
    $scope.now = new Date();
    $scope.insession = true;
  });
