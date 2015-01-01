'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Session', function ($http, $timeout, $q, $filter, User, Nav) {
    var _sessions = [];
    var _session;
    var currentUnit;
    var nextStartTime;
    var lastStartTime;
    var now;
    var inprogress;
    var finished;
    var pending;
    var countdown;
    var running;
    var percentage;
    var updateSessions = function updateSessions(sessions){
      $timeout(function(){
        _sessions = sessions;
      });
    };
    var updateSession = function updateSession(session){
      var updated = false;
      $timeout(function(){
        angular.forEach(session.users, function(user){
          if(user.id===User.details._id) {
            session.role = user.role;
          }
        });
        session.epochStart = Date.parse(session.startDate);
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
    var checkUnit = function checkUnit() {
      now = Date.now();
      var subtitle = '';
      nextStartTime = lastStartTime = currentUnit = undefined;
      var durationTally = 0;
      for(var f=0; f<_session.units.length; f++) {
        durationTally += _session.units[f].duration;
        if(_session.epochStart + durationTally > now) {
          currentUnit = _session.units[f];
          nextStartTime = _session.epochStart + durationTally;
          lastStartTime = nextStartTime - currentUnit.duration;
          break;
        }
      }
      if(!nextStartTime) {
        nextStartTime = _session.epochStart + durationTally;
        percentage = 0;
      }
      if(now < _session.epochStart) {
        inprogress = false;
        finished = false;
        pending = true;
        countdown = _session.epochStart - now;
        subtitle = 'Starts in ' + $filter('duration')(countdown, 'largest');
        percentage = 0;
      }
      else if(now < _session.epochStart + durationTally) {
        inprogress = true;
        finished = false;
        pending = false;
        countdown = nextStartTime - now;
        percentage = (now - lastStartTime) / (nextStartTime - lastStartTime) * 100;
        subtitle = currentUnit.name;
      }
      else {
        inprogress = false;
        finished = true;
        pending = false;
        countdown = now - nextStartTime;
        subtitle = 'Ended ' + $filter('duration')(countdown, 'largest') + ' ago';
        percentage = 0;
      }
      if(running) {
        Nav.subtitle = subtitle;
        $timeout(function(){
          checkUnit();
        }, 50);
      }
    };
    return {
      clearData: function(){
        _sessions = [];
        _session = undefined;
      },
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
          //Idea.fetchIdeas({session:session._id});
          angular.forEach(session.users, function(user){
            if(user.id===User.details._id) {
              session.role = user.role;
            }
          });
          session.epochStart = Date.parse(session.startDate);
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
      },
      checkUnit: checkUnit,
      getUnit: function() {
        return currentUnit;
      },
      nextStartTime: nextStartTime,
      lastStartTime: lastStartTime,
      now: function() {
        return now;
      },
      inprogress: function() {
        return inprogress;
      },
      finished: function() {
        return finished;
      },
      pending: function() {
        return pending;
      },
      countdown: function() {
        return countdown;
      },
      percentage: function() {
        return percentage;
      },
      startChecking: function() {
        if(!running) {
          running = true;
          checkUnit();
        }
      },
      stopChecking: function() {
        running = false;
      }
    };
  });
