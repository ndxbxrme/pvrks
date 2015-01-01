'use strict';
/*global angular:false, d3:false*/
angular.module('workspaceApp')
.directive('ideaBubbles', function($timeout, $filter, Idea, Session){
    return {
        restrict: 'AE',
        scope: { 
        },
        link: function(scope, elem, attrs) {
            Idea.fetchIdeas();
            scope.$watch(function(){return Idea.updated();}, function(n, o){
                if(n!==o) {
                    scope.nodes = Idea.getIdeas();
                    update();
                }
            },true);
            scope.$parent.$watch('ideaSearch', function(n){
                /*if(!n) {
                    return;
                }*/
                scope.nodes = $filter('filter')(Idea.getIdeas(), n);
                update();
            });
            
            var initialSetup = true; //bubble delay on first load
            
            var force = d3.layout.force()
            .gravity(0.02)
            .friction(0.9)
            .charge(90);
            //force.start();
            
            var drag = force.drag().on("dragstart", dragstart);
            
            var body = d3.select(elem[0]);
            var svg = body.append('svg')
            .attr('width', '100%')
            .attr('height', '100%');
            function dragstart(){
                
            }
            
            function getMaxWidth(content) {
                if(content.length < 100) {
                    return '0';
                }
                if(content.length < 200) {
                    return '100';
                }
                if(content.length < 300) {
                    return '200';
                }
                if(content.length < 400) {
                    return '300';
                }
                if(content.length < 500) {
                    return '400';
                }
                return '500';
            }
            
            function update() {
                var width = elem[0].offsetWidth;
                var height = elem[0].offsetHeight;
                var divs = body
                .selectAll('div')
                .data(scope.nodes, function(d){return d._id;});
                
                divs.exit()
                .transition().ease('ease-out')
                .duration(100)
                .style('opacity',0).remove();
                
                divs.enter().append('div')
                .html(function(d){return d.content; })
                .style('min-width', function(d){ return getMaxWidth(d.content) + 'px'})
                .each(function(d){d.radius = Math.max(this.offsetWidth, this.offsetHeight) * 12/20;})
                .style('opacity', 0)
                .transition()
                .ease('elastic')
                .delay(function(d, i) { return initialSetup ? i * 50 : 0; })
                .duration(750)
                .style('opacity', 1);
                
                
                var nodes = svg.selectAll('circle')
                .data(scope.nodes, function(d){return d._id;});
                
                nodes.exit()
                .transition()
                .ease('ease-out').duration(100)
                .attr('r', 0)
                .remove();
                
                nodes.enter().append('circle')
                .style('stroke', function(d, i) { return d.color;})
                .style('fill', function(d){ return d.color;})
                .style('fill-opacity', 0.2)
                .attr('r', 0)
                .transition()
                .ease("elastic")
                .delay(function(d, i) { return initialSetup ? i * 50 : 0; })
                .duration(750)
                .attr('r', function(d) {return d.radius; });
                svg.selectAll('circle').call(drag);
                
                
                
                force.nodes(scope.nodes, function(d){return d._id;})
                .size([width, height]);
                force.start();
                
            }
            //update();
            $timeout(function(){
                initialSetup = false;
            }, 3000);
            
            force.on('tick', function(e){
                
                svg.selectAll('circle')
                .each(collide(0.5))
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; });
                
                body.selectAll('div')
                .style('left', function(d) {return d.x + 'px';})
                .style('top', function(d) {return d.y + 'px';});
            });
            
            function collide(alpha) {
              var quadtree = d3.geom.quadtree(scope.nodes);
              return function(d) {
                var r = d.radius + 120,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                  if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + 6;
                    if (l < r) {
                      l = (l - r) / l * alpha;
                      d.x -= x *= l;
                      d.y -= y *= l;
                      quad.point.x += x;
                      quad.point.y += y;
                    }
                  }
                  return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
              };
            }
        }
    };
});