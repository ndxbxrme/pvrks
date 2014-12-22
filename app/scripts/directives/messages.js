'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('messages', function (Message, $timeout) {
    return {
      templateUrl: '/views/partials/messages.html',
      restrict: 'EA',
      replace: true,
      scope: {
        type: '@messages',
        mid: '@'
      },
      link: function postLink(scope, element, attrs) {
        scope.message = Message;
        var scroll = element.find('div');
        var nice = scroll.niceScroll();
        scope.$watch(function(){
          return Message.getMessages(scope.type);
        }, function(){
          $timeout(function(){
            //console.log(nice.getScrollTop(),nice.page.maxh);
            //if(nice.getScrollTop() === nice.page.maxh) {
              nice.setScrollTop(scroll.prop('scrollHeight'));
            //}
          }, 100);
        },true);
        scope.$watch('mid', function(n){
          if(!n) {
            return;
          }
          var obj = {};
          obj[scope.type] = n;
          Message.fetchMessages(obj, scope.type);
        });
    
        scope.sendMessage = function sendMessage() {
          var obj = {
            content: scope.messageContent,
            type:scope.type
          };
          obj[scope.type] = scope.mid;
          Message.sendMessage(obj);
          scope.messageContent = undefined;
        };
      }
    };
  });
