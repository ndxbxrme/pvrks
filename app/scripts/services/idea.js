'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Idea', function ($http, $timeout, Session) {
    var ideas = [];
    var modalOpen;
    var updated;
    var currentIdea;
    var placeholder;
    return {
      sendIdea: function(idea) {
        idea.role = Session.getSession().role;
        idea.needsModeration = Session.getUnit().needsModeration;
        $http.post('/api/idea/addupdate', {idea:idea});
      },
      updateIdeas: function(_ideas) {
        //todo only add ideas related to the current unit
        angular.forEach(_ideas, function(idea){
          var foundIdea;
          for(var f=0; f<ideas.length; f++) {
            if(ideas[f]._id===idea._id) {
              foundIdea = true;
              ideas[f] = idea;
              break;
            }
          }
          if(!foundIdea) {
            ideas.push(idea);
          }
        });
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
      currentIdea: currentIdea,
      placeholder: placeholder,
      updated: function() {
        return updated;
      }
    };
  });
