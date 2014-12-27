'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Session', function ($http, $timeout, $q) {
    var _sessions = [];
    var _session;
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
            _sessions[f] = session;
            updated = true;
          }
        }
        if(!updated) {
           _sessions.push(session);
        }
        if(_session && _session._id===session._id){
          _session = session;
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
      fetchSessionBySlug: function(slug){
        var defer = $q.defer();
        $http.get('/api/session/' + slug)
        .success(function(session){
          $timeout(function(){
            _session = session;
            defer.resolve(session);
          });
        });
        return defer.promise;
      },
      updateSessions: updateSessions,
      getSessions: function() {
        return _sessions;
      },
      updateSession: updateSession,
      getSession: function() {
        return _session;
      }
    };
  });
