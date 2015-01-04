'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('sessionResources', function (Resource, User, Session, Team, Org) {
    return {
      templateUrl: '/views/partials/librarymodal.html',
      restrict: 'EA',
      replace: true,
      scope: {
      },
      link: function postLink(scope, element, attrs) {
        scope.Resource = Resource;
        scope.User = User;
        scope.Session = Session;
        scope.Team = Team;
        scope.Org = Org;
        scope.type = 'team';
        scope.close = function close() {
          Resource.libraryOpen = false;
        };
        scope.selectParent = function selectParent(id,type) {
          var ids = {};
          ids[type] = id;
          Resource.fetchResources(ids, type);
        };
      }
    };
  });
