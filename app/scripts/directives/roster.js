'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('roster', function (Roster) {
    return {
      templateUrl: '/views/partials/roster.html',
      restrict: 'A',
      scope: {
        type: '@roster'
      },
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.roster = Roster;
      }
    };
  });
