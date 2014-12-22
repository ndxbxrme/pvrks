'use strict';

describe('Controller: TeamsetupCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var TeamsetupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamsetupCtrl = $controller('TeamsetupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
