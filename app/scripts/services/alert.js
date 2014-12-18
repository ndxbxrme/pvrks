'use strict';
/*global angular:false, humane:false*/
angular.module('workspaceApp')
  .factory('Alert', function () {
    return {
      log: function(msg) {
        humane.log(msg);
      }
    };
  });
