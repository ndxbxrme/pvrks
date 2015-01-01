'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('nav', function (Idea, Resource, Invite) {
    return {
      templateUrl: '/views/partials/nav.html',
      restrict: 'EA',
      replace: true,
      link: function(scope, elem, attrs) {
        scope.Idea = Idea;
        scope.Resource = Resource;
        scope.Invite = Invite;
      }
    };
  });
