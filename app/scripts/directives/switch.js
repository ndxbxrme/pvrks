'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('switch', function () {
    return {
      template: '<div class="switch"><input type="checkbox" ng-model="switch" /><label><i data-off="{{off}}" data-on="{{on}}"></i></label></div>',
      restrict: 'EA',
      scope: {
        on: '@',
        off: '@',
        'switch': '=ngModel',
        'ngChange': '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('switch', function(n,o){
          if(angular.isDefined(n) && angular.isDefined(o)){
            scope.ngChange();
          };
        });
      }
    };
  });
