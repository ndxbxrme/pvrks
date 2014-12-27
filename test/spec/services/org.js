'use strict';

describe('Service: Org', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var Org;
  beforeEach(inject(function (_Org_) {
    Org = _Org_;
  }));

  it('should do something', function () {
    expect(!!Org).toBe(true);
  });

});
