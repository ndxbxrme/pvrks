'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.Idea
 * @description
 * # Idea
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Idea', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
