'use strict';
/*global angular:false, Snap:false, mina:false*/
angular.module('workspaceApp')
  .directive('morph', function () {
    return {
      templateUrl: '/views/partials/morph.html',
      restrict: 'EA',
      scope: {
        open: '@morph'
      },
      link: function(scope, elem, attrs) {
        function doAnimate() {
          path.stop().animate({
            'path': paths.active
          }, 150, mina.easeout, function() {
            path.stop().animate({
              'path': paths.reset
            }, 800, mina.elastic);
          });
        }
        scope.$watch('open', function(n){
          doAnimate();
        });
        var shape = elem[0].querySelector('.morph-shape');
        var s = Snap(shape.querySelector('svg'));
        var path = s.select('path');
        var paths = {
          reset: path.attr('d'),
          active: shape.getAttribute('data-morph-active')
        }; 
      }
    };
  });
