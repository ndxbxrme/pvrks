'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Toolkit', function () {
    return {
      calcTimes: function(scope){
        console.log('hello');
        if(scope.session && scope.session.startDate){
          scope.session.totalDuration = 0;
          var date = new Date(scope.session.startDate);
          for(var f=0; f<scope.session.units.length; f++) {
            scope.times[f] = date;
            scope.session.totalDuration += scope.session.units[f].duration;
            scope.session.endDate = new Date().setTime(new Date(scope.session.startDate).getTime() + scope.session.totalDuration);
            date = new Date(date.getTime()+scope.session.units[f].duration);
          }
        }         
      }
    };
  });
