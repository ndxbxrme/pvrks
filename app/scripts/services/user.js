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
  .factory('User', function (Socket, Roster) {
    var isLoggedIn = false;
    var details;
    var message;
    var invite;
    var ids;
    return {
      isLoggedIn:isLoggedIn,
      details:details,
      message:message,
      invite:invite,
      ids:ids,
      setIds:function(_ids){
        ids = _ids;
        Roster.setIds(ids);
        Socket.emit('ids', ids);
      }
    };
  });
