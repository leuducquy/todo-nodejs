const assert = require('assert');
const app = require('../../src/app');

describe('\'Todo\' service', () => {
  it('registered the service', () => {
    const service = app.service('todo');

    assert.ok(service, 'Registered the service');
  });
});
