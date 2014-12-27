'use strict';

describe('Directive: ideaInput', function () {

  // load the directive's module
  beforeEach(module('workspaceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<idea-input></idea-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ideaInput directive');
  }));
});
