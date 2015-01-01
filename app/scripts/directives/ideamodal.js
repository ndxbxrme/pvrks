'use strict';
/*global angular:false, Snap:false, mina:false*/
angular.module('workspaceApp')
  .directive('ideaModal', function (Idea, Session) {
    return {
      templateUrl: '/views/partials/ideamodal.html',
      restrict: 'EA',
      replace: true,
      scope: {},
      link: function postLink(scope, elem, attrs) {
        scope.Idea = Idea;
        scope.sendIdea = function sendIdea() {
          if(scope.idea && scope.idea.content && scope.idea.content.replace(/<p><br><\/p>/gi,'')){
            Idea.sendIdea({
              content: scope.idea.content.replace(/<p><br><\/p>/gi,''),
              session: Session.getSession()._id,
              unit: Session.getUnit()._id,
              type: Session.getUnit().type
            });
          }
          scope.idea = undefined;
          Idea.modalOpen = false;
        };
        scope.closeIdea = function closeIdea() {
          Idea.modalOpen = false;
        };
      }
    };
  });
