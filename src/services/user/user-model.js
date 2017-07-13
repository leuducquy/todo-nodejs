'use strict';

// user-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');
const TodoModel = require("../../models/todo.model");
module.exports = function (sequelize) {
  const user = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      freezeTableName: true,
      classMethods: {
        associate(models) {
          console.log(models);
          user.hasMany(models.todos, { foreignKey: 'ownerId' });
        },
      },
    });
  // user.sync();
  return user;
};
