'use strict';

describe('Service: Idea', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var Idea;
  beforeEach(inject(function (_Idea_) {
    Idea = _Idea_;
  }));

  it('should do something', function () {
    expect(!!Idea).toBe(true);
  });

});
