'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .directive('imageUploader', function ($upload, $timeout) {
    return {
      templateUrl: '/views/partials/imageuploader.html',
      require: 'ngModel',
      restrict: 'AE',
      link: function postLink(scope, element, attrs, ngModel) {
        scope.image = ngModel;
         window.addEventListener("dragover", function(e) {
          e = e || event;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
        }, false);
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
                ngModel.$setViewValue(data.public_id);
                scope.uploading = false;
                //scope.$eval(attrs.ngChange);
              });
            });
          }
        };
      }
    };
  });
