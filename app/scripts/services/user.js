'use strict';
/*global angular:false*/
/**
 * @ngdoc service
 * @name workspaceApp.User
 * @description
 * # User
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('User', function () {
    var isLoggedIn = false;
    var details;
    var message;
    return {
      isLoggedIn:isLoggedIn,
      details:details,
      message:message
    };
  });
