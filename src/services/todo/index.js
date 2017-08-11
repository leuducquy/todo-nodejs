// Initializes the `Todo` service on path `/todo`
const createService = require('feathers-sequelize');
const createModel = require('../../models/todo.model');
const hooks = require('./todo.hooks');

module.exports = function () {
  const app = this;
  const options = {
    Model: createModel(app.get('sequelize'))
  };
 
 
  // Initialize our service with any options it requires
  app.use('/todos', createService(options));
 
  // Get our initialize service to that we can bind hooks
  const todoService = app.service('/todos');
 console.log('todoService o',app);
  // Set up our before hooks
  todoService.before(hooks.before);

  // Set up our after hooks
  todoService.after(hooks.after);
};
