'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Roster', function ($timeout, $http) {
    var rosters = {
      'org': [],
      'team': [],
      'session': []
    };
    var allUsers = {
      'org': [],
      'team': [],
      'session': []
    };
    var ids;
    var reloading = false;
    var setOnline = function setOnline(type) {
      angular.forEach(allUsers[type], function(user){
        user.online = false;
        for(var f=0; f<rosters[type].length; f++) {
          if(rosters[type][f]._id===user.id) {
            user.online = true;
            break;
          }
        }
      });
    };
    var doReload = function doReload(type){
      reloading = true;
      $http.get('/api/users/' + type + '/' + ids[type])
      .success(function(users){
        reloading = false;
        $timeout(function(){
          allUsers[type] = users;
          setOnline(type);
        });
      });     
    };
    return {
      ids:ids,
      setRoster: function (data, currentUser) {
        $timeout(function(){
          rosters[data.type] = data.users;
          var needsReload = false;
          angular.forEach(rosters[data.type],function(rosterUser){
            var hasUser = false;
            for(var f=0; f<allUsers[data.type].length; f++) {
              if(allUsers[data.type][f].id!==rosterUser._id) {
                hasUser = true;
                break;
              }
            }
            needsReload = needsReload || !hasUser;

          });
          if(needsReload && !reloading && ids) {
            doReload(data.type);
          }
          else if(ids) {
            setOnline(data.type); 
          }
        });
      },
      getRoster: function(type) {
        return rosters[type];
      },
      getAllUsers: function(type) {
        return allUsers[type];
      },
      setIds: function(_ids) {
        ids = _ids;
        for(var key in _ids) {
          if(_ids[key]) {
            doReload(key);
          }
        }
      },
      clear: function(){
        for(var key in rosters) {
          rosters[key] = [];
        }
        for(var key in allUsers) {
          allUsers[key] = [];
        }
      },
      doReload: doReload
    };
  });
