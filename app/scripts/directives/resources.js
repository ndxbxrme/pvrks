'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('resources', function (Resource, User) {
    return {
      templateUrl: '/views/partials/resources.html',
      restrict: 'AE',
      replace: true,
      scope: {
      },
      link: function postLink(scope, element, attrs) {
        scope.Resource = Resource;
        scope.User = User;
      }
    };
  });
