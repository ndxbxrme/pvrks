'use strict';

describe('Service: Toolkit', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var Toolkit;
  beforeEach(inject(function (_Toolkit_) {
    Toolkit = _Toolkit_;
  }));

  it('should do something', function () {
    expect(!!Toolkit).toBe(true);
  });

});
