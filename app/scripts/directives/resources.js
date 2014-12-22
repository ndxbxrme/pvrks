'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('resources', function (Resource) {
    return {
      templateUrl: '/views/partials/resources.html',
      restrict: 'AE',
      replace: true,
      scope: {
        type: '@resources',
        rid: '@'
      },
      link: function postLink(scope, element, attrs) {
        scope.resources = Resource;
        
        scope.$watch('rid', function(n){
          if(!n) {
            return;
          }
          var obj = {};
          obj[scope.type] = n;
          Resource.fetchResources(obj, scope.type);
        });
      }
    };
  });
