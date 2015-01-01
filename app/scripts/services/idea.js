'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Idea', function ($http, $timeout, Session) {
    var ideas = [];
    var modalOpen;
    var updated;
    return {
      sendIdea: function(idea) {
        $http.post('/api/idea/add', idea);
      },
      addIdea: function(idea) {
        //todo only add ideas related to the current unit
        ideas.push(idea);
        updated = Date.now();
      },
      getIdeas: function(){
        return ideas;
      },
      fetchIdeas: function() {
        ideas = [];
        var ids = {
          session: Session.getSession()._id,
          type:Session.getUnit().type
        };
        $http.post('/api/ideas', {id:ids})
        .success(function(_ideas){
          $timeout(function(){
            _ideas.forEach(function(idea){
              ideas.push(idea);
            });
            updated = Date.now();
          });
        });
      },
      modalOpen: modalOpen,
      updated: function() {
        return updated;
      }
    };
  });
