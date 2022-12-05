const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Task, TaskSchema } = require('./task.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));

//   User.associate(sequelize.models);
}

module.exports = setupModels;