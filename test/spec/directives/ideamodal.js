'use strict';

describe('Directive: ideaModal', function () {

  // load the directive's module
  beforeEach(module('workspaceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<idea-modal></idea-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ideaModal directive');
  }));
});
