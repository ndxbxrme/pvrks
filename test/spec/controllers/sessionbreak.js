'use strict';

describe('Controller: SessionbreakCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var SessionbreakCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SessionbreakCtrl = $controller('SessionbreakCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
