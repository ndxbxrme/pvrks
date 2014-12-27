'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Org', function ($http, $timeout) {
    var _orgs = [];
    var updateOrgs = function updateorgs(orgs){
      $timeout(function(){
        _orgs = orgs;
      });
    };
    var updateOrg = function updateTeam(org){
      var updated = false;
      $timeout(function(){
        for(var f=0; f<_orgs.length; f++){
          if(_orgs[f]._id===org._id){
            _orgs[f] = org;
            updated = true;
          }
        }
        if(!updated){
          _orgs.push(org);
        }
      });
    };
    return {
      fetchOrgs: function(){
        $http.get('/api/organisations/user')
        .success(function(orgs){
          updateOrgs(orgs);
        });
        return;
      },
      updateOrgs: updateOrgs,
      getOrgs: function() {
        return _orgs;
      },
      updateOrg: updateOrg
    };
  });
  