const auth = require('feathers-authentication').hooks;
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [auth.associateCurrentUser({as: 'ownerId'})],//
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
