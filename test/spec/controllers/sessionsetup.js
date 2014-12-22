'use strict';

describe('Controller: SessionsetupCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var SessionsetupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SessionsetupCtrl = $controller('SessionsetupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
