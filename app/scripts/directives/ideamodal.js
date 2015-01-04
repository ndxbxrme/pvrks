'use strict';
/*global angular:false, Snap:false, mina:false*/
angular.module('workspaceApp')
  .directive('ideaModal', function (Idea, Session, Nav, $window, $timeout) {
    return {
      templateUrl: '/views/partials/ideamodal.html',
      restrict: 'EA',
      replace: true,
      scope: {},
      link: function postLink(scope, elem, attrs) {
        scope.Idea = Idea;
        scope.sendIdea = function sendIdea() {
          scope.idea.content = scope.idea.content.replace(/<p><br><\/p>/gi,'');
          if(scope.idea && scope.idea.content){
            if(scope.idea._id) {
              Idea.sendIdea(scope.idea);
            }
            else {
              Idea.sendIdea({
                content: scope.idea.content,
                session: Session.getSession()._id,
                unit: Session.getUnit()._id,
                type: Session.getUnit().type
              });
            }
          }
          scope.idea = undefined;
          Idea.currentIdea = undefined;
          Idea.modalOpen = false;
        };
        scope.closeIdea = function closeIdea() {
          Idea.modalOpen = false;
        };
        $window.addEventListener('keyup', function(e) {
          e = e || event;
          if(e.keyCode===73 && e.ctrlKey && !Idea.modalOpen) {
            Idea.modalOpen = true;
            $timeout(function(){
              scope.idea = undefined;
              Idea.currentIdea = undefined;
            });
          }
          if(e.keyCode===27 && Idea.modalOpen) {
            Idea.modalOpen = false;
            scope.idea = undefined;
            Idea.currentIdea = undefined;
          }
        });
        scope.$watch(function(){
          return Idea.modalOpen;
        }, function(n){
          if(n) {
            if(Idea.currentIdea) {
              scope.idea = Idea.currentIdea;
            }
            elem.find('.froala-element').focus();
          }
        });
      }
    };
  });
