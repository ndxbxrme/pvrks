'use strict';
/*global angular:false, _:false*/
/**
 * @ngdoc directive
 * @name workspaceApp.directive:tooltip
 * @description
 * # tooltip
 */
angular.module('workspaceApp')
  .directive('tooltip', function () {
    return {
      scope: {
        tooltip: '@' 
      },
      restrict: 'A',
      link: function postLink(scope, element) {
        element.addClass('tooltip');
        element.tooltipster({
          content: _.str.unescapeHTML(scope.tooltip)
        });
        scope.$watch('tooltip', function(n){
          if(!n) {
            return;
          }
          element.tooltipster('content', _.str.unescapeHTML(scope.tooltip));
        });
      }
    };
  });