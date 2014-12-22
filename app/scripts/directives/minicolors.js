'use strict';
/*global angular: false*/
angular.module('workspaceApp')
  .directive('minicolors', function () {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        ngModel.$formatters.unshift(function(value){
          if(value) {
            element.minicolors({
              defaultValue: value
            });
          }
          return value;
        });
      }
    };
  });
