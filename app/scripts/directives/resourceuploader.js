'use strict';
/*global angular:false, Snap:false, mina:false*/
angular.module('workspaceApp')
  .directive('resourceUploader', function($upload, $timeout, Resource, Alert) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: '/views/partials/resourceuploader.html',
      scope: {},
      link: function postLink(scope, elem, attrs) {
        scope.Resource = Resource;



        window.addEventListener("dragover", function(e) {
          e = e || event;
          //console.log(e);
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
          if (!Resource.modalOpen) {
            Resource.modalOpen = true;
            console.log(e);
            scope.$apply();
          }
        }, false);
        /*window.addEventListener('dragleave', function(e) {
          e = e || event;
          e.preventDefault();
          if (Resource.modalOpen) {
            Resource.modalOpen = false;
            scope.$apply();
            doAnimate();
          }
        });*/
        elem[0].addEventListener("drop", function(e) {
          var url = e.dataTransfer.getData("url") ||e.dataTransfer.getData("text/uri-list");
          var text = e.dataTransfer.getData("Text");
          if(url) {
            scope.uploading = true;
            scope.processing = true;
            scope.status = "Processing resource";
            Resource.sendUrlResource(url)
            .then(function(result){
              scope.result = result;
              scope.type = 'webpage';
              scope.url = url;
              scope.uploading = false;
              scope.processing = false;
            });
          }
          else if(text) {
            
          }
          e = e || event;
          e.preventDefault();
        }, false);
        scope.onFileSelect = function($files) {
          if(!scope.uploading && $files[0]) {
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
                scope.result = data;
                console.log(data);
                if(data.resource_type==='raw') {
                  //get screenshot
                  Resource.sendUrlResource(data.url)
                  .then(function(result){
                    scope.result.public_id = result.public_id;
                    scope.result.resource_type = 'rawImage';
                    scope.type = 'image';
                    scope.uploading = false;
                  });
                }
                else {
                  scope.type = 'image';
                  scope.uploading = false;
                }
              });
            });
          }
        };
        scope.close = function close(){
          if(Resource.modalOpen) {
            $timeout(function(){
              Resource.modalOpen = false;
              //doAnimate();
            });
          }
        };
        scope.open = function close(){
          if(!Resource.modalOpen) {
            $timeout(function(){
              Resource.modalOpen = true;
              //doAnimate();
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
            url: scope.url,
            type: Resource.currentType,
            image: scope.result.public_id,
            resourceId: scope.result.public_id,
            resourceType: scope.result.resource_type,
            secureUrl: scope.result.secure_url,
            tags: scope.tags,
            ids: {}
          };
          obj.ids.orgid = Resource.orgId;
          obj.ids[Resource.currentType] = Resource.currentId;
          Resource.sendResource(obj);
          $timeout(function(){
            scope.name = undefined;
            scope.tags = undefined;
            scope.result = undefined;
            scope.progress = undefined;
          });
          scope.close();
          Alert.log('Resource added');
        };
      }
    };
  });
