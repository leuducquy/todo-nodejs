const assert = require('assert');
const app = require('../../src/app');

describe('\'todoList\' service', () => {
  it('registered the service', () => {
    const service = app.service('todo-list');

    assert.ok(service, 'Registered the service');
  });
});
