'use strict';
/*global angular:false, $:false*/
angular.module('workspaceApp')
  .directive('ideaInput', function () {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        $(element).editable({
          placeholder:'Type an Idea...',
          countCharacters:false,
          buttons:[],
          pastedImagesUploadURL:'',
          imageUploadURL:''
        });
        $(element).on('editable.contentChanged', function(e, editor){
          ngModel.$setViewValue($(element).editable('getHTML'));
        });
        $(element).on('editable.keydown', function(e, editor, key, ctrl){
          if(ctrl && key===13) {
            ngModel.$setViewValue($(element).editable('getHTML'));
            scope.sendIdea();
          }
        });
        ngModel.$formatters.unshift(function(value){
          if(!value) {
            value = '';
          }
          $(element).editable('setHTML', value);
          return value;
        });
      }
    };
  });
