'use strict';
/*global angular:false, $:false*/
angular.module('workspaceApp')
  .directive('sessionGrid', function () {
    return {
      templateUrl: '/views/partials/sessiongrid.html',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.find('ul').gridster({
          widget_margins: [10, 10],
          widget_base_dimensions: [140, 140]
        });
      }
    };
  });
