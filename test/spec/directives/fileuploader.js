'use strict';

describe('Directive: fileUploader', function () {

  // load the directive's module
  beforeEach(module('workspaceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-uploader></file-uploader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileUploader directive');
  }));
});
