'use strict';

describe('Controller: SessionpendingCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var SessionpendingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SessionpendingCtrl = $controller('SessionpendingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
