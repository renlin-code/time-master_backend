'use strict';

const { USER_TABLE,  UserSchema } = require("./../models/user.model");
const { CATEGORY_TABLE,  CategorySchema } = require("./../models/category.model");
const { TASK_TABLE,  TaskSchema } = require("./../models/task.model");


module.exports = {
  up: async(queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(TASK_TABLE);

  }
};
