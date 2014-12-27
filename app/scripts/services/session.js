'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Session', function ($http, $timeout) {
    var _sessions = [];
    var updateSessions = function updateSessions(sessions){
      $timeout(function(){
        _sessions = sessions;
      });
    };
    var updateSession = function updateSession(session){
      var updated = false;
      $timeout(function(){
        for(var f=0; f<_sessions.length; f++){
          if(_sessions[f]._id===session._id) {
            console.log('updating');
            _sessions[f] = session;
            updated = true;
          }
        }
        if(!updated) {
           _sessions.push(session);
        }
      });
    };
    return {
      fetchSessions: function () {
        $http.get('/api/sessions/user')
        .success(function(sessions){
          updateSessions(sessions);
        });
        return;
      },
      updateSessions: updateSessions,
      getSessions: function() {
        return _sessions;
      },
      updateSession: updateSession
    };
  });
