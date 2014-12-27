'use strict';
/*global angular:false, iD:false*/
angular.module('workspaceApp')
  .directive('duration', function () {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        ngModel.$parsers.unshift(function(value){
          return iD.interpretDuration(value);
        });
        ngModel.$formatters.unshift(function(value){
          return iD.formatDuration(parseInt(value,10));
        });
      }
    };
  });
