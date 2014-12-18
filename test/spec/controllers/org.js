'use strict';

describe('Controller: OrgCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var OrgCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrgCtrl = $controller('OrgCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
