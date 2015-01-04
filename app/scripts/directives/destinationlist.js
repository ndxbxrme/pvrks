'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('destinationList', function (Idea, $http, $filter, Session, User) {
    return {
      templateUrl: '/views/partials/destinationlist.html',
      restrict: 'EA',
      replace: true,
      scope: {},
      link: function postLink(scope, element, attrs) {
        Idea.fetchIdeas();
        scope.Session = Session;
        scope.$watch(function(){
          return Idea.updated();
        }, function(n,o) {
          if(n && n!==o) {
            console.log('im gettin in the way');
            scope.accepted = $filter('filter')(Idea.getIdeas(), {modResult:'accepted', deleted:undefined});
            scope.accepted = $filter('orderBy')(scope.accepted, 'index');
            var opts = {modResult:'undefined', deleted:undefined};
            if(Session.getSession().role>1) {
              opts.userId = User.details._id;
            }
            scope.awaiting = $filter('filter')(Idea.getIdeas(), opts);
            opts.modResult = 'rejected';
            scope.rejected = $filter('filter')(Idea.getIdeas(), opts);
          }
        });
        scope.acceptIdea = function acceptIdea(idea) {
          $http.get('/api/idea/' + idea._id + '/accept');
        };
        scope.rejectIdea = function rejectIdea(idea) {
          $http.get('/api/idea/' + idea._id + '/reject');
        };
        scope.edit = function edit(idea) {
          Idea.currentIdea = idea;
          Idea.modalOpen = true;
        };
        scope.options = {
          stop: function(e, ui) {
            for(var f=0; f<scope.accepted.length; f++) {
              scope.accepted[f].index = f;
            }
            $http.post('/api/ideas/update', {ideas:scope.accepted});
          }
        };
      }
    };
  });
