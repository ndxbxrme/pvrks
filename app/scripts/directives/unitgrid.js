'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('unitGrid', function (Toolkit) {
    return {
      templateUrl: '/views/partials/unitgrid.html',
      restrict: 'AE',
      replace: true,
      link: function postLink(scope, element, attrs) {

        scope.$watch('session.startDate', function(n){
          if(!n) {
            return;
          }
          Toolkit.calcTimes(scope);
        });
        var firstChange = true;
        scope.$watch('session.units', function(n){
          if(!n) {
            return;
          }
          if(firstChange) {
            firstChange = false;
          }
          else {
            Toolkit.calcTimes(scope);
            scope.submit();
          }
        }, true);
        
        scope.add = function() {
          scope.unitSelectorOut = true;
        };
        
        scope.addUnit = function(type) {
          scope.newUnit.type = type;
          scope.newUnit.name = undefined;
          /*scope.units.push({
            type:type,
            name:type,
            duration: 15 * 60 * 1000
          });*/
          scope.unitSelectorOut = false;
          scope.unitEditorOut = true;
        };
        
        scope.unitEditorSubmit = function(){
          if(prevUnit) {
            scope.session.units[scope.session.units.indexOf(prevUnit)] = scope.newUnit;
            prevUnit = undefined;
          }
          else {
            scope.session.units.push(scope.newUnit);
          }
          scope.unitEditorOut = false;
        };
        var prevUnit;
        scope.edit = function(unit) {
          scope.newUnit = unit;
          scope.unitEditorOut = true;
          prevUnit = unit;
        };
        
        scope.remove = function(unit) {
          scope.session.units.splice(scope.units.indexOf(unit),1);
        };
        
        scope.close = function() {
        };
      }
    };
  });
