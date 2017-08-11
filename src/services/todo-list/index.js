// Initializes the `todoList` service on path `/todo-list`
const createService = require('feathers-sequelize');
const createModel = require('../../models/todoList.model');
const hooks = require('./todo-list.hooks');
const filters = require('./todo-list.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
     Model: createModel(app.get('sequelize'))
  };

  // Initialize our service with any options it requires
  app.use('/todoList', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const todoService = app.service('/todoList');

  // Set up our before hooks
  todoService.before(hooks.before);

  // Set up our after hooks
  todoService.after(hooks.after);
};
