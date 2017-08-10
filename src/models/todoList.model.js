// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const todoList = sequelize.define('todoList', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique : true
    }
  }, {
      freezeTableName: true,
      classMethods: {
        associate(models) {
          todoList.hasMany(models.todos, { foreignKey: 'listId' });
        },
      },
    });
  return todoList;
};
