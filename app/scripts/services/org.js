'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Org', function ($http, $timeout, $q) {
    var _orgs = [];
    var _org;
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
        if(_org && _org._id===org._id) {
          _org = org;
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
      fetchOrgBySlug: function(slug){
        var defer = $q.defer();
        $http.get('/api/organisation/' + slug)
        .success(function(org){
          $timeout(function(){
            _org = org;
            defer.resolve(org);
          });
        });
        return defer.promise;
      },
      updateOrgs: updateOrgs,
      getOrgs: function() {
        return _orgs;
      },
      updateOrg: updateOrg,
      getOrg: function() {
        return _org;
      }
    };
  });
  