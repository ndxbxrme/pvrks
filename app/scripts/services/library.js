'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.Library
 * @description
 * # Library
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Library', function () {
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
