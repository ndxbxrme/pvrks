'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('ideaModal', function (Idea) {
    return {
      templateUrl: '/views/partials/ideamodal.html',
      restrict: 'EA',
      replace: true,
      scope: {
        sessionId: '@',
        unitId: '@',
        ideaOpen: '=ideaModal'
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('sessionId', function(n){
          if(!n) {
            return;
          }
          Idea.fetchIdeas({session:n});
        });
        scope.sendIdea = function sendIdea() {
          Idea.sendIdea({
            content: scope.idea.content,
            session: scope.sessionId,
            unit: scope.unitId
          });
          scope.idea = undefined;
          scope.ideaOpen = false;
        };
        scope.closeIdea = function closeIdea() {
          scope.ideaOpen = false;
        };
      }
    };
  });
