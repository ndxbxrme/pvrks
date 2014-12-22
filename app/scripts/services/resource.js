'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Resource', function ($http, $timeout) {
    var resources = {
      'org': [],
      'team': [],
      'session': [],
      'user': []
    };
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
      fetchResources: function(ids, type) {
        resources[type] = [];
        $http.post('/api/resources', {id:ids})
        .success(function(_resources){
          resources[type] = _resources;
        });
      },
      getResources: function(type) {
        return resources[type];
      }
    };
  });
