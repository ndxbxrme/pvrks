'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('resource', function () {
    return {
      templateUrl: '/views/partials/resource.html',
      restrict: 'AE',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //element.text('this is the resource directive');
      }
    };
  });
