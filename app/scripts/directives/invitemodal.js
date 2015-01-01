'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('inviteModal', function (Invite) {
    return {
      templateUrl: '/views/partials/invitemodal.html',
      restrict: 'EA',
      replace: true,
      scope: {},
      link: function postLink(scope, element, attrs) {
        scope.Invite = Invite;
        scope.close = function close() {
          Invite.modalOpen = false;
        };
      }
    };
  });
