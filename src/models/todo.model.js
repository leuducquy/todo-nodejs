// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const todo = sequelize.define('todos', {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
     complete: {
      type: Sequelize.BOOLEAN,
    }
  },{
    freezeTableName: true
  });



//  todo.sync();

  return todo;
};
