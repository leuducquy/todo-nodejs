'use strict';
const viewer = require('./viewer');
const graphql = require('./graphql');
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');
const todo = require('./todo');
const todoList = require('./todo-list');



module.exports = function () {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false
  });
  app.set('sequelize', sequelize);
  // Setup relationships

  app.configure(authentication);
  app.configure(user);
  app.configure(todo);
  app.configure(todoList);
  app.configure(viewer);
  app.configure(graphql);
  //setup relationship
  const models = sequelize.models;
  Object.keys(models).forEach(name => {
    if ('associate' in models[name]) {
      models[name].associate(models);
    }
  });
  sequelize.sync();
};
