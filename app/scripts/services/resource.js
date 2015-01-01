'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Resource', function ($http, $timeout, $q) {
    var resources = {
      'org': [],
      'team': [],
      'session': [],
      'user': []
    };
    var currentType,
        currentId,
        orgId,
        modalOpen,
        libraryOpen;
    return {
      addResource: function (resource) {
        $timeout(function(){
          console.log('adding resource');
          resources[resource.type].push(resource);
        });
      },
      sendResource: function(resource) {
        $http.post('/api/resource/add', resource);
      },
      sendUrlResource: function(url) {
        var defer = $q.defer();
        $http.post('/api/resource/add/url', {url:url})
        .success(function(data){
          return defer.resolve(data);
        });
        return defer.promise;
      },
      fetchResources: function(ids, type) {
        if(!ids) {
          type = currentType;
          ids = {};
          ids[currentType] = currentId;
        }
        currentId = ids[type];
        currentType = type;
        resources[type] = [];
        $http.post('/api/resources', {id:ids})
        .success(function(_resources){
          resources[type] = _resources;
        });
      },
      getResources: function(type) {
        return resources[type];
      },
      clear: function(){
        console.log('meeee' + currentId);
        currentType = undefined;
        currentId = 0;
        console.log(currentId);
        for(var key in resources) {
          resources[key] = [];
        }
      },
      currentType: currentType,
      currentId: currentId,
      orgId: orgId,
      modalOpen: modalOpen,
      libraryOpen: libraryOpen
    };
  });
