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
        libraryOpen,
        _resource,
        updated;
    return {
      updateResources: function (_resources) {
        console.log('starting update');
        $timeout(function(){
          angular.forEach(_resources, function(resource){
            var foundIt;
            for(var f=0; f<resources[resource.type].length; f++) {
              if(resources[resource.type][f]._id===resource._id) {
                foundIt = true;
                resources[resource.type][f] = resource;
                break;
              }
            }
            if(!foundIt) {
              resources[resource.type].push(resource);
            }
          });
          updated = Date.now();
        });
      },
      sendResource: function(resource) {
        $http.post('/api/resource/addupdate', {resource:resource});
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
      fetchResourceById: function(id) {
        var defer = $q.defer();
        $http.get('/api/resource/' + id)
        .success(function(resource) {
          $timeout(function(){
            _resource = resource;
            defer.resolve(resource);
          });
        });
        return defer.promise;
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
      libraryOpen: libraryOpen,
      updated: function() {
        return updated;
      }
    };
  });
