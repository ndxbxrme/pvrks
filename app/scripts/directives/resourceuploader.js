'use strict';
/*global angular:false, Snap:false, mina:false*/
angular.module('workspaceApp')
  .directive('resourceUploader', function($upload, $timeout, Resource, Alert) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: '/views/partials/resourceuploader.html',
      scope: {
        type: '@resourceUploader',
        rid: '@',
        orgid: '@'
      },
      link: function postLink(scope, elem, attrs) {
        scope.out = false;
        var shape = elem[0].querySelector('.morph-shape');
        var s = Snap(shape.querySelector('svg'));
        console.log(s);
        var path = s.select('path');
        var paths = {
          reset: path.attr('d'),
          active: shape.getAttribute('data-morph-active')
        };
        
        var uploadTarget = elem[0].querySelector('.upload-target');
        var us = Snap(uploadTarget.querySelector('svg'));
        var uPath = us.select('path');
        var uPaths = {
          reset: uPath.attr('d'),
          active: uploadTarget.getAttribute('data-morph-active')
        };

        function doAnimate() {
          path.stop().animate({
            'path': paths.active
          }, 150, mina.easeout, function() {
            path.stop().animate({
              'path': paths.reset
            }, 800, mina.elastic);
          });
          uPath.stop().animate({
            'path': uPaths.active
          }, 150, mina.easeout, function() {
            uPath.stop().animate({
              'path': uPaths.reset
            }, 800, mina.elastic);
          });
        }
        window.addEventListener("dragover", function(e) {
          e = e || event;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
          if (!scope.out) {
            scope.out = true;
            scope.$apply();
            doAnimate();
          }
        }, false);
        /*window.addEventListener('dragleave', function(e) {
          e = e || event;
          e.preventDefault();
          if (scope.out) {
            scope.out = false;
            scope.$apply();
            doAnimate();
          }
        });*/
        window.addEventListener("drop", function(e) {
          e = e || event;
          e.preventDefault();
        }, false);
        scope.onFileSelect = function($files) {
          if(!scope.uploading) {
            scope.uploading = true;
            var file = $files[0]; // we're not interested in multiple file uploads here
            scope.upload = $upload.upload({
              url: "https://api.cloudinary.com/v1_1/parks-brainstorm/upload",
              data: {
                upload_preset: 'dz2tvgod',
                tags: 'myphotoalbum',
                context: 'photo=' + scope.title
              },
              file: file
            }).progress(function(e) {
              $timeout(function(){
                scope.progress = Math.round((e.loaded * 100.0) / e.total);
                scope.status = "Uploading... " + scope.progress + "%";
              });
            }).success(function(data, status, headers, config) {
              $timeout(function(){
                data.context = {
                  custom: {
                    photo: scope.title
                  }
                };
                console.log(data);
                scope.result = data;
                scope.uploading = false;
              });
            });
          }
        };
        scope.close = function close(){
          if(scope.out) {
            $timeout(function(){
              scope.out = false;
              doAnimate();
            });
          }
        };
        scope.open = function close(){
          if(!scope.out) {
            $timeout(function(){
              scope.out = true;
              doAnimate();
            });
          }
        };

        /* Modify the look and fill of the dropzone when files are being dragged over it */
        scope.dragOverClass = function($event) {
          var items = $event.dataTransfer.items;
          var hasFile = false;
          if (items != null) {
            for (var i = 0; i < items.length; i++) {
              if (items[i].kind == 'file') {
                hasFile = true;
                break;
              }
            }
          }
          else {
            hasFile = true;
          }
          return hasFile ? "dragover" : "dragover-err";
        };
        
        scope.sendResource = function sendResource() {
          var obj = {
            name: scope.name,
            type: scope.type,
            image: scope.result.public_id,
            resourceId: scope.result.public_id,
            resourceType: scope.result.resource_type,
            tags: scope.tags,
            ids: {}
          };
          obj.ids.orgid = scope.orgid;
          obj.ids[scope.type] = scope.rid;
          Resource.sendResource(obj);
          scope.name = undefined;
          scope.tags = undefined;
          scope.result = undefined;
          scope.close();
          Alert.log('Resource added');
        };
      }
    };
  });
