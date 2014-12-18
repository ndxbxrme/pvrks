'use strict';

describe('Service: Roster', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var Roster;
  beforeEach(inject(function (_Roster_) {
    Roster = _Roster_;
  }));

  it('should do something', function () {
    expect(!!Roster).toBe(true);
  });

});
