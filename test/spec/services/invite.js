'use strict';

describe('Service: Invite', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var Invite;
  beforeEach(inject(function (_Invite_) {
    Invite = _Invite_;
  }));

  it('should do something', function () {
    expect(!!Invite).toBe(true);
  });

});
