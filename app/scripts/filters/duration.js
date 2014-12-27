'use strict';
/*global angular:false, iD:false*/
angular.module('workspaceApp')
  .filter('duration', function () {
    return function (input, type) {
      if(type==='largest') {
        var r = /([0-9]+) ([a-z]+)/.exec(iD.formatDuration(input));
        if(r) {
          return r[1] + ' ' + r[2];
          //return (+r[1] + 1) + ' ' + r[2] + (r[1]==='1' ? 's':'');
        }
        else {
          return '...';
        }
      }
      return iD.formatDuration(input);
    };
  });
