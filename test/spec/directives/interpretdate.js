'use strict';

describe('Directive: interpretDate', function () {

  // load the directive's module
  beforeEach(module('workspaceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<interpret-date></interpret-date>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the interpretDate directive');
  }));
});
