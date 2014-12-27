'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Idea', function ($http, $timeout) {
    var ideas = [{radius:0}];
    return {
      sendIdea: function(idea) {
        $http.post('/api/idea/add', idea);
      },
      addIdea: function(idea) {
        ideas.push(idea);
      },
      getIdeas: function(){
        return ideas;
      },
      fetchIdeas: function(ids) {
        ideas = [{radius:0}];
        $http.post('/api/ideas', {id:ids})
        .success(function(_ideas){
          $timeout(function(){
            _ideas.forEach(function(idea){
              ideas.push(idea);
            });
          });
        });
      }
    };
  });
